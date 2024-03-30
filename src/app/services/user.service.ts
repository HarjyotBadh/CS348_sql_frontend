import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users'; // Adjust this URL as needed

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Inside UserService

    getUserById(id: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${id}`);
    }


  // Add other user-related methods here as needed, such as getUserById, createUser, etc.
}
