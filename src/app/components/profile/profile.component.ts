import { Component, OnInit } from '@angular/core';
import { MockData } from 'mock-data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})

export class ProfileComponent implements OnInit {
  user: user;

  constructor() {
  this.user.name = MockData.string();
  this.user.age = MockData.integer(1, 100);
  this.user.birthday =  MockData.Date(1900, 2017, false, "YYYY-MM")
}

  ngOnInit() {
  }

}

interface user {
  name: string;
  age: number;
  birthday: string;
}
