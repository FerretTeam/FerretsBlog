import {Component} from '@angular/core';

@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {
  name: string;
  age: number;
  occupation: string;
  rate: number;
  constructor() {
    this.name = 'Shu Qian';
    this.age = 20;
    this.occupation = 'Student';
    this.rate = 10;
  }
}
