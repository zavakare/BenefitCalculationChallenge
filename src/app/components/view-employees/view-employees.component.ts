import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Employee } from '../../../employeeModel';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'view-employees',
  templateUrl: 'view-employees.component.html'
})
export class ViewEmployeesComponent implements OnDestroy, OnInit {
  dtEmployees: DataTables.Settings = {};
  employees: any; //Employee[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject();

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.dtEmployees = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    let emp = {
        FirstName: 'Karendddddd'
    }
    this.employeeService.add(emp).subscribe(
        ret => 
        this.employeeService.get()
        .subscribe((data: any) => this.employees = data)
      );

    // this.employeeService.get()
    //   .subscribe(employees => {
    //     this.employees = employees;
    //     // Calling the DT trigger to manually render the table
    //     this.dtTrigger.next();
    //   });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
//    this.dtTrigger.unsubscribe();
  }

//   private extractData(res: HttpResponse) {
//     const body = res.json();
//     return body.data || {};
//   }
}