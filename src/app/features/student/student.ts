import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { StudentService } from '../../core/services/student.service';
import { IStudents } from '../../core/models/IStudents';
import { BaseComponent } from '../../core/base';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './student.html',
  styleUrl: './student.css'
})
export class Student extends BaseComponent implements OnInit {

  private studentService = inject(StudentService);
  private fb = inject(FormBuilder);

  students: IStudents[] = [];

  studentForm = this.fb.group({
    id: [0],
    name: [''],
    age: [0],
    email: [''],
    courseId: [0]
  });

  ngOnInit(): void {
    this.loadStudents();
  }

  //=========================
  // Get All Students
  //=========================
  loadStudents(): void {

    this.studentService.getStudents().subscribe({

      next: (response) => {

        console.log(response);

        if (response.success) {

          this.students = response.data;

          this.refresh();

        }

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  //=========================
  // Save / Update
  //=========================
  save(): void {

    const student = this.studentForm.getRawValue() as IStudents;

    if (student.id === 0) {

      this.studentService.addStudent(student).subscribe({

        next: () => {

          this.loadStudents();

          this.clear();

        },

        error: err => console.error(err)

      });

    }
    else {

      this.studentService.updateStudent(student).subscribe({

        next: () => {

          this.loadStudents();

          this.clear();

        },

        error: err => console.error(err)

      });

    }

  }

  //=========================
  // Edit
  //=========================
  edit(student: IStudents): void {

    this.studentForm.patchValue({

      id: student.id,

      name: student.name,

      age: student.age,

      email: student.email,

      courseId: student.courseId

    });

  }

  //=========================
  // Delete
  //=========================
  delete(id: number): void {

    if (!confirm('Are you sure you want to delete this student?'))
      return;

    this.studentService.deleteStudent(id).subscribe({

      next: () => {

        this.loadStudents();

      },

      error: err => console.error(err)

    });

  }

  //=========================
  // Clear Form
  //=========================
  clear(): void {

    this.studentForm.reset({

      id: 0,

      name: '',

      age: 0,

      email: '',

      courseId: 0

    });

  }

}