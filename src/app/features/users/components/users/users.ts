import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { DepartmentService } from '../../../../core/services/department.service';
import { Department } from '../../../../core/models/department';
import { BaseComponent } from '../../../../core/base/base.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class Users extends BaseComponent implements OnInit {

  private fb = inject(FormBuilder);

  private departmentService = inject(DepartmentService);

  departments: Department[] = [];

  isLoading = true;

  departmentForm!: FormGroup;

  ngOnInit(): void {

    this.departmentForm = this.fb.group({

      id: [0],

      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]]

    });

    this.loadDepartments();
  }

  loadDepartments(): void {

    this.departmentService.getDepartments().subscribe({

      next: (response) => {

        this.departments = response.data;

        this.isLoading = false;
this.refresh();
      }

    });

  }

 saveDepartment(): void {

  if (this.departmentForm.invalid) {

    this.departmentForm.markAllAsTouched();

    return;

  }

  const department: Department = this.departmentForm.value;

  if (department.id === 0) {

    // Create
    this.departmentService.addDepartment(department).subscribe({

      next: () => {

        alert('Department created successfully.');

        this.loadDepartments();

        this.clear();

      },

      error: (err) => {

        console.error(err);

        alert('Unable to create department.');

      }

    });

  }
  else {

    // Update
    this.departmentService.updateDepartment(
      department.id,
      department
    ).subscribe({

      next: () => {

        alert('Department updated successfully.');

        this.loadDepartments();

        this.clear();

      },

      error: (err) => {

        console.error(err);

        alert('Unable to update department.');

      }

    });

  }

}

 editDepartment(dept: Department): void {

  this.departmentForm.patchValue({

    id: dept.id,

    name: dept.name

  });

}

  deleteDepartment(id: number): void {

    if (!confirm('Delete Department?'))
      return;

    this.departmentService.deleteDepartment(id).subscribe({

      next: () => this.loadDepartments()

    });

  }

  clear(): void {

  this.departmentForm.reset({

    id: 0,

    name: ''

  });

}

}