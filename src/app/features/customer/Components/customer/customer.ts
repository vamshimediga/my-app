import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CustomerService } from '../../../../core/services/customer.Service';
import { Account, Customer } from '../../../../core/models/customer';
import { BaseComponent } from '../../../../core/base';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-customer',
  standalone: true,

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

  templateUrl: './customer.html',
  styleUrls: ['./customer.css']
})
export class CustomerComponent extends BaseComponent implements OnInit {

  private fb = inject(FormBuilder);
  private service = inject(CustomerService);

  customers: Customer[] = [];

  display = false;

  customerForm!: FormGroup;

  ngOnInit(): void {

    this.customerForm = this.fb.group({
      id: [0],

      customerCode: [
        '',
        Validators.required
      ],

      fullName: [
        '',
        Validators.required
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phone: [
        '',
        Validators.required
      ],

      accounts: this.fb.array([])
    });

    this.loadCustomers();
  }

  get accounts(): FormArray {
    return this.customerForm.get('accounts') as FormArray;
  }

  newAccount(): FormGroup {
    return this.fb.group({
      id: [0],
      accountNumber: [''],
      balance: [0],
      customerId: [0]
    });
  }

  addAccount(): void {
    this.accounts.push(this.newAccount());
  }

  removeAccount(index: number): void {
    this.accounts.removeAt(index);
  }

  loadCustomers(): void {

    this.service.getCustomers().subscribe({
      next: (res: any) => {

        this.customers = res.data ?? res;

        this.refresh();
      },

      error: (error) => {
        console.error(error);
      }
    });
  }

  openNew(): void {

    this.customerForm.reset({
      id: 0,
      customerCode: '',
      fullName: '',
      email: '',
      phone: ''
    });

    this.accounts.clear();

    this.display = true;
  }

  edit(customer: Customer): void {

    this.accounts.clear();

    customer.accounts.forEach((x: Account) => {

      this.accounts.push(
        this.fb.group({
          id: [x.id],
          accountNumber: [x.accountNumber],
          balance: [x.balance],
          customerId: [x.customerId]
        })
      );

    });

    this.customerForm.patchValue({
      id: customer.id,
      customerCode: customer.customerCode,
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone
    });

    this.display = true;
  }

  save(): void {

    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    const customer = this.customerForm.value;

    if (customer.id === 0) {

      this.service.createCustomer(customer).subscribe(() => {

        this.loadCustomers();

        this.display = false;

      });

    } else {

      this.service.updateCustomer(
        customer.id,
        customer
      ).subscribe(() => {

        this.loadCustomers();

        this.display = false;

      });

    }
  }

  delete(id: number): void {

    if (confirm('Delete Customer?')) {

      this.service.deleteCustomer(id).subscribe(() => {

        this.loadCustomers();

      });

    }
  }

}