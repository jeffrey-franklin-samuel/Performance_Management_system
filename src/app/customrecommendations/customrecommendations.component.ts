import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnChanges } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-customrecommendations',
  templateUrl: './customrecommendations.component.html',
  styleUrls: ['./customrecommendations.component.css']
})
export class CustomrecommendationsComponent implements OnChanges {
  @Input('rollNumber') rollNumber!: any;
  recommendations: any[] = [];

  constructor(private http: HttpClient,public authService :AuthService) { }

  ngOnChanges() {
    this.getRecommendations();
  }

  getRecommendations() {
    this.http.get<any>(`http://127.0.0.1:8000/getRecommendations/${this.rollNumber}`).subscribe(
      (data) => {
        this.recommendations = data.Recommendations || [];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addRecommendation(recommendation: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post<any>(`http://127.0.0.1:8000/addRecommendation/${this.rollNumber}`, { recommendation }, { headers }).subscribe(
      (data) => {
        console.log(data);
        this.getRecommendations();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteRecommendation(recommendationNumber: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.delete<any>(`http://127.0.0.1:8000/deleteRecommendation/${this.rollNumber}`, { headers, body: { recommendation_number: recommendationNumber } }).subscribe(
      (data) => {
        console.log(data);
        this.getRecommendations();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteAllRecommendations() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.delete<any>(`http://127.0.0.1:8000/deleteAllRecommendations/${this.rollNumber}`, { headers }).subscribe(
      (data) => {
        console.log(data);
        this.recommendations = [];
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
