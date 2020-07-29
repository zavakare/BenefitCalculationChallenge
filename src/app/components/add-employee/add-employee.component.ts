import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { TestClass } from '../../../employeeModel';


@Component({
  selector: 'add-employee',
  templateUrl: 'add-employee.component.html'
})
export class AddEmployeeComponent {
  employeeForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    payCheckAmount: new FormControl('2000'),
    totalPayChecks: new FormControl('26'),
    dependents: this._formBuilder.array([this._formBuilder.group({FirstName:'', LastName: ''})])
  });
  @Output() onSave = new EventEmitter<TestClass>();

  constructor(private _formBuilder: FormBuilder) { }

  get dependentForms() {
    return this.employeeForm.get('dependents') as FormArray;
  }

  addDependent() {
    this.dependentForms.push(this._formBuilder.group({FirstName:'', LastName: ''}));
  }

  save() {
    let employeeInfo = <TestClass>{
      FirstName: this.employeeForm.get('firstName').value,
      LastName: this.employeeForm.get('lastName').value,
      PayCheckAmount: +this.employeeForm.get('payCheckAmount').value,
      TotalPayChecks: +this.employeeForm.get('totalPayChecks').value,
      Dependents: this.employeeForm.get('dependents').value
    };
    this.onSave.emit(employeeInfo);
  }

}