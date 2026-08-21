import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { BaseComponent } from '../../../../core/base';
import { DesignationService } from '../../../../core/services/designation.service';
import { Designation } from '../../../../core/models/designation.model';

import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-designation',

  imports: [
    CommonModule,
    ReactiveFormsModule,

    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    SelectModule,
    ToastModule,
    DividerModule,
    ToolbarModule,
    ConfirmDialogModule
  ],

  templateUrl: './designation.html',

  styleUrl: './designation.css',
})
export class DesignationComponent
  extends BaseComponent
  implements OnInit {


  // ==========================================
  // DEPENDENCIES
  // ==========================================

  private readonly fb =
    inject(FormBuilder);

  private readonly designationService =
    inject(DesignationService);

  private readonly messageService =
    inject(MessageService);


  // ==========================================
  // VARIABLES
  // ==========================================

  designations: Designation[] = [];

  designationForm!: FormGroup;

  selectedId = 0;

  isEditMode = false;

  loading = false;

  selectedDesignation!: Designation;


  // ==========================================
  // INIT
  // ==========================================

  ngOnInit(): void {

    this.createForm();

    this.getAllDesignations();

  }


  // ==========================================
  // CREATE FORM
  // ==========================================

  createForm(): void {

    this.designationForm =
      this.fb.group({

        name: [
          '',
          [
            Validators.required,
            Validators.maxLength(100)
          ]
        ],

        description: [
          '',
          [
            Validators.maxLength(500)
          ]
        ],

        isActive: [
          true
        ]

      });

  }


  // ==========================================
  // GET ALL
  // ==========================================

  getAllDesignations(): void {

    this.loading = true;

    this.designationService
      .getAll()
      .subscribe({

        next: (response) => {

          this.designations =
            response.data ?? [];

          this.loading = false;

          this.refresh();

        },

        error: (error) => {

          console.error(
            'Get all designations failed',
            error
          );

          this.loading = false;

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load designations.'
          });

        }

      });

  }


  // ==========================================
  // GET BY ID
  // ==========================================

  getDesignationById(
    id: number
  ): void {

    this.designationService
      .getById(id)
      .subscribe({

        next: (response) => {

          const designation =
            response.data;

          if (!designation) {

            this.messageService.add({
              severity: 'warn',
              summary: 'Warning',
              detail: 'Designation not found.'
            });

            return;

          }

          this.selectedDesignation =
            designation;

          this.selectedId =
            designation.id;

          this.designationForm.patchValue({

            name:
              designation.name,

            description:
              designation.description,

            isActive:
              designation.isActive

          });

          this.isEditMode = true;

        },

        error: (error) => {

          console.error(
            'Get designation failed',
            error
          );

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to get designation.'
          });

        }

      });

  }


  // ==========================================
  // EDIT
  // ==========================================

  editDesignation(
    designation: Designation
  ): void {

    this.selectedDesignation =
      designation;

    this.selectedId =
      designation.id;

    this.designationForm.patchValue({

      name:
        designation.name,

      description:
        designation.description,

      isActive:
        designation.isActive

    });

    this.isEditMode = true;

  }


  // ==========================================
  // SAVE
  // CREATE / UPDATE
  // ==========================================

  saveDesignation(): void {

    debugger;


    // ----------------------------------------
    // VALIDATION
    // ----------------------------------------

    if (
      this.designationForm.invalid
    ) {

      this.designationForm
        .markAllAsTouched();

      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Please fill all required fields.'
      });

      return;

    }


    // ----------------------------------------
    // CURRENT DATE
    // ----------------------------------------

    const now =
      new Date().toISOString();


    // ----------------------------------------
    // DESIGNATION OBJECT
    // ----------------------------------------

    const designation: Designation = {

      id:
        this.isEditMode
          ? this.selectedId
          : 0,

      name:
        this.designationForm
          .value
          .name,

      description:
        this.designationForm
          .value
          .description || null,

      isActive:
        this.designationForm
          .value
          .isActive,

      // CREATE
      // Keep existing CreatedOn during UPDATE

      createdOn:
        this.isEditMode
          ? this.selectedDesignation.createdOn
          : now,

      // CREATE = null
      // UPDATE = current date

      modifiedOn:
        this.isEditMode
          ? now
          : null

    };


    // ========================================
    // UPDATE
    // ========================================

    if (this.isEditMode) {

      this.designationService
        .update(
          this.selectedId,
          designation
        )
        .subscribe({

          next: (response) => {

            console.log(
              'Update response:',
              response
            );

            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail:
                'Designation updated successfully.'
            });

            this.getAllDesignations();

            this.resetForm();

          },

          error: (error) => {

            console.error(
              'Update failed:',
              error
            );

            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'Failed to update designation.'
            });

          }

        });

      return;

    }


    // ========================================
    // CREATE
    // ========================================

    this.designationService
      .create(
        designation
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Create response:',
            response
          );

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail:
              'Designation created successfully.'
          });

          this.getAllDesignations();

          this.resetForm();

        },

        error: (error) => {

          console.error(
            'Create failed:',
            error
          );

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              'Failed to create designation.'
          });

        }

      });

  }


  // ==========================================
  // DELETE
  // ==========================================

  deleteDesignation(
    id: number
  ): void {

    const confirmed =
      confirm(
        'Are you sure you want to delete this designation?'
      );

    if (!confirmed) {
      return;
    }


    this.designationService
      .delete(id)
      .subscribe({

        next: (response) => {

          console.log(
            'Delete response:',
            response
          );

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail:
              'Designation deleted successfully.'
          });

          this.getAllDesignations();

        },

        error: (error) => {

          console.error(
            'Delete failed:',
            error
          );

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              'Failed to delete designation.'
          });

        }

      });

  }


  // ==========================================
  // RESET
  // ==========================================

  resetForm(): void {

    this.selectedId = 0;

    this.isEditMode = false;

    this.selectedDesignation =
      undefined as any;

    this.designationForm.reset({

      name: '',

      description: '',

      isActive: true

    });

  }


  // ==========================================
  // VALIDATION
  // ==========================================

  isInvalid(
    controlName: string
  ): boolean {

    const control =
      this.designationForm
        .get(controlName);

    return !!(
      control &&
      control.invalid &&
      (
        control.touched ||
        control.dirty
      )
    );

  }

}