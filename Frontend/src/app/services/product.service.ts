import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';
import { OrderDetails } from '../model/order-details.model';
import { MyOrderDetails } from '../model/order.model';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor( private httpClient: HttpClient) { }
  
  //add product to the database
  public addProduct(product: FormData) {
    return this.httpClient.post<Product>("http://localhost:7400/api/v1/addProduct", product);
  } 

  //Read product from the database
  public getAllProducts(pageNumber: number, searchkeyword: string = "") {
    return this.httpClient.get<Product[]>("http://localhost:7400/api/v1/getAllProducts?pageNumber=" + pageNumber + "&searchKey=" + searchkeyword);
  }

  // Delete product from the database
  public deleteProduct(productId: number) {
    return this.httpClient.delete("http://localhost:7400/api/v1/deleteProductDetails/" + productId);
  }
  //get product details by id
  public getProductDetailsById(productId: any) {
    return this.httpClient.get<Product>("http://localhost:7400/api/v1/getProductDetailsById/" + productId);
  }
  //get product details from backend
  public getProductDetails(isSingleProductCheckout: any, productId: any): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:7400/api/v1/getProductDetails/" + isSingleProductCheckout + "/" + productId)
  }

  //Place order into the database
  public placeOrder(orderDetails: OrderDetails, isCartCheckout: string) {
    return this.httpClient.post("http://localhost:7400/api/v1/placeOrder/" + isCartCheckout, orderDetails);
  }
  
  //Add product to cart page
  public addToCart(productId: number){
    return this.httpClient.get("http://localhost:7400/api/v1/addToCart/" + productId);
  }

  //function to get cart details from the database
  public getCartDetails() {
    return this.httpClient.get("http://localhost:7400/api/v1/getCartDetails");
  }

  //Function to delete cart item or remove cart item from the list
  public deleteCartItem(cartId: number) {
    return this.httpClient.delete("http://localhost:7400/api/v1/deleteCartItem/"+ cartId);
  }

  //function to get my oders
  public getMyOrders(): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:7400/api/v1/getOrderDetails");
  }

  //Function to get all order details for the admin 
  public getAllOrderDetails(status: string): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:7400/api/v1/getAllOrderDetails/" + status);
  }

  //Function to mark order as delivered in the database
  public markOrderAsDelivered(orderId: number) {
    return this.httpClient.get("http://localhost:7400/api/v1/markOrderAsDelivered/" + orderId);
  }
}
