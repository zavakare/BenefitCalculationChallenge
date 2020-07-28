import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';


@Component({
  selector: 'add-employee',
  templateUrl: 'add-employee.component.html'
})
export class AddEmployeeComponent {
  employeeForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dependents: this._formBuilder.array([this._formBuilder.group({dependentFirstName:'', dependentLastName: ''})])
  });


  constructor(private _formBuilder: FormBuilder) { }

  get dependentForms() {
    return this.employeeForm.get('dependents') as FormArray;
  }

  addDependent() {
    this.dependentForms.push(this._formBuilder.group({dependentFirstName:'', dependentLastName: ''}));
  }

  save() {
    //Send information to the parent
  }

}