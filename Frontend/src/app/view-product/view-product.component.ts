import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowImagesComponent } from '../show-images/show-images.component';
import { ImageService } from '../services/image.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent implements OnInit{

  showLoadMoreProduct = false
  showTable = false;
  pageNumber: number = 0;
  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'Product Name', 'description', 'Discounted Price', 'Actual Price', 'Actions'];



  constructor(
    private productService: ProductService,
    public imageDialog: MatDialog,
    private imageService: ImageService,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  //Function to search a product
  searchByKeyword(searchkeyword: string) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }
  //Call getAllProducts() from product service
  public getAllProducts(searchkeyword: string = "") {
    this.showTable = false;
    this.ngxService.start();
    this.productService.getAllProducts(this.pageNumber, searchkeyword)
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageService.createImage(product)))
    )
    .subscribe( (response: Product[]) => {
      this.ngxService.stop();
      response.forEach(product => this.productDetails.push(product));
      console.log("Loaded products : ",this.productDetails);
      this.showTable = true;
      if (response.length == 4) {
        this.showLoadMoreProduct = true;
      } else {
        this.showLoadMoreProduct = false;
      }
      // this.productDetails = response;
    }, (error: HttpErrorResponse) => {
      this.ngxService.stop();
      console.log(error);
    })
  }

  //Function to load more products
  loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }
  //Call delete product from produt service
  deleteProduct(productId: number) {
    this.ngxService.start();
    this.productService.deleteProduct(productId).subscribe( 
      (response: any) => {
        this.ngxService.stop();
        console.log(response);
        this.getAllProducts();
      }, 
      (error: HttpErrorResponse) => {
        this.ngxService.stop();
        console.log(error)
      }
    );
  }

  // View product details
  showImages(product: Product) {
    console.log(product);
    this.imageDialog.open(ShowImagesComponent, {
      data: {
        images: product.productImages
      },
      width: '600px'
    });
  }

  //Call edit function from product service to update product details
  editProductDetails(productId: any) {
    this.router.navigate(['/add-product', {productId}]);
  }
}
