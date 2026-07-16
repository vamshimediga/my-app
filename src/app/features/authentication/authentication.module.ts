import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Login } from './login/login';
import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    Login,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }