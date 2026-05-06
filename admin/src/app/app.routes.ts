// import { Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
// import { AddCategoryComponent } from './category/add-category/add-category.component';
// import { ViewCategoryComponent } from './category/view-category/view-category.component';
// import { AddProductComponent } from './product/add-product/add-product.component';
// import { ViewProductComponent } from './product/view-product/view-product.component';
// import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
// export const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//      { path: 'category/add', component: AddCategoryComponent },
//   { path: 'category/view', component: ViewCategoryComponent },
//     { path: 'product/add', component: AddProductComponent },
//   { path: 'product/view', component: ViewProductComponent },
//   { path: 'admin-orders', component: AdminOrdersComponent }
// ];

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ViewCategoryComponent } from './category/view-category/view-category.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { authGuard } from './auth.guard'; 

export const routes: Routes = [

  // default → login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // login page
  { path: 'login', component: LoginComponent },

  // 🔐 PROTECTED ROUTES
  { path: 'category/add', component: AddCategoryComponent, canActivate: [authGuard] },
  { path: 'category/view', component: ViewCategoryComponent, canActivate: [authGuard] },
  { path: 'product/add', component: AddProductComponent, canActivate: [authGuard] },
  { path: 'product/view', component: ViewProductComponent, canActivate: [authGuard] },
  { path: 'admin-orders', component: AdminOrdersComponent, canActivate: [authGuard] },

  // fallback
  { path: '**', redirectTo: 'login' }

];