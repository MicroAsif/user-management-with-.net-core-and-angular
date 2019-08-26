import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';

import { Route } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from '../_guard/auth.guard';


export const AdminRouter: Route[] = [

    {
        path: '',
        component: AdminComponent,
        canActivate : [AuthGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'users', component: UsersComponent, data : {roles : ['Admin']} },
            { path: 'user/:id', component: UserComponent , data : {roles : ['Admin']}},
            { path: 'user', component: UserComponent , data : {roles : ['Admin']}}
        ]
    }
];