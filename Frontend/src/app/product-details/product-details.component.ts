import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{

  product!: Product;
  selectedProductIndex = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private snackbar: MatSnackBar,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product)
  }

  //On click change index
  changeIndex(index: any) {
    this.selectedProductIndex = index;
  }
  //function to add product to cart
  addToCart(productId: any){
    this.ngxService.start();
    this.productService.addToCart(productId).subscribe(
      (response: any) => {
        this.ngxService.stop();
        console.log(response);
        this.snackbar.open("Product successfully added to cart.", "Close", {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackbar-success',
          duration: 5000
        })
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
        this.snackbar.open("Sustem busy, try again later.", "Close", {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackbar-danger',
          duration: 5000
        })
      }
    );

  }
  //Direct user to buy product page
  buyProduct(productId: any) {
    this.router.navigate(['/buy-product', {
      isSingleProductCheckout: true, id: productId 
    }])
  }
}
