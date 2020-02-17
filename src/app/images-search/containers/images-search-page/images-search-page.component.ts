import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImagesService } from '../../../core/services/image.service';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'uct-images-search-page',
  templateUrl: './images-search-page.component.html',
  styleUrls: ['./images-search-page.component.scss']
})
export class ImagesSearchPageComponent implements OnInit, OnDestroy {
  public data: IGif[];
  public pageSize: number = 9;
  public totalCount: number;
  public search: FormControl = new FormControl('');
  public hasServerError: boolean;
  public loading: boolean;
  private pageIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private destroy$: Subject<void> = new Subject();

  constructor(private imagesService: ImagesService) {}

  public get pageIndex(): number {
    return this.pageIndex$.value;
  }

  public ngOnInit(): void {
    this.handleSearchingImages();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public setPageIndex(value: number): void {
    console.log(value);
    return this.pageIndex$.next(value);
  }

  private handleSearchingImages(): void {
    combineLatest([this.getSearchChanges(), this.getPaginationChanges()])
      .pipe(
        map(([query, pageIndex]) =>
          this.prepareSearchParams(query, pageIndex, this.pageSize)
        ),
        tap(() => {
          this.hasServerError = false;
          this.loading = true;
        }),
        switchMap(params => this.imagesService.searchGifs(params)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (response: IList<IGif>) => {
          this.data = response.data;
          this.loading = false;
          this.setTotalCount(response.pagination.total);
        },
        (error: Error) => {
          this.hasServerError = true;
          this.loading = false;
          console.error(error.message);
        }
      );
  }

  private getSearchChanges(): Observable<string> {
    return this.search.valueChanges.pipe(
      map((value: string[]) => value.join(' ')),
      distinctUntilChanged(),
      tap(() => this.setPageIndex(1))
    );
  }

  private getPaginationChanges(): Observable<number> {
    return this.pageIndex$.pipe(distinctUntilChanged());
  }

  private prepareSearchParams(
    query: string,
    pageIndex: number,
    pageSize: number
  ): { q: string; limit: string; offset: string } {
    return {
      q: query,
      limit: pageSize.toString(),
      offset: ((pageIndex - 1) * pageSize).toString()
    };
  }

  private setTotalCount(value: number): void {
    if (value !== this.totalCount) {
      this.totalCount = value;
    }
  }
}
