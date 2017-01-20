import {Component} from '@angular/core';

@Component({
  selector: 'my-button',
  templateUrl: './click.component.html',
  styleUrls: ['./click.component.css']
})
export class ButtonComponent {
  click = 'right!';
}
