import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.scss'
})
export class AdminOrdersComponent implements OnInit{

  displayedColumns: string[] = ['Id', 'Product Name', 'Name', 'Address', 'Contact', 'Status', 'Action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any[]>;

  status: string = 'All';

  constructor (
    private productService: ProductService,
    private snackbar: MatSnackBar,
    private ngxService: NgxUiLoaderService,
  ) {}

  ngOnInit(): void {
    this.getAllOrderDetails(this.status);
  }

  //get all order details for admin
  getAllOrderDetails(status: string) {
    this.ngxService.start();
    this.productService.getAllOrderDetails(status).subscribe(
      (resp: any) => {
        this.ngxService.stop();
        console.log(resp);
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
      }
    )
  }

  //Mark order as delivered
  markAsDelivered(orderId: number) {
    this.ngxService.start();
    console.log(orderId);
    this.productService.markOrderAsDelivered(orderId).subscribe(
      (resp: any) => {
        this.ngxService.stop();
        console.log(resp);
        this.snackbar.open("Order status changed successfully.", "Close", {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackbar-success',
          duration: 4000
        });
        this.getAllOrderDetails(this.status);
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
        this.snackbar.open("System is busy, try again later.", "Close", {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackbar-danger',
          duration: 4000
        });
      }
    );
  }
}
