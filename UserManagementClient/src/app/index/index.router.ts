
import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index.component';
import { LoginGuard } from '../_guard/login.guard';

export const IndexRoutes: Route[] = [
    {   
        path: '',
        component: IndexComponent,
        canActivate : [LoginGuard],
        children: [
           
            { path: 'login', component: LoginComponent },
        ]
    }
];