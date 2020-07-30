import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators, ValidatorFn } from '@angular/forms';
import { TestClass, Person } from '../../../employeeModel';
import { validate } from 'json-schema';

export function validateDependents(): ValidatorFn {
  return (formArray: FormArray): { [key: string]: any } | null => {
    let valid: boolean = true;
    formArray.controls.forEach((x: FormGroup) => {
      valid = valid && x.value.name == "a"
    })
    return valid ? null : { error: 'First Name and Last Name are required' }
  };
  // let allDependents = control.get('dependents').value;
  // allDependents.forEach(dependent => {
  //   if (!dependent.firstName  && dependent.LastName || dependent.firstName  && !dependent.LastName){
  //     dependent.setErrors('First Name and Last name is required');
  //   }

  //   });
  //  return null;
};

@Component({
  selector: 'add-employee',
  templateUrl: 'add-employee.component.html'
})
export class AddEmployeeComponent implements OnChanges {
  employeeForm: FormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    payCheckAmount: ['2000', Validators.required],
    totalPayChecks: ['26', Validators.required],//can REMOVE Todo
    dependents: this._formBuilder.array([this._formBuilder.group({ FirstName: '', LastName: '' }, validateDependents())])
  });
  @Input() submitted: boolean;
  @Output() onSave = new EventEmitter<TestClass>();

  //   <span class="text-danger" *ngIf="(employeeFormControl.firstName.touched || submitted) && employeeFormControl.firstName.errors?.required">
  //   First Name is required
  // </span>
  constructor(private _formBuilder: FormBuilder) { }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['submitted']) {
      this._initializeForm();
    }
  }

  get dependentForms() {
    return this.employeeForm.get('dependents') as FormArray;
  }

  addDependent() {
    this.dependentForms.push(this._formBuilder.group({ FirstName: '', LastName: '' }));
  }

  save() {
    let employeeInfo = <TestClass>{
      FirstName: this.employeeForm.get('firstName').value,
      LastName: this.employeeForm.get('lastName').value,
      PayCheckAmount: +this.employeeForm.get('payCheckAmount').value,
      TotalPayChecks: +this.employeeForm.get('totalPayChecks').value,
      Dependents: this._getDependents(this.employeeForm.get('dependents').value)
    };
    this.submitted = true;
    this.onSave.emit(employeeInfo);
  }

  private _getDependents(dependents: Person[]): Person[] {
    return dependents.filter(x => x.FirstName && x.LastName);
  }

  private _initializeForm() {
    this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      payCheckAmount: ['2000', Validators.required],
      totalPayChecks: ['26', Validators.required],//can REMOVE Todo
      dependents: this._formBuilder.array([this._formBuilder.group({ FirstName: '', LastName: '' }, validateDependents())])
    });
  }

}