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


export const routes: Routes = [

  {
    path: '', component: UserComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent},
      { path: 'category', component: CategoryListComponent},
      { path: 'products', component: ListProductComponent},
      { path: 'product-details/:id', component: DetailsProductComponent},
      { path: 'cart', component: CartComponent},
      { path: 'login-user', component: LoginComponent},
      { path: 'signup-user', component: SignUpComponent},
      { path: '**', component: NotFoundComponent},

    ]
  },

  {
    path: 'auth', component: AuthComponent, children: [
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
      {
        path: 'login', component: LoginComponent
    },
      {
        path: 'sign-up', component: LoginComponent
    },
      {
        path: '**', component: NotFoundComponent
    }
    ]
  },


];
