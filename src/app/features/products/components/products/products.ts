import { Component } from '@angular/core';
import { Student } from '../../../student/student';

@Component({
  selector: 'app-products',
  imports: [Student],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {}
