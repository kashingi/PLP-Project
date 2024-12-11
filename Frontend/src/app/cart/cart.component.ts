import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  displayedColumns: string[] = ['Id', 'Name', 'Description', 'Price', 'Discounted Price', 'Action'];
  dataSource: any;
  cartDetails: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private snackbar: MatSnackBar,
    private ngxService: NgxUiLoaderService,
  ) {}
  ngOnInit(): void {
    this.getCartDetails();
  }

  //get cart details
  getCartDetails() {
    this.ngxService.start();
    this.productService.getCartDetails().subscribe(
      (resp: any) => {
        this.ngxService.stop();
        console.log(resp);
        this.cartDetails = resp;
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
      }
    );
  }

  //Function to checkout
  checkout() {
    this.router.navigate(['/buy-product', {
      isSingleProductCheckout: false, id: 0 
    }])
  }

  //create function to delete cart item or remove cart item from cart list
  deleteItem(cartId: number) {
    this.ngxService.start();
    console.log(cartId);

    this.productService.deleteCartItem(cartId).subscribe(
      (resp: any) => {
        this.ngxService.stop();
        console.log(resp);
        this.snackbar.open("Cart item removed successfully.", "Close", {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackbar-success',
          duration: 4000
        });
        this.getCartDetails();
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
        this.snackbar.open("System is busy try again later.", "Close", {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackbar-success',
          duration: 3000
        });
      }
    );
  }
}
