import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})

export class ProfileComponent implements OnInit {
  user: user = {
    name: '刘小忍',
    age: 20,
    birthday: '1996-06'
  };

  constructor() { }

  ngOnInit() {
  }

}

interface user {
  name: string;
  age: number;
  birthday: string;
}
