import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';
import { map } from 'rxjs/operators';

// const baseUrl = 'http://localhost:8080/api/tutorials';
const baseUrl = 'https://backend-dot-neat-simplicity-415116.uc.r.appspot.com/api/tutorials';


// https://20240428t161534-dot-default-dot-neat-simplicity-415116.uc.r.appspot.com

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tutorial[]> {
    return this.http.get<any>(baseUrl).pipe(
      map(response => response.tutorials) // Extract tutorials from the response
    );
  }

  get(id: any): Observable<Tutorial> {
    return this.http.get<Tutorial>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: string): Observable<any> {
    return this.http.get<any>(`${baseUrl}?title=${title}`);
  }
  

  findByTitleAndPublished(title: string, isPublished: boolean): Observable<any> {
    return this.http.get<any>(`${baseUrl}?title=${title}&isPublished=${isPublished}`);
  }
  
  
}