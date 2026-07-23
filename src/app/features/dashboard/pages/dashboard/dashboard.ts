import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';

import { MessageService } from 'primeng/api';

import { EmployeeService } from '../../../../core/services/employee.service';
import { DepartmentService } from '../../../../core/services/department.service';

import { Employee } from '../../../../core/models/Employee';
import { Department } from '../../../../core/models/department';
import { BaseComponent } from '../../../../core/base';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    SelectModule,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard extends BaseComponent implements OnInit {

  //==========================
  // Services
  //==========================

  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  private messageService = inject(MessageService);

  constructor(private fb: FormBuilder) {
    super();
  }

  //==========================
  // Variables
  //==========================

  employees: Employee[] = [];
  departments: Department[] = [];

  employeeForm!: FormGroup;

  displayDialog = false;
  confirmDeleteDialog = false;

  isEdit = false;
  submitted = false;

  selectedEmployee!: Employee;

  //==========================
  // OnInit
  //==========================

  ngOnInit(): void {

    this.createForm();
    this.loadEmployees();
    this.loadDepartments();

  }

  //==========================
  // Create Form
  //==========================

  createForm(): void {

    this.employeeForm = this.fb.group({

      id: [0],

      employeeCode: ['', Validators.required],

      firstName: ['', Validators.required],

      lastName: [''],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phone: ['', Validators.required],

      salary: [
        0,
        Validators.required
      ],

      joiningDate: [
        '',
        Validators.required
      ],

      departmentId: [
        null,
        Validators.required
      ],

      profileImage: ['']

    });

  }

  //==========================
  // Load Employees
  //==========================

  loadEmployees(): void {

    this.employeeService.getEmployees().subscribe({

      next: (response) => {

        if (response.success) {

          this.employees = response.data;
          this.refresh();

        }

      },

      error: () => {

        this.messageService.add({

          severity: 'error',

          summary: 'Error',

          detail: 'Unable to load employees.'

        });

      }

    });

  }

  //==========================
  // Load Departments
  //==========================

  loadDepartments(): void {

    this.departmentService.getDepartments().subscribe({

      next: (response) => {

        if (response.success) {

          this.departments = response.data;
          this.refresh();

        }

      }

    });

  }

  //==========================
  // Add Employee
  //==========================

  addEmployee(): void {

    this.isEdit = false;
    this.submitted = false;

    this.employeeForm.reset({

      id: 0,

      salary: 0,

      departmentId: null

    });

    this.displayDialog = true;

  }

  //==========================
  // Edit Employee
  //==========================

  editEmployee(employee: Employee): void {

    this.isEdit = true;
    this.submitted = false;

    this.employeeForm.patchValue({

      id: employee.id,

      employeeCode: employee.employeeCode,

      firstName: employee.firstName,

      lastName: employee.lastName,

      email: employee.email,

      phone: employee.phone,

      salary: employee.salary,

      joiningDate: employee.joiningDate?.substring(0, 10),

      departmentId: employee.departmentId,

      profileImage: employee.profileImage

    });

    this.displayDialog = true;

  }

  //==========================
  // Save Employee
  //==========================

  saveEmployee(): void {

    this.submitted = true;

    if (this.employeeForm.invalid) {

      this.employeeForm.markAllAsTouched();

      return;

    }

    const employee = this.employeeForm.value;

    if (this.isEdit) {

      this.employeeService.updateEmployee(employee.id, employee).subscribe({

        next: () => {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: 'Employee Updated Successfully'

          });

          this.displayDialog = false;

          this.loadEmployees();

        },

        error: () => {

          this.messageService.add({

            severity: 'error',

            summary: 'Error',

            detail: 'Update Failed'

          });

        }

      });

    }
    else {

      this.employeeService.addEmployee(employee).subscribe({

        next: () => {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: 'Employee Added Successfully'

          });

          this.displayDialog = false;

          this.loadEmployees();

        },

        error: () => {

          this.messageService.add({

            severity: 'error',

            summary: 'Error',

            detail: 'Insert Failed'

          });

        }

      });

    }

  }

  //==========================
  // Delete Employee
  //==========================

  deleteEmployee(employee: Employee): void {

    this.selectedEmployee = employee;

    this.confirmDeleteDialog = true;

  }

  //==========================
  // Confirm Delete
  //==========================

  deleteEmployeeConfirmed(): void {

    this.employeeService.deleteEmployee(this.selectedEmployee.id).subscribe({

      next: () => {

        this.messageService.add({

          severity: 'success',

          summary: 'Deleted',

          detail: 'Employee Deleted Successfully'

        });

        this.confirmDeleteDialog = false;

        this.loadEmployees();

      },

      error: () => {

        this.messageService.add({

          severity: 'error',

          summary: 'Error',

          detail: 'Delete Failed'

        });

      }

    });

  }

  //==========================
  // Close Dialog
  //==========================

  hideDialog(): void {

    this.displayDialog = false;
    this.submitted = false;

  }

  //==========================
  // Clear Form
  //==========================

  clear(): void {

    this.employeeForm.reset({

      id: 0,

      salary: 0,

      departmentId: null

    });

    this.isEdit = false;

    this.submitted = false;

  }

  //==========================
  // Department Name
  //==========================

  getDepartmentName(departmentId: number): string {

    const department = this.departments.find(x => x.id === departmentId);

    return department ? department.name : '';

  }

}