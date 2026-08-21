import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GoodsServiceRoutingModule } from './goods-service-routing-module';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import {
  MessageService,
  ConfirmationService
} from 'primeng/api';

@NgModule({

  declarations: [],

  imports: [

    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    GoodsServiceRoutingModule,

    // PrimeNG
    TableModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule

  ],

  providers: [
    MessageService,
    ConfirmationService
  ]

})
export class GoodsServiceModule {}