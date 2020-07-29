import { Component } from "@angular/core";
import { EmployeeService } from "../../employee.service";
import { TestClass, GridData, Benefit, Person } from "../../../employeeModel";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { BenefitService } from "../../benefit.service";

@Component({
    selector: 'benefit-presentation',
    templateUrl: 'benefit-presentation.component.html'
})
export class BenefitPresentationComponent {
    addTabLabel = 'Add New Employee';
    viewTabLabel = 'View Employees';
    benefitLabel = 'Benefit Information';
    tabSelected: string;
    employees: TestClass[] = [];
    gridData: GridData[] = <GridData[]>[];
    constructor(private _employeeService: EmployeeService,
        private _benefitService: BenefitService) { }
    addNewEmployee(emp: TestClass) {
        this._employeeService.add(emp).subscribe(
            ret => console.log(ret)
        );
    }

    onTabChange(tabChangeEvent: MatTabChangeEvent) {
        this.tabSelected = tabChangeEvent.tab.textLabel;
        if (tabChangeEvent.tab.textLabel === this.viewTabLabel) {
            this._employeeService.get()
                .subscribe((data: TestClass[]) => {
                    this.employees = data
                    this.gridData = this.getGridData(data, this._benefitService.getBenefitInfo());
                });
        }
    }

    getGridData(employeeInfo: TestClass[], benefitInfo: Benefit): GridData[] {
        let data = <GridData[]>[];
        employeeInfo.forEach(employee => {
            let gridRow = <GridData>{
                EmployeeId: employee.Id,
                Employee: employee.LastName + ',' + employee.FirstName,
                DependentCount: employee.Dependents.length,
                PayCheckAmount: employee.PayCheckAmount,
                YearBenefitCost: this._calculateEmployeeBenefitCost(
                    employee.FirstName,
                    benefitInfo.CostPerYear,
                    benefitInfo.DependentCost,
                    employee.Dependents,
                    benefitInfo.Discount),
            };
            data.push(gridRow)
        });
        return data;
    }

    private _calculateEmployeeBenefitCost(employeeFirstName: string, employeeBenefitCost: number, dependentBenefitCost: number, dependents: Person[], discount: number): number {
        let employeeCostWithDiscount = employeeBenefitCost - (employeeBenefitCost * (discount / 100));
        let dependentCostWithDiscount = dependentBenefitCost - (dependentBenefitCost * (discount / 100));
        let totalCost = 0;

        totalCost += this._getPersonCost(employeeFirstName, employeeCostWithDiscount, employeeBenefitCost);

        dependents.forEach(dependent => {
            totalCost += this._getPersonCost(dependent.FirstName, dependentCostWithDiscount, dependentBenefitCost);
        });

        return totalCost;
    }

    private _getPersonCost(firstName: string, priceWithDiscount: number, fullPrice: number): number {
        if (firstName.startsWith('A')) {
            return priceWithDiscount;
        } else {
            return fullPrice;
        }
    }

}
