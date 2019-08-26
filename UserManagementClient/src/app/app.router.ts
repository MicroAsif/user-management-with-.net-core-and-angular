import { AdminRouter } from './admin/admin.router';
import { Routes } from '@angular/router';
import { IndexRoutes } from './index/index.router';



export const routes: Routes = [...AdminRouter, ...IndexRoutes];