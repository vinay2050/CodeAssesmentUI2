import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsDataService {

  constructor(private http: HttpClient) { }
  getStories(searchInput: string, pageNumber: number, pageSize: number): Observable<any> {
    const url = `https://localhost:7297/api/News/GetStories?title=${searchInput}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    console.warn(url);
    console.warn(pageNumber,pageSize);
    return this.http.get(url);
 
  }
 
}
