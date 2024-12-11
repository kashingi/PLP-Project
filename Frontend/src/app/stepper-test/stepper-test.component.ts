import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stepper-test',
  templateUrl: './stepper-test.component.html',
  styleUrl: './stepper-test.component.scss'
})
export class StepperTestComponent implements OnInit{

  testForm!: FormGroup;
  countryCodes: { name: string; code: string }[] = []; 
  currentSection: number = 1;
  roleData: any;


  constructor(
    private snackabr: MatSnackBar,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
      
    // Define the form with optional fields not having Validators.required
    this.testForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gend: ['', [Validators.required]],
      countryCode: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      dateOfBirth: ["", Validators.required],
      currentLocation: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      isBaptised: ['', [Validators.required]],
      outStation: ['', [Validators.required]],
      community: ["", Validators.required],
      commonGroup: ['', [Validators.required]],
      otherGroup: ['', [Validators.required]],
      family: ['', [Validators.required]],
      familyRole: ["", Validators.required],
      role: ['', [Validators.required]],
      profession: ['', [Validators.required]],
      disability: ['', [Validators.required]],
      disabilityType: ['', [Validators.required]]
      
    });

    //display country codes here
    this.countryCodes = [
      { name: "United States", code: "1" },
      { name: "United Kingdom", code: "44" },
      { name: "Kenya", code: "254"},
      { name: 'Uganda', code: '256' },
      { name: 'Tanzania', code: '253' },
      { name: 'Rwanda', code: '250' },
      { name: 'Burundi', code: '257' },
      { name: 'South Sudan', code: '211' },
      { name: 'Ethiopia', code: '251' },
      { name: 'Somalia', code: '252' },
      // Add more countries as needed
    ];
    
  }

  onSubmit(){}

  //Calculte for the next section
  nextSection() {
    if (this.currentSection < 3) { // Assuming you have 3 sections
      this.currentSection++;
    }
  }
  // Calculte for the previous section
  previousSection() {
    if (this.currentSection > 1) { // Assuming you start from section 1
      this.currentSection--;
    }
  }
}
