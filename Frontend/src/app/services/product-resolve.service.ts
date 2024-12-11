import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product> {

  constructor(
    private productService: ProductService,
    private imageService: ImageService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = route.paramMap.get("productId");

    if (id) {
      //Fetch product details from backed
      return this.productService.getProductDetailsById(id)
      .pipe(
        map(p => this.imageService.createImage(p))
      )
    } else {
      //Return empty product Observable
      return of(this.getProductDetails());
    }
  }

  getProductDetails() {
    return {
      productId: null,
      productName: "",
      productDescription: "",
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: []

    }
  }
}
