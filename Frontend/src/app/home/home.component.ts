import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { map } from 'rxjs';
import { Product } from '../model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageService } from '../services/image.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  pageNumber: number = 0;
  productDetails: Product[] = [];
  showLoadButton = false;

  constructor(
    private productService: ProductService,
    private imageService: ImageService,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
      this.getAllProducts();
  }

  //function to search a product
  searchByKeyword(searchkeyword: any){
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }
  public getAllProducts(searchKey: string = "") {
    this.ngxService.start();
    this.productService.getAllProducts(this.pageNumber, searchKey)
    .pipe(
      map( (x: Product[], i) => x.map( (product: Product) => this.imageService.createImage(product)))
    )
    .subscribe( (response: Product[]) => {
      this.ngxService.stop();
      console.log(response);
      if (response.length == 4) {
        this.showLoadButton = true;
      }else {
        this.showLoadButton = false;
      }
      response.forEach(p => this.productDetails.push(p));
      // this.productDetails = response;
    }, (error: HttpErrorResponse) => {
      this.ngxService.stop();
      console.log(error);
    })
  }

  //function to load more products
  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }
  //call view details from service
  showProductDetails(productId: any) {
    this.router.navigate(['/product-details', { productId: productId }])
  }
}
