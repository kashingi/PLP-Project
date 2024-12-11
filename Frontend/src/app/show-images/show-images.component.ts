import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileHandle } from 'fs/promises';

@Component({
  selector: 'app-show-images',
  templateUrl: './show-images.component.html',
  styleUrl: './show-images.component.scss'
})
export class ShowImagesComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {}

  ngOnInit(): void {
      this.receiveImages();
  }

  receiveImages() {
    console.log(this.dialogData);
  }
}
