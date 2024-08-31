import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnChanges {
  @Input() semesterMarks!: any;
  @Input() projectMarks!: any;
  @Input() aptitudeMarks!: any;
  @Input() logicalMarks!: any;
  @Input() communicationMarks!: any;

  lowestMarkType!: string;
  lowestMarkValue!: number;
  recommendations!: string[];
  // aptitudeLinks: string[] = [
  //   'https://www.youtube.com/embed/hlyal4sR0m8?si=mpyzEn7xYyMB-dCQ',
  //   'https://www.youtube.com/embed/tnc9ojITRg4?si=yCzSnROWMQqJsZua',
  //   'https://www.youtube.com/embed/YerFp7SPOE8?si=R1Wf6PUZ-k-vcHXr',
  //   'https://www.youtube.com/embed/B-QN7E8F7lg?si=0nzTA1tOZh0FMWNo',
  //   'https://www.youtube.com/embed/AsYnEfOMs8I?si=GPMxU-tU5dSN7IhG'
  // ];
  // logicalLinks: string[] = [
  //   'https://www.youtube.com/embed/x0WkptLF6oE?si=dofyiL3yldcHTc92',
  //   'https://www.youtube.com/embed/ckpplQNxPh4?si=N_BmphfO9cymngxt',
  //   'https://www.youtube.com/embed/uqoNNxLunis?si=OmYiCiNq5qg-z3h3',
  //   'https://www.youtube.com/embed/Uo2yNiadkzM?si=xKZFKi9kG4sDLEko',
  //   'https://www.youtube.com/embed/MN59wbtTF_U?si=VeeEE8O4omHVtCiN'
  // ];
  // communicationLinks: string[] = [
  //   'https://www.youtube.com/embed/bHvAaXp46hg?si=lhqRUMHenXyYNfCi',
  //   'https://www.youtube.com/embed/srn5jgr9TZo?si=JoUDcGXEZb9UlHgo',
  //   'https://www.youtube.com/embed/onldWh9n8e4?si=5BJGn_b7nn6_Ch-M',
  //   'https://www.youtube.com/embed/2OBewm5guJk?si=d9fuDOP9vw0APFCu',
  //   'https://www.youtube.com/embed/W-4IcNJIyM8?si=4e6rySr4v_zKbLos'
  // ];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['semesterMarks'] || changes['projectMarks'] || changes['aptitudeMarks'] || changes['logicalMarks'] || changes['communicationMarks']) {
      this.analyzeMarks();
    }
  }

  analyzeMarks() {
    const marks = [
      { type: 'Semester', value: this.semesterMarks },
      { type: 'Project', value: this.projectMarks },
      { type: 'Aptitude Test', value: this.aptitudeMarks },
      { type: 'Logical Test', value: this.logicalMarks },
      { type: 'Communication Test', value: this.communicationMarks }
    ];

    marks.sort((a, b) => a.value - b.value);
    this.lowestMarkType = marks[0].type;
    this.lowestMarkValue = marks[0].value;
    this.generateRecommendations(this.lowestMarkType, this.lowestMarkValue);
  }

  generateRecommendations(lowestMarkType: string, lowestMarkValue: number) {
    switch (lowestMarkType) {
      case 'Semester':
        if (lowestMarkValue < 5) {
          this.recommendations = [
            'Seek immediate help from your professors or academic advisors.',
            'Consider revising your study schedule and focusing more on weak areas.'
          ];
        } else {
          this.recommendations = [
            'Consider attending extra classes or seeking help from your professors.',
            'Review your study habits and ensure you\'re dedicating enough time to each subject.'
          ];
        }
        break;
      case 'Project':
      case 'Aptitude Test':
      case 'Logical Test':
      case 'Communication Test':
        if (lowestMarkValue < 50) {
          this.recommendations = [
            'Review your notes and class materials thoroughly.',
            'Practice regularly using sample questions or exercises related to the subject.',
            'Consider forming study groups with classmates to discuss difficult concepts.'
          ];
        } else {
          this.recommendations = [
            'Seek assistance from your peers or instructors to understand the subject better.',
            'Break down the subject matter into smaller topics and set achievable learning goals.'
          ];
        }
        break;
      default:
        this.recommendations = ['No specific recommendations at this time.'];
        break;
    }
  }
}
