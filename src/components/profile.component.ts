import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent {
  name: string;
  age: number;
  occupation: string;
  rate: number;
  constructor(
    private router: Router  )
    {
      this.name = 'Shu Qian';
      this.age = 20;
      this.occupation = 'Student';
      this.rate = 10;
    }
}
