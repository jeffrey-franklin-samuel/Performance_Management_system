import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'; 

@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.component.html',
  styleUrls: ['./ranks.component.css']
})
export class RanksComponent implements OnInit {

  constructor(private apiService: ApiService) {}

  semesterData: any[] = [];
  sortOrder: 'asc' | 'desc' = 'asc'; // Initial sort order
  sortBy: string = 'Rank'; // Initial sort by column

  ngOnInit() {
    this.apiService.getData().subscribe((data: any[]) => {
      this.semesterData = this.extractData(data);
    });
  }

  private extractData(data: any[]): any[] {
    // Extract semester data from the API response
    return data.map(item => ({
      Rank: item['Rank'],
      Course: item['Course'],
      Roll: item['RollNumber'],
      SemesterPredictions: item['Semester Predicted GPA'],
      ProjectPredictions: item['Project Predicted GPA']
    }));
  }

  sortByColumn(column: string) {
    if (column === this.sortBy) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }
    this.sortData();
  }
  

  private sortData() {
    this.semesterData.sort((a, b) => {
      if (this.sortBy === 'Rank' || this.sortBy === 'Roll') {
        // Convert values to numbers for proper numeric sorting
        const valueA = parseFloat(a[this.sortBy]);
        const valueB = parseFloat(b[this.sortBy]);
        return this.sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      } else if (this.sortBy === 'Dept') {
        // Sort by "Dept" column (course) alphabetically
        return this.sortOrder === 'asc' ? a[this.sortBy].localeCompare(b[this.sortBy]) : b[this.sortBy].localeCompare(a[this.sortBy]);
      } else {
        // For non-numeric values, use default string comparison
        const valueA = isNaN(a[this.sortBy]) ? a[this.sortBy] : parseFloat(a[this.sortBy]);
        const valueB = isNaN(b[this.sortBy]) ? b[this.sortBy] : parseFloat(b[this.sortBy]);
        if (valueA < valueB) {
          return this.sortOrder === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
          return this.sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      }
    });
  }
  
  
}
