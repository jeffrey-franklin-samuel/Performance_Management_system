import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class InsertComponent {
  studentData = {
    // Previous fields
    Name: '',
    Age: '',
    Course: '',
    Address: '',
    PhoneNumber: '',
    FatherName: '',
    MotherName: '',
    Income: '',
    sem_1: '',
    sem_2: '',
    sem_3: '',
    sem_4: '',
    Project1: '',
    Project2: '',
    Project3: '',
    Project4: '',
    // New fields for Aptitude
    Aptitude1: '',
    Aptitude2: '',
    Aptitude3: '',
    Aptitude4: '',
    Aptitude5: '',
    Aptitude6: '',
    Aptitude7: '',
    Aptitude8: '',
    Aptitude9: '',
    Aptitude10: '',
    Aptitude11: '',
    Aptitude12: '',
    // New fields for Communication
    Communication1: '',
    Communication2: '',
    Communication3: '',
    Communication4: '',
    Communication5: '',
    Communication6: '',
    Communication7: '',
    Communication8: '',
    Communication9: '',
    Communication10: '',
    Communication11: '',
    Communication12: '',
    // New fields for Logical Test
    LogicalTest1: '',
    LogicalTest2: '',
    LogicalTest3: '',
    LogicalTest4: '',
    LogicalTest5: '',
    LogicalTest6: '',
    LogicalTest7: '',
    LogicalTest8: '',
    LogicalTest9: '',
    LogicalTest10: '',
    LogicalTest11: '',
    LogicalTest12: ''
  };

  constructor(private http: HttpClient) { }

  insertStudent() {
    const formData = new FormData();
  
    for (const key of Object.keys(this.studentData) as Array<keyof typeof this.studentData>) {
      formData.append(key, this.studentData[key] as string);
    }
  
    this.http.post<any>('http://localhost:5000/insert', formData).subscribe(
      response => {
        console.log(response);
        // Handle success, maybe show a success message
      },
      error => {
        console.error(error);
        // Handle error, maybe show an error message
      }
    );
  }
  

  // Method to check form validity
  isFormValid(): boolean {
    return !!(
      this.studentData.Name &&
      this.studentData.Age &&
      this.studentData.Course &&
      this.studentData.Address &&
      this.studentData.PhoneNumber &&
      this.studentData.FatherName &&
      this.studentData.MotherName &&
      this.studentData.Income &&
      this.studentData.sem_1 &&
      this.studentData.sem_2 &&
      this.studentData.sem_3 &&
      this.studentData.sem_4 &&
      this.studentData.Project1 &&
      this.studentData.Project2 &&
      this.studentData.Project3 &&
      this.studentData.Project4
    );
  }
}
