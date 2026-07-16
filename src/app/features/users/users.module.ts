import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing-module';
import { Users } from './components/users/users';

@NgModule({
  declarations: [],
  imports: [CommonModule, UsersRoutingModule],
})
export class UsersModule {}
