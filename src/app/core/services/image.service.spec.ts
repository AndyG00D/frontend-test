import { ImagesService } from './image.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ApiConfig } from '../api-config';
import { environment } from '../../../environments/environment';

const mockResponse: { data: IGifApi[]; pagination: IPaginationApi } = {
  data: [
    {
      title: 'test title',
      images: {
        fixed_height: {
          url: 'http://some-path/test.gif'
        }
      }
    }
  ],
  pagination: { total_count: 1, count: 1, offset: 0 }
};

const mockResult: IList<IGif> = {
  data: [{ title: 'test title', url: 'http://some-path/test.gif' }],
  pagination: { total: 1, count: 1, offset: 0 }
};

const testURL = `${ApiConfig.gifsSearchPath}?api_key=${environment.apiKey}`;

describe('ImagesService', () => {
  let httpTestingController: HttpTestingController;
  let imagesService: ImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    imagesService = TestBed.inject(ImagesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should have a service instance', () => {
    expect(imagesService).toBeDefined();
  });

  it(`#searchGifs: should return data of`, () => {
    // function should have made one request and equaled result data
    imagesService.searchGifs({}).subscribe(data => {
      expect(data).toEqual(mockResult);
    });

    // The following `expectOne()` will match the request's URL.
    const req = httpTestingController.expectOne(testURL);

    // Assert the request type ('GET', 'POST', 'PUT', 'PATCH', 'DELETE').
    expect(req.request.method).toBe('GET');

    // Respond with the mock data
    req.flush(mockResponse);
  });

  it(`#searchGifs: can test for 404 error`, () => {
    const emsg: string = 'deliberate 404 error';
    // function should have made one request and get respond fail
    imagesService.searchGifs({}).subscribe(
      () => fail,
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );

    const req = httpTestingController.expectOne(testURL);
    expect(req.request.method).toBe('GET');

    // Respond with mock error
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

  it(`#searchGifs: can test for network error`, () => {
    const emsg: string = 'simulated network error';

    // function should have made one request and get respond fail
    imagesService.searchGifs({}).subscribe(
      () => fail,
      (error: HttpErrorResponse) => {
        expect(error.error.message).toEqual(emsg, 'message');
      }
    );

    const req = httpTestingController.expectOne(testURL);
    expect(req.request.method).toBe('GET');

    // Create mock ErrorEvent, raised when something goes wrong at the network level.
    // Connection timeout, DNS error, offline, etc
    const mockError = new ErrorEvent('Network error', {
      message: emsg
    });

    // Respond with mock error
    req.error(mockError);
  });
});
