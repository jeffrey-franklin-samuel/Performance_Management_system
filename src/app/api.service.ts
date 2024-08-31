import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://127.0.0.1:5000/getDetails'; // Replace this with your API endpoint

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDetails(parameter: string): Observable<any>  {
    // Return the HTTP GET request with the parameter
    return this.http.get<any>(`http://127.0.0.1:5000/getDetails/${parameter}`);
  }

  insertData(data: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:5000/insert', data);
  }
}
