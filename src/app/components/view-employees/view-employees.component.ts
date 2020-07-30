import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { GridData } from '../../../employeeModel';
import { EmployeeService } from '../../employee.service';
import { DataEntered, ValueTypeEnum } from '../benefit-calculator/benefit-calculator.component';
import { DataTableDirective } from 'angular-datatables';

@Component({
    selector: 'view-employees',
    templateUrl: 'view-employees.component.html'
})
export class ViewEmployeesComponent implements OnDestroy, OnInit, OnChanges {
    @Input() employees: GridData[] = <GridData[]>[];
    dtEmployees: DataTables.Settings = {};
    portionsIncluded: boolean = false;
    @ViewChild(DataTableDirective, { static: true }) dtElement: DataTableDirective;
    //employees: TestClass[]; //Employee[] = [];
    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    dtTrigger = new Subject();
    totalEmployeeCost: number = 0;

    constructor(private employeeService: EmployeeService) { }

    ngOnInit(): void {
        this.dtEmployees = {
            pagingType: 'full_numbers',
            pageLength: 10
        };
    }
    ngOnChanges(simpleChange: SimpleChanges): void {
        if (simpleChange['employees']) {
            this.totalEmployeeCost = this._calculateAllEmployeeCost(this.employees.map(x => x.YearBenefitCost));
            this.dtTrigger.next();
        }
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }

    calculatePortion(dataEntered: DataEntered) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            let updatedList = <GridData[]>[];
            this.employees.forEach((employee: GridData) => {
                let employerYearlyCharges = this._getYearlyEmployerPortion(
                    dataEntered.Portion,
                    dataEntered.ValueType,
                    employee.YearBenefitCost);

                let employeeYearlyCharges = this._getYearlyEmployeePortion(
                    employee.YearBenefitCost,
                    employerYearlyCharges);

                let employeeRow = {
                    ...employee,
                    YearEmployerPortion: employerYearlyCharges || 0,
                    YearEmployeePortion: employeeYearlyCharges || 0,
                    EmployeePortion: this._getPaycheckCharges(dataEntered.TotalPaychecks, employeeYearlyCharges) || 0,
                    EmployerPortion: this._getPaycheckCharges(dataEntered.TotalPaychecks, employerYearlyCharges) || 0
                };
                updatedList.push(employeeRow);
            });
            this.portionsIncluded = true;
            this.employees = updatedList;
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
        });


    }

    private _getYearlyEmployerPortion(portion: number, valueType: ValueTypeEnum, cost: number): number {
        if (valueType === ValueTypeEnum.Currency) {
            return portion;
        } else {
            return cost * (portion / 100);
        }
    }

    private _getYearlyEmployeePortion(benefitCost: number, employerCost: number): number {
        return benefitCost - employerCost;
    }


    private _calculateAllEmployeeCost(employeesCost: number[]): number {
        return employeesCost.reduce((a, b) => a + b, 0);
    };

    private _getPaycheckCharges(totalPaychecks: number, yearlyCharge: number): number {
        return yearlyCharge / totalPaychecks
    };
}