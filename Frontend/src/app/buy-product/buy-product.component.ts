import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../model/order-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.scss'
})
export class BuyProductComponent implements OnInit{

  isSingleProductCheckout: any = '';
  productDetails: Product[] = [];
  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  }

  constructor(
    private activatedRouted: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
  ) {}

  ngOnInit(): void {
    this.productDetails = this.activatedRouted.snapshot.data['productDetails'];
    this.isSingleProductCheckout = this.activatedRouted.snapshot.paramMap.get("isSingleProductCheckout");

    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push(
        { productId: x.productId, quantity: 1 }
      )
    );
    console.log(this.productDetails);
    console.log(this.orderDetails);
  }

  public placeOrder(orderForm: NgForm) {
    this.ngxService.start();
    this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckout).subscribe( 
      (response: any) => {
        this.ngxService.stop();
        console.log(response);
        orderForm.reset();
        this.router.navigate(['/order-confirmation']);
      }, 
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
      }
    );
  }
  //get selected quantity of the product
  getQuantityForProduct(productId: any) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );
    return filteredProduct[0].quantity;
  }

  //Calculate the total
  getCalculatedTotal(productId: any, productDiscountedPrice: any) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity * productDiscountedPrice;
  }
  //Update the total when a new value is selected
  onQuantityChange(quantity: any, productId: any) {
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = quantity;
  }

  //Calculate grand total
  getCalculatedGrandTotal() {
    let grandtotal = 0;

    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity) => {
        const price = this.productDetails.filter(product => product.productId === productQuantity.productId)[0].productDiscountedPrice;
        grandtotal = grandtotal + price * productQuantity.quantity;
      }
    );
    return grandtotal;
  }
}
