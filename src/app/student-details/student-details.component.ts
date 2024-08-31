import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Observable, delay } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { EditComponent } from '../edit/edit.component';
import { RecommendationsComponent } from '../recommendations/recommendations.component';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit {
  parameterValue!: string;
  data: any; // Variable to hold the fetched data


  constructor(private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    public authService:AuthService) { }

  ngOnInit(): void {
  }

  getData() {
    if (!this.parameterValue) {
      console.error('Parameter value is required.');
      return;
    }
  
    // Make the call to the service to fetch the data
    this.apiService.getDetails(this.parameterValue).subscribe(
      async (response) => {
        // If response contains an error indicating "Student not found", handle it appropriately
        if (response && response.error && response.error === "Student not found") {
          console.error('Student not found');
          // Remove any existing data in this.data
          this.data = undefined;
          return;
        }
        
        // Assign the fetched data to the variable
        this.data = response;
      },
      (error) => {
        // Handle errors here
        console.error('Error fetching data:', error);
        // Remove any existing data in this.data
        this.data = undefined;
      }
    );
  }
  

  image1Url: string = '';
  image2Url: string = '';
  image3Url: string = '';
  image4Url: string = '';
  image5Url: string = '';
  image6Url: string = '';
  image7Url: string = '';
  image8Url: string = '';
  image9Url: string = '';
  image10Url: string = '';
  image11Url: string = '';
  image12Url: string = '';
  image13Url: string = '';
  image14Url: string = '';
  image15Url: string = '';
  image16Url: string = '';
  image17Url: string = '';
  image18Url: string = '';
  image19Url: string = '';
  image20Url: string = '';
  async loadImages() {
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Assuming you have logic here to determine which images to load based on the fetched data
    // You can set the image URLs dynamically here

    // Example URLs for each image
    this.image1Url = 'assets/plots/student/Semesters_predicted_gpas.png';
    this.image2Url = 'assets/plots/student/semester1-p_predictions.png';
    this.image3Url = 'assets/plots/student/Semester_highest_lowest_avg_predictions.png';
    this.image4Url = 'assets/plots/student/Project_predicted_gpas.png';
    this.image5Url = 'assets/plots/student/project1-4_predictions.png';
    this.image6Url = 'assets/plots/student/Project_highest_lowest_avg_project_predictions.png';
    this.image7Url = 'assets/plots/student/test_predictions.png';

    this.image8Url = 'assets/plots/student/sem 1_comparison.png';
    this.image9Url = 'assets/plots/student/sem 2_comparison.png';
    this.image10Url = 'assets/plots/student/sem 3_comparison.png';
    this.image11Url = 'assets/plots/student/sem 4_comparison.png';
    this.image12Url = 'assets/plots/student/Semester Predicted GPA_comparison.png';


    this.image13Url = 'assets/plots/student/Project1_comparison.png';
    this.image14Url = 'assets/plots/student/Project2_comparison.png';
    this.image15Url = 'assets/plots/student/Project3_comparison.png';
    this.image16Url = 'assets/plots/student/Project4_comparison.png';
    this.image17Url = 'assets/plots/student/Project Predicted GPA_comparison.png';

    this.image18Url = 'assets/plots/student/Aptitude_pass_fail_ring.png';
    this.image19Url = 'assets/plots/student/Communication_pass_fail_ring.png';
    this.image20Url = 'assets/plots/student/LogicalTest_pass_fail_ring.png';







    // Append timestamp to each image URL to prevent caching
    this.image1Url += '?' + new Date().getTime();
    this.image2Url += '?' + new Date().getTime();
    this.image3Url += '?' + new Date().getTime();
    this.image4Url += '?' + new Date().getTime();
    this.image5Url += '?' + new Date().getTime();
    this.image6Url += '?' + new Date().getTime();
    this.image7Url += '?' + new Date().getTime();
    this.image8Url += '?' + new Date().getTime();
    this.image9Url += '?' + new Date().getTime();
    this.image10Url += '?' + new Date().getTime();
    this.image11Url += '?' + new Date().getTime();
    this.image12Url += '?' + new Date().getTime();
    this.image13Url += '?' + new Date().getTime();
    this.image14Url += '?' + new Date().getTime();
    this.image15Url += '?' + new Date().getTime();
    this.image16Url += '?' + new Date().getTime();
    this.image17Url += '?' + new Date().getTime();
    this.image18Url += '?' + new Date().getTime();
    this.image19Url += '?' + new Date().getTime();
    this.image20Url += '?' + new Date().getTime();


  }

  onInputChange() {

    // Reload images with the new input value
    this.loadImages();
  }

  openImage(event: MouseEvent) {
    event.preventDefault();
    const imgSrc = (event.target as HTMLImageElement).src;
    window.open(imgSrc, '_blank', 'width=800,height=600');
  }

  editcomponentflag: boolean = false;

  activateEdit(f: boolean) {
    this.editcomponentflag = f;
  }
  edit: any | EditComponent;
  recommend: any | RecommendationsComponent;

  delete(idToDelete: any) {
    this.http.delete<any>(`http://127.0.0.1:5000/delete/${idToDelete}`).subscribe(data => {

    });
  }
}