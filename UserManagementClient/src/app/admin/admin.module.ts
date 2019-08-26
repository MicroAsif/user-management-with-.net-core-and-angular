import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { HasRoleDirective } from '../_directive/hasRole.directive';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule, 
   
    SharedModule,
  ],
  declarations: [ 
    UsersComponent, 
    UserComponent, 
    DashboardComponent, 
    HasRoleDirective,
  ],
  exports:[HasRoleDirective],

})
export class AdminModule { }
