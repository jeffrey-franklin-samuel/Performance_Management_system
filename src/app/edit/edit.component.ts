

import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { StudentDetailsComponent } from '../student-details/student-details.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent  {
  @Input('rollNumber') rollnumber!:string
  formData: any = {};

  constructor( private http: HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.http.get<any>(`http://127.0.0.1:5000/getDetails/${this.rollnumber}`).subscribe(data => {
      this.formData = data;
    });
  }
  onSubmit() {
    this.showAptitudeTests=false
    this.showCommunicationTests=false
    this.showLogicalTests=false
    this.showPersonalDetails=false
    this.showProjects=false
    this.showSemesters=false
    
    const formDataToSend = new FormData();
    for (const key in this.formData) {
      if (this.formData.hasOwnProperty(key)) {
        formDataToSend.append(key, this.formData[key]);
      }
    }

    this.http.post<any>(`http://127.0.0.1:5000/edit/${this.rollnumber}`, formDataToSend).subscribe(() => {
      // Handle success or redirect to another page
    }, error => {
      // Handle error
    });
  }
  showSemesters: boolean = false;
  showProjects: boolean = false;
  showAptitudeTests: boolean = false; // Variable to control the visibility of aptitude tests
  showLogicalTests: boolean = false; // Variable to control the visibility of logical tests
  showCommunicationTests: boolean = false; // Variable to control the visibility of logical tests
  showPersonalDetails: boolean = false; // Variable to control the visibility of logical tests

  toggleSemesters() {
    this.showSemesters = !this.showSemesters;
  }

  toggleProjects() {
    this.showProjects = !this.showProjects;
  }

  toggleAptitudeTests() {
    this.showAptitudeTests = !this.showAptitudeTests;
  }
  toggleLogicalTests() {
    this.showLogicalTests = !this.showLogicalTests;
  }
  toggleCommunicationTests() {
    this.showCommunicationTests = !this.showCommunicationTests;
  }
  togglePersonalDetails() {
    this.showPersonalDetails = !this.showPersonalDetails;
  }

  Details!: StudentDetailsComponent;



}
