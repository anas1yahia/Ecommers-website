import { Product } from './features/product/modules/products';
import { UserComponent } from './core/layouts/user-layout/user.component';
import { Routes } from '@angular/router';
import { AuthComponent } from './core/layouts/auth-layout/auth.component';
import { LoginComponent } from './core/auth/components/login/login.component';
import { NotFoundComponent } from './core/auth/components/not-found/not-found.component';
import { HomeComponent } from './features/home/home.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { CartComponent } from './features/cart/cart.component';
import { ListProductComponent } from './features/product/components/list-product/list-product.component';
import { DetailsProductComponent } from './features/product/components/details-product/details-product.component';
import { SignUpComponent } from './core/auth/components/sign-up/sign-up.component';
import { authGuard } from './core/guards/auth-guard.guard';
import { ShipmentFormComponent } from './features/order/components/shipment-form/shipment-form.component';


export const routes: Routes = [
  // Auth routes FIRST - no guard, so they're always accessible
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login-user', pathMatch: 'full' },
      { path: 'login-user', component: LoginComponent },
      { path: 'signup-user', component: SignUpComponent }
    ]
  },

  // Protected routes SECOND - with guard
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'category', component: CategoryListComponent },
      { path: 'products', component: ListProductComponent },
      { path: 'product-details/:id', component: DetailsProductComponent },
      { path: 'cart', component: CartComponent,
    canActivate: [authGuard] },
    { path: 'checkout/:id', component: ShipmentFormComponent },
    ]
  },

  // Global 404 route LAST
  { path: '**', component: NotFoundComponent }
];
