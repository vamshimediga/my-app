import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';


import { EmployeeService } from '../../../../core/services/employee.service';
import { Employee } from '../../../../core/models/Employee';
import { BaseComponent } from '../../../../core/base';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
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

        if (response.success) {

          this.employees = response.data;

          this.refresh();

        }

      },

      error: (err) => console.error(err)

    });

  }

}