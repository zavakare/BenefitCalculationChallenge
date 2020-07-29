import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { GridData } from '../../../employeeModel';
import { EmployeeService } from '../../employee.service';
import { DataEntered, ValueTypeEnum } from '../benefit-calculator/benefit-calculator.component';

@Component({
    selector: 'view-employees',
    templateUrl: 'view-employees.component.html'
})
export class ViewEmployeesComponent implements OnDestroy, OnInit, OnChanges {
    @Input() employees: GridData[] = <GridData[]>[];
    dtEmployees: DataTables.Settings = {};
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
        let updatedList = <GridData[]>[];
        this.employees.forEach((employee: GridData) => {
            let employeeRow = {
                ...employee,
                YearEmployerPortion: this._getYearlyEmployerPortion(
                    dataEntered.TotalPaychecks,
                    dataEntered.ValueType,
                    employee.YearBenefitCost),
                YearEmployeePortion: this._getYearlyEmployeePortion(
                    employee.YearBenefitCost,
                    this._getYearlyEmployerPortion(
                        dataEntered.TotalPaychecks,
                        dataEntered.ValueType,
                        employee.YearBenefitCost),
                )
            };
            updatedList.push(employeeRow);
        });
        this.employees = {...updatedList};
    }

    private _getYearlyEmployerPortion(portion: number, valueType: ValueTypeEnum, cost: number): number {
        if (valueType === ValueTypeEnum.Currency) {
            return portion;
        } else {
            return cost - (cost * (portion / 100));
        }
    }

    private _getYearlyEmployeePortion(benefitPortion: number, employerCost: number): number {
        return benefitPortion - employerCost;
    }


    private _calculateAllEmployeeCost(employeesCost: number[]): number {
        return employeesCost.reduce((a, b) => a + b, 0);
    };

    //   private extractData(res: HttpResponse) {
    //     const body = res.json();
    //     return body.data || {};
    //   }
}