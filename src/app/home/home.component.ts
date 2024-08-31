import { Component, OnInit } from '@angular/core';
import { ApiService} from '../api.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  semesterData!: any[];
  projectData!: any[];
colorScheme: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadData()
  }
  loadData(){
    this.apiService.getData().subscribe((data: any[]) => {
      this.semesterData = this.extractSemesterData(data);
      this.projectData = this.extractProjectData(data);
    });
  }

  private extractSemesterData(data: any[]): any[] {
    // Extract semester data from the API response
    return data.map(item => ({
      Rank:item['Rank'],
      RollNumber: item['RollNumber'],
      sem1: item['sem 1'],
      sem2: item['sem 2'],
      sem3: item['sem 3'],
      sem4: item['sem 4']
    }));
  }

  private extractProjectData(data: any[]): any[] {
    // Extract project data from the API response
    return data.map(item => ({
      
      RollNumber: item['RollNumber'],
      Project1: item.Project1,
      Project1_Status: item.Project1_Status,
      Project2: item.Project2,
      Project2_Status: item.Project2_Status,
      Project3: item.Project3,
      Project3_Status: item.Project3_Status,
      Project4: item.Project4,
      Project4_Status: item.Project4_Status
    }));
  }
  imageUrls: string[] = [
    'assets/plots/Home/Project Predicted GPA.png',
    'assets/plots/Home/Semester Predicted GPA.png',
    'assets/plots/Home/Project1.png',
    'assets/plots/Home/Project1_Status_Late.png',
    'assets/plots/Home/Project2.png',
    'assets/plots/Home/Project2_Status_Late.png',
    'assets/plots/Home/Project3.png',
    'assets/plots/Home/Project3_Status_Late.png',
    'assets/plots/Home/Project4.png',
    'assets/plots/Home/Project4_Status_Late.png',
    'assets/plots/Home/sem 2.png',
    'assets/plots/Home/sem 3.png',
    'assets/plots/Home/sem 4.png',
    'assets/plots/Home/sem 1.png',
  ];
  imageUrlsWithDimensionsSemester: { url: string, width: string, height: string, isLargeImage: boolean }[] = [
    { url: 'assets/plots/Home/Semester Predicted GPA.png', width: '500px', height: 'auto', isLargeImage: true },
    { url: 'assets/plots/Home/sem 1.png', width: '200px', height: 'auto', isLargeImage: false },
    { url: 'assets/plots/Home/sem 2.png', width: '200px', height: 'auto', isLargeImage: false },
    { url: 'assets/plots/Home/sem 3.png', width: '200px', height: 'auto', isLargeImage: false },
    { url: 'assets/plots/Home/sem 4.png', width: '200px', height: 'auto', isLargeImage: false },
    { url: 'assets/plots/Home/sem 1_Pie.png', width: '200px', height: 'auto', isLargeImage: false },
    { url: 'assets/plots/Home/sem 2_Pie.png', width: '200px', height: 'auto', isLargeImage: false },
    { url: 'assets/plots/Home/sem 3_Pie.png', width: '200px', height: 'auto', isLargeImage: false },
    { url: 'assets/plots/Home/sem 4_Pie.png', width: '200px', height: 'auto', isLargeImage: false },
    
  ];
  imageUrlsWithDimensionsProject: { url: string, width: string, height: string, isLargeImage: boolean }[] = [
    { url: 'assets/plots/Home/Project Predicted GPA.png', width: '500px', height: 'auto', isLargeImage: true },
    { url: 'assets/plots/Home/Project1.png', width: '200px', height: 'auto', isLargeImage: false },
    { url: 'assets/plots/Home/Project1_Status_Late.png', width: '200px', height: 'auto', isLargeImage: false },
    { url: 'assets/plots/Home/Project2.png', width: '200px', height: 'auto', isLargeImage: false },
    { url: 'assets/plots/Home/Project2_Status_Late.png', width: '200px', height: 'auto', isLargeImage: false },
    { url: 'assets/plots/Home/Project3.png', width: '200px', height: 'auto', isLargeImage: false },
    { url: 'assets/plots/Home/Project3_Status_Late.png', width: '200px', height: 'auto', isLargeImage: false },
    { url: 'assets/plots/Home/Project4.png', width: '200px', height: 'auto', isLargeImage: false },
    { url: 'assets/plots/Home/Project4_Status_Late.png', width: '200px', height: 'auto', isLargeImage: false },
  ];
  

  openImage(event: MouseEvent) {
    event.preventDefault();
    const imgSrc = (event.target as HTMLImageElement).src;
    window.open(imgSrc, '_blank', 'width=800,height=600');
  }
  
}
