import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MyOrderDetails } from '../model/order.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{

  displayedColumns = ['Id', 'Name', 'Address', 'Contact No.', 'Amount', 'Status'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  myOrderDetails = new MatTableDataSource<MyOrderDetails>();

  constructor (
    private productService: ProductService,
    private ngxService: NgxUiLoaderService
  ) {}
  ngOnInit(): void {
    
    this.getOrderDetails();
  }

  //create function to get order details
  getOrderDetails() {
    this.ngxService.start();
    this.productService.getMyOrders().subscribe(
      (resp: MyOrderDetails[]) => {
        this.ngxService.stop();
        console.log(resp);
        this.myOrderDetails.data = resp;
        this.myOrderDetails.paginator = this.paginator;
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
      }
    );
  }
}
