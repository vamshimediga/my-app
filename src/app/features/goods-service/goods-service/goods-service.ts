import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { BaseComponent } from '../../../core/base/base.component';
import { GoodsServiceDomainModel } from '../../../core/models/goods-service.model';
import { GoodsServiceApi } from '../../../core/services/goods-service.service';


@Component({
  selector: 'app-goods-service',

  standalone: true,

   imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TableModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule
  ],

  templateUrl: './goods-service.html',
  styleUrl: './goods-service.css',

  providers: [
    MessageService
  ]
})
export class GoodsServiceComponent
  extends BaseComponent
  implements OnInit {


  // =====================================================
  // DEPENDENCIES
  // =====================================================

  private readonly api =
    inject(GoodsServiceApi);

  private readonly fb =
    inject(FormBuilder);

  private readonly messageService =
    inject(MessageService);


  // =====================================================
  // DATA
  // =====================================================

  goodsServices: GoodsServiceDomainModel[] = [];

  loading = false;

  totalRecords = 0;


  // =====================================================
  // DIALOG
  // =====================================================

  displayDialog = false;

  isEditMode = false;

  selectedId = 0;


  // =====================================================
  // SEARCH
  // =====================================================

  searchText = '';

  selectedType: string | null = null;

  minPrice: number | null = null;

  maxPrice: number | null = null;

  pageNumber = 1;

  pageSize = 10;


  // =====================================================
  // FORM
  // =====================================================

  goodsForm!: FormGroup;


  // =====================================================
  // TYPES
  // =====================================================

  types = [
    {
      label: 'Goods',
      value: 'Goods'
    },
    {
      label: 'Service',
      value: 'Service'
    }
  ];


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.goodsForm = this.fb.group({

      id: [0],

      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200)
        ]
      ],

      code: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],

      type: [
        null,
        Validators.required
      ],

      price: [
        0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      categoryId: [
        0,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      isActive: [true]

    });


    this.loadGoodsServices();
  }


  // =====================================================
  // GET ALL
  // =====================================================

  loadGoodsServices(): void {

    this.loading = true;

    this.api.getAll().subscribe({

      next: response => {
debugger
        this.goodsServices =  response.data ?? [];

        this.totalRecords =
          this.goodsServices.length;

        this.loading = false;

        this.refresh();
      },

      error: error => {

        console.error(error);

        this.loading = false;

        this.showError(
          'Unable to load goods/services.'
        );
      }

    });
  }


  // =====================================================
  // SEARCH
  // =====================================================

  search(): void {

    this.pageNumber = 1;

    this.loading = true;

    this.api.search(
      this.searchText,
      this.selectedType ?? undefined,
      this.minPrice ?? undefined,
      this.maxPrice ?? undefined,
      this.pageNumber,
      this.pageSize
    )
    .subscribe({

      next: response => {

        this.goodsServices =
          response.data ?? [];

        this.totalRecords =
          this.goodsServices.length;

        this.loading = false;
      },

      error: error => {

        console.error(error);

        this.loading = false;

        this.showError(
          'Search failed.'
        );
      }

    });
  }


  // =====================================================
  // CLEAR SEARCH
  // =====================================================

  clearSearch(): void {

    this.searchText = '';

    this.selectedType = null;

    this.minPrice = null;

    this.maxPrice = null;

    this.pageNumber = 1;

    this.loadGoodsServices();
  }


  // =====================================================
  // CREATE
  // =====================================================

  openCreate(): void {

    this.isEditMode = false;

    this.selectedId = 0;

    this.goodsForm.reset({

      id: 0,

      name: '',

      code: '',

      type: null,

      price: 0,

      categoryId: 0,

      isActive: true

    });

    this.displayDialog = true;
  }


  // =====================================================
  // EDIT
  // =====================================================

  openEdit(
    item: GoodsServiceDomainModel
  ): void {

    this.isEditMode = true;

    this.selectedId = item.id;

    this.goodsForm.patchValue({

      id: item.id,

      name: item.name,

      code: item.code,

      type: item.type,

      price: item.price,

      categoryId: item.categoryId,

      isActive: item.isActive

    });

    this.displayDialog = true;
  }


  // =====================================================
  // SAVE / UPDATE
  // =====================================================

  save(): void {

    // Validate form

    if (this.goodsForm.invalid) {

      this.goodsForm.markAllAsTouched();

      return;
    }


    // Get form data

    const data =
      this.goodsForm.value as GoodsServiceDomainModel;


    // =================================================
    // UPDATE
    // =================================================

    if (this.isEditMode) {

      this.api.update(
        this.selectedId,
        data
      )
      .subscribe({

        next: () => {

          this.displayDialog = false;

          this.showSuccess(
            'Goods/service updated successfully.'
          );

          this.loadGoodsServices();
        },

        error: error => {

          console.error(error);

          this.showError(
            'Unable to update goods/service.'
          );
        }

      });

      return;
    }


    // =================================================
    // CREATE
    // =================================================

    this.api.create(data)
      .subscribe({

        next: () => {

          this.displayDialog = false;

          this.showSuccess(
            'Goods/service created successfully.'
          );

          this.loadGoodsServices();
        },

        error: error => {

          console.error(error);

          this.showError(
            'Unable to create goods/service.'
          );
        }

      });
  }


  // =====================================================
  // DELETE
  // =====================================================

  delete(
    item: GoodsServiceDomainModel
  ): void {

    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${item.name}"?`
      );


    // User clicked Cancel

    if (!confirmed) {

      return;
    }


    // User clicked OK

    this.api.delete(item.id)
      .subscribe({

        next: () => {

          this.showSuccess(
            'Goods/service deleted successfully.'
          );

          this.loadGoodsServices();
        },

        error: error => {

          console.error(error);

          this.showError(
            'Unable to delete goods/service.'
          );
        }

      });
  }


  // =====================================================
  // CLOSE DIALOG
  // =====================================================

  closeDialog(): void {

    this.displayDialog = false;
  }


  // =====================================================
  // SUCCESS MESSAGE
  // =====================================================

  private showSuccess(
    message: string
  ): void {

    this.messageService.add({

      severity: 'success',

      summary: 'Success',

      detail: message

    });
  }


  // =====================================================
  // ERROR MESSAGE
  // =====================================================

  private showError(
    message: string
  ): void {

    this.messageService.add({

      severity: 'error',

      summary: 'Error',

      detail: message

    });
  }

}