import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '../api-config';
import { map } from 'rxjs/operators';
import { PaginationHttpAdapter } from '../http-adapters/pagination-http-adapter';
import { ImagesHttpAdapter } from '../http-adapters/audiences-http-adapter';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  constructor(public http: HttpClient) {}

  public searchGifs(params: {
    [key: string]: string;
  }): Observable<IList<IGif>> {
    const preparedParams = { ...ApiConfig.commonHttpParams, ...params };
    return this.http
      .get<{ data: IGifApi[]; pagination: IPaginationApi }>(
      `${ApiConfig.gifsSearchPath}`,
      { params: preparedParams }
    )
      .pipe(
        map((response: { data: IGifApi[]; pagination: IPaginationApi }) => ({
          data: response.data.map((item: IGifApi) =>
            ImagesHttpAdapter.transformToGifItem(item)
          ),
          pagination: PaginationHttpAdapter.transform(response.pagination)
        }))
      );
  }
}
