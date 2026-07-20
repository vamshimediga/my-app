import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { EmployeeService } from '../../../../core/services/employee.service';
import { Employee } from '../../../../core/models/Employee';
import { BaseComponent } from '../../../../core/base';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard extends BaseComponent implements OnInit {

  private employeeService = inject(EmployeeService);

  employees: Employee[] = [];

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {

    this.employeeService.getEmployees().subscribe({

      next: (response) => {

        console.log(response);

        if (response.success) {
          this.employees = response.data;
          this.refresh();
          console.log(this.employees);
        }

      },

      error: (err) => console.error(err)

    });

  }

}