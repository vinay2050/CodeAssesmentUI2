import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewsDataService } from './news-data.service';

describe('NewsDataService', () => {
  let service: NewsDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsDataService]
    });

    service = TestBed.inject(NewsDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getStories and return expected data', () => {
    const mockResponse = {
      data: [{ title: 'Test News 1', url: 'http://test1.com' }, { title: 'Test News 2', url: 'http://test2.com' }],
      totalCount: 2
    };

    const searchInput = 'test';
    const pageNumber = 1;
    const pageSize = 10;
    const expectedUrl = `https://localhost:7297/api/News/GetStories?title=${searchInput}&pageNumber=${pageNumber}&pageSize=${pageSize}`;

    service.getStories(searchInput, pageNumber, pageSize).subscribe((resData) => {
      expect(resData).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should construct the URL correctly', () => {
    const searchInput = 'anotherTest';
    const pageNumber = 2;
    const pageSize = 20;
    const expectedUrl = `https://localhost:7297/api/News/GetStories?title=${searchInput}&pageNumber=${pageNumber}&pageSize=${pageSize}`;

    service.getStories(searchInput, pageNumber, pageSize).subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
