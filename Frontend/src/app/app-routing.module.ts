import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './_auth/auth.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { ProductResolveService } from './services/product-resolve.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { BuyProductResolverService } from './services/buy-product-resolver.service';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { RegisterComponent } from './register/register.component';
import { StepperComponent } from './stepper/stepper.component';
import { StepperTestComponent } from './stepper-test/stepper-test.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  {
    path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] },
    resolve: {
      product: ProductResolveService
    }
  },
  { path: 'view-product', component: ViewProductComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'product-details', component: ProductDetailsComponent, resolve: { product: ProductResolveService } },
  {
    path: 'buy-product', component: BuyProductComponent, canActivate: [AuthGuard], data: { roles: ['User'] },
    resolve: {
      productDetails: BuyProductResolverService,
    },
  },
  {
    path: 'cart', component: CartComponent, canActivate: [AuthGuard], data: { roles: ['User'] },
  },
  { path: 'order-confirmation', component: OrderConfirmationComponent, canActivate: [AuthGuard], data: { roles: ['User']} },
  { path: 'register', component: RegisterComponent },
  { path: 'stepper', component: StepperComponent },
  { path: 'stepper-test', component: StepperTestComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard], data: { roles: ['User']} },
  { path: 'admin-orders', component: AdminOrdersComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
