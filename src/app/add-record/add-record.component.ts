import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent {
  formData = {
    Name: '',
    Age: null,
    Course: '',
    Address: '',
    PhoneNumber: '',
    FatherName: '',
    MotherName: '', // Corrected variable name
    Income: null,
    sem_1: null, // Corrected variable name
    sem_2: null,
    sem_3: null,
    sem_4: null,
    Project1: null,
    Project1_Status: '',
    Project2: null,
    Project2_Status: '',
    Project3: null,
    Project3_Status: '',
    Project4: null,
    Project4_Status: '',
    Aptitude1: '', // Corrected variable name
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

  onSubmit() {
    const formData = this.convertToFormData(this.formData);

    this.http.post('http://127.0.0.1:5000/insert', formData)
      .subscribe(
        (response: any) => {
          console.log('Data sent successfully:', response);
          // handle success, e.g., show a success message
        },
        (error) => {
          console.error('Error sending data:', error);
          // handle error, e.g., show an error message
        }
      );
  }

  private convertToFormData(data: any): FormData {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      formData.append(key, data[key].toString());
    });

    return formData;
  }
  isFormValid(): boolean {
    return (
      !!this.formData.Name &&
      !!this.formData.Age &&
      !!this.formData.Course &&
      !!this.formData.Address &&
      !!this.formData.PhoneNumber &&
      !!this.formData.FatherName &&
      !!this.formData.MotherName &&
      !!this.formData.Income &&
      !!this.formData.sem_1 &&
      !!this.formData.sem_2 &&
      !!this.formData.sem_3 &&
      !!this.formData.sem_4 &&
      !!this.formData.Project1 &&
      !!this.formData.Project1_Status &&
      !!this.formData.Project2 &&
      !!this.formData.Project2_Status &&
      !!this.formData.Project3 &&
      !!this.formData.Project3_Status &&
      !!this.formData.Project4 &&
      !!this.formData.Project4_Status &&
      !!this.formData.Aptitude1 &&
      !!this.formData.Aptitude2 &&
      !!this.formData.Aptitude3 &&
      !!this.formData.Aptitude4 &&
      !!this.formData.Aptitude5 &&
      !!this.formData.Aptitude6 &&
      !!this.formData.Aptitude7 &&
      !!this.formData.Aptitude8 &&
      !!this.formData.Aptitude9 &&
      !!this.formData.Aptitude10 &&
      !!this.formData.Aptitude11 &&
      !!this.formData.Aptitude12 &&
      !!this.formData.Communication1 &&
      !!this.formData.Communication2 &&
      !!this.formData.Communication3 &&
      !!this.formData.Communication4 &&
      !!this.formData.Communication5 &&
      !!this.formData.Communication6 &&
      !!this.formData.Communication7 &&
      !!this.formData.Communication8 &&
      !!this.formData.Communication9 &&
      !!this.formData.Communication10 &&
      !!this.formData.Communication11 &&
      !!this.formData.Communication12 &&
      !!this.formData.LogicalTest1 &&
      !!this.formData.LogicalTest2 &&
      !!this.formData.LogicalTest3 &&
      !!this.formData.LogicalTest4 &&
      !!this.formData.LogicalTest5 &&
      !!this.formData.LogicalTest6 &&
      !!this.formData.LogicalTest7 &&
      !!this.formData.LogicalTest8 &&
      !!this.formData.LogicalTest9 &&
      !!this.formData.LogicalTest10 &&
      !!this.formData.LogicalTest11 &&
      !!this.formData.LogicalTest12
    );
  }
}
