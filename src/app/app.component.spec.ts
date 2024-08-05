import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { NewsDataService } from './Services/news-data.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let newsDataService: NewsDataService;
  let mockData = {
    data: [{ title: 'Test News 1', url: 'http://test1.com' }, { title: 'Test News 2', url: 'http://test2.com' }],
    totalCount: 50
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [AppComponent],
      providers: [NewsDataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    newsDataService = TestBed.inject(NewsDataService);
    spyOn(newsDataService, 'getStories').and.returnValue(of(mockData));
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values and load stories', () => {
    expect(component.News).toEqual(mockData.data);
    expect(component.totalCount).toBe(mockData.totalCount);
    expect(component.totalPages).toBe(Math.ceil(mockData.totalCount / component.itemsPerPage));
  });

  it('should search and load stories for the given input and page number', () => {
    component.searchInput = 'test';
    component.search(2);
    expect(component.currentPage).toBe(2);
  });

  it('should clear the search input and load the first page of stories', () => {
    component.clearText();
    expect(component.currentPage).toBe(1);
    expect(component.searchInput).toBe('');
  });

  it('should go to the next page and load stories', () => {
    component.searchInput='';
    component.search(1);
    component.nextPage();
    expect(component.currentPage).toBe(2);
    console.warn(component.currentPage);
    
  });

  it('should not go to the next page if on the last page', () => {
    expect(newsDataService.getStories).toHaveBeenCalledWith('', 1, component.itemsPerPage);
    component.currentPage = Math.ceil(component.totalCount / component.itemsPerPage);

    // Call nextPage when already on the last page
    component.nextPage();

    // Expect currentPage to remain the same as it was before
    const lastPage = Math.ceil(component.totalCount / component.itemsPerPage);
    expect(component.currentPage).toBe(lastPage);
  });


  it('should go to the previous page and load stories', () => {
    component.currentPage = 2;
    component.prevPage();
    expect(component.currentPage).toBe(1);
  });

  it('should not go to the previous page if on the first page', () => {
    component.currentPage = 1;
    component.prevPage();
    expect(component.currentPage).toBe(1);
  });
});
