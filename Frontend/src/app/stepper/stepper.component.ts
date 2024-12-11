import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent implements OnInit{

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup
  stepperOrientation!: Observable<StepperOrientation>;

  constructor(
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ){}

  ngOnInit(): void {

    this.firstFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      contact: ['', [Validators.required]],
      country: ['', [Validators.required]],
      university: ['', [Validators.required]],
      course: ['', [Validators.required]],
      class: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });
    this.secondFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      contact: ['', [Validators.required]],
      country: ['', [Validators.required]],
      university: ['', [Validators.required]],
      course: ['', [Validators.required]],
      class: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });
    this.thirdFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      contact: ['', [Validators.required]],
      country: ['', [Validators.required]],
      university: ['', [Validators.required]],
      course: ['', [Validators.required]],
      class: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });

    this.stepperOrientation = this.breakpointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
      
  }
}
