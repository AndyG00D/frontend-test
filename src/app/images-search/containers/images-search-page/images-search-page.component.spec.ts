import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {ImagesSearchPageComponent} from './images-search-page.component';
import {of, throwError} from 'rxjs';
import {ImagesService} from '../../../core/services/image.service';
import {Component, NO_ERRORS_SCHEMA, Optional, Self} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {By} from '@angular/platform-browser';

const mockResult: IList<IGif> = {
  data: [
    {title: 'test title 1', url: 'http://some-path/test1.gif'},
    {title: 'test title 2', url: 'http://some-path/test2.gif'},
    {title: 'test title 3', url: 'http://some-path/test3.gif'},
    {title: 'test title 4', url: 'http://some-path/test4.gif'},
    {title: 'test title 5', url: 'http://some-path/test5.gif'},
    {title: 'test title 6', url: 'http://some-path/test6.gif'},
    {title: 'test title 7', url: 'http://some-path/test7.gif'},
    {title: 'test title 8', url: 'http://some-path/test8.gif'},
    {title: 'test title 9', url: 'http://some-path/test9.gif'}
  ],
  pagination: {total: 10, count: 9, offset: 0}
};

const mockResultSecondPage: IList<IGif> = {
  data: [{title: 'test title 2', url: 'http://some-path/test2.gif'}],
  pagination: {total: 10, count: 9, offset: 9}
};

const mockEmptyResult: IList<IGif> = {
  data: [],
  pagination: {total: 0, count: 0, offset: 0}
};

const mockError = new ErrorEvent('Network error', {
  message: 'error',
});

const imageServiceStub = {
  searchGifs: () => (of(mockResult)),
};

@Component({
  selector: 'uct-chip-list-control',
  template: ''
})
export class ChipListComponent implements ControlValueAccessor {
  constructor(
    @Optional() @Self() public ngControl: NgControl,
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  registerOnChange(): void {
  }

  registerOnTouched(): void {
  }

  writeValue(): void {
  }
}

describe('ImagesSearchPageComponent', () => {
  let component: ImagesSearchPageComponent;
  let fixture: ComponentFixture<ImagesSearchPageComponent>;
  let imageService: ImagesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImagesSearchPageComponent, ChipListComponent],
      providers: [{provide: ImagesService, useValue: imageServiceStub}],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesSearchPageComponent);
    component = fixture.componentInstance;
    imageService = fixture.debugElement.injector.get<ImagesService>(ImagesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should no data and message: \'Input keywords for finding images.\'', () => {
    expect(component.data).toEqual(undefined);
    const alertElement = fixture.debugElement.query(By.css('.alert')).nativeElement;
    expect(alertElement.textContent).toEqual(' Input keywords for finding images. ');
  });

  it('should do first search request', fakeAsync(() => {
    spyOn(imageService, 'searchGifs').and.returnValue(of(mockResult));
    component.search.patchValue(['some_keyword']);
    fixture.detectChanges();
    expect(component.hasServerError).toEqual(false);
    expect(imageService.searchGifs).toHaveBeenCalled();
    expect(component.data).toEqual(mockResult.data);
  }));

  it('should change pagination', fakeAsync(() => {
    const spySearchRequest = spyOn(imageService, 'searchGifs');
    spySearchRequest.and.returnValue(of(mockResult));
    component.search.patchValue(['some_keyword']);
    spySearchRequest.and.returnValue(of(mockResultSecondPage));
    expect(component.pageIndex).toEqual(1);
    component.setPageIndex(2);
    fixture.detectChanges();
    expect(component.hasServerError).toEqual(false);
    expect(component.pageIndex).toEqual(2);
    expect(imageService.searchGifs).toHaveBeenCalled();
    expect(component.data).toEqual(mockResultSecondPage.data);
  }));

  it('should do search request with empty result', () => {
    spyOn(imageService, 'searchGifs').and.returnValue(of(mockEmptyResult));
    component.search.patchValue(['some_not_availed_keyword']);
    fixture.detectChanges();
    expect(component.hasServerError).toEqual(false);
    expect(imageService.searchGifs).toHaveBeenCalled();
    expect(component.data.length).toEqual(0);
    expect(component.search.value.length).toBeGreaterThan(0);
    const alertElement = fixture.debugElement.query(By.css('.alert')).nativeElement;
    expect(alertElement.textContent).toEqual(' Sorry, nothing found. Please, try again with some different keyword. ');
  });

  it('should clear search', () => {
    spyOn(imageService, 'searchGifs').and.returnValue(of(mockEmptyResult));
    component.search.patchValue([]);
    fixture.detectChanges();
    expect(component.hasServerError).toEqual(false);
    expect(imageService.searchGifs).toHaveBeenCalled();
    expect(component.data.length).toEqual(0);
    expect(component.search.value.length).toEqual(0);
    const alertElement = fixture.debugElement.query(By.css('.alert')).nativeElement;
    expect(alertElement.textContent).toEqual(' Input keywords for finding images. ');
  });

  it('should get API Error on search', () => {
    spyOn(imageService, 'searchGifs').and.returnValue(throwError(mockError));
    component.search.patchValue(['keyword']);
    fixture.detectChanges();
    expect(imageService.searchGifs).toHaveBeenCalled();
    expect(component.data).toEqual(undefined);
    expect(component.hasServerError).toEqual(true);
    const alertElement = fixture.debugElement.query(By.css('.alert')).nativeElement;
    expect(alertElement.textContent).toEqual(' Sorry, something went wrong on the server. Please try again. ');
  });

});
