import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})

export class ProfileComponent{
  user: user;

  constructor() {
    this.user = {
      name: 'Shu Qian',
      age: 20,
      occupation: 'Student',
      rate : 10
    }
  }

}

interface user {
  name: string;
  age: number;
  occupation: string;
  rate: number;
}
