import { Component, OnInit } from '@angular/core';
import {NewsDataService} from './Services/news-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'NewsDataAPI';
  News:any;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalCount: number = 0;
  searchInput: string = '';
  totalPages: number = 0;
  
  constructor(private newsData:NewsDataService){ }

  ngOnInit(): void {
    this.loadStories(this.searchInput, this.currentPage, this.itemsPerPage);
  }

  loadStories(searchInput: string, pageNumber: number, pageSize: number): void {
    this.newsData.getStories(searchInput, pageNumber, pageSize).subscribe((resData) => {
      this.News = resData.data;
      this.totalCount = resData.totalCount;
      this.totalPages = Math.ceil(this.totalCount / this.itemsPerPage);
    });
  }
  search(pageNumber: number): void {
    this.currentPage = pageNumber; 
    this.loadStories(this.searchInput, pageNumber, this.itemsPerPage);
    
  }
  clearText(): void {
    this.currentPage = 1; // Reset to the first page on clear
    this.searchInput='';
    this.loadStories(this.searchInput, this.currentPage, this.itemsPerPage);
  }
  nextPage() {
    if ((this.currentPage * this.itemsPerPage) < this.totalCount) {
      this.currentPage++;
      console.warn("Line47",this.currentPage);
      this.search(this.currentPage);
    } 
    console.warn("Line50",this.currentPage);
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.search(this.currentPage);
  }
}
}
