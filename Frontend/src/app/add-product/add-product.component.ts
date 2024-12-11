import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit{

  isNewProduct = true;
  product: Product = {
    productId: null,
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []
  }  

  constructor(
    private productService: ProductService,
    private router: Router,
    private snackbar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private ngxService: NgxUiLoaderService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    if (this.product && this.product.productId) {
      this.isNewProduct = false;
    }
  }
  addProduct(productForm: NgForm){
    this.ngxService.start();
    const productFormData = this.prepareFormData(this.product)
    this.productService.addProduct(productFormData).subscribe( (response: Product) => {
      this.ngxService.stop();
      console.log(response);
      this.snackbar.open("Product added successfully.", "Close", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'snackbar-success',
        duration: 4000
      });
      productForm.reset();
      this.product.productImages = [];
    }, (error: HttpErrorResponse) => {
      this.ngxService.stop();
      console.log(error);
      this.snackbar.open("System is busy, try again later.", "Close", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'snackbar-danger',
        duration: 4000
      })
    })
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json'})
    );

    for (var i = 0; i < product.productImages.length; i++) {
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
      
    }
    return formData;
  }
  
  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle : FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.product.productImages.push(fileHandle);
    }
  }

  removeImages(i: number) {
    this.product.productImages.splice(i, 1)
  }

  fileDropped(fileHandle: FileHandle) {
    this.product.productImages.push(fileHandle);
  }
}
