import { Component, Input } from '@angular/core';
import { MatCardAvatar, MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-by-status',
  imports: [
    MatCardModule,
    MatCardAvatar,
    MatIconModule
],
  templateUrl: './order-by-status.component.html',
  styleUrl: './order-by-status.component.scss'
})
export class OrderByStatusComponent {
  @Input() data:any;

}
