import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterModule,
  RouterOutlet,
  RouterLinkActive
} from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { UserResponse } from '../../../core/models/UserResponse';
import { BaseComponent } from '../../../core/base';

@Component({
  selector: 'app-layout-component',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    RouterLinkActive
  ],
  templateUrl: './layout-component.html',
  styleUrls: ['./layout-component.css']
})
export class LayoutComponent extends BaseComponent implements OnInit {

  user: UserResponse | null = null;

  private authService = inject(AuthService);
  private router = inject(Router);
  

  ngOnInit(): void {
    console.log('Layout ngOnInit');
    this.loadProfile();
  }

   loadProfile() {

        this.authService.getProfile().subscribe({

            next: response => {debugger

                this.user = response["data"];

                this.refresh();

            }

        });

    }
  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);

  }

}