import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { Benefit } from '../../../employeeModel';
import { BenefitService } from '../../benefit.service';

export enum ValueTypeEnum {
    Percentage = 1,
    Currency = 2
}

export interface DataEntered {
    Portion: number;
    ValueType: number;
    TotalPaychecks: number;
}

@Component({
    selector: 'benefit-calculator',
    templateUrl: 'benefit-calculator.component.html'
})
export class BenefitCalculatorComponent implements OnInit {
    benefitForm = new FormGroup({
        totalPaychecks: new FormControl('26'),
        employeetotalPaychecksPortionPerYear: new FormControl(''),
    });
    benefitInfo: Benefit = <Benefit>{};

    @ViewChild('toggle') toggleGroup: MatButtonToggleGroup;
    @Output() calculate = new EventEmitter<DataEntered>();

    constructor(
        private _formBuilder: FormBuilder,
        private _benefitService: BenefitService) { }

    ngOnInit() {
        if (!this._benefitService.getBenefitInfo()) {
            this._benefitService.get().subscribe((data: Benefit[]) => {
                this._benefitService.setBenefitInfo(data[0]);
            });
        }
        this._setBenefitInfo(this._benefitService.getBenefitInfo());
    }

    onCalculateClick() {
        let dataEntered = <DataEntered>{
            Portion: this.benefitForm.get('employeePortionPerYear').value,
            ValueType: this.toggleGroup.name || 1,
            TotalPaychecks: this.benefitForm.get('totalPaychecks').value,
        };

        this.calculate.emit(dataEntered);
    }

    private _setBenefitInfo(data: Benefit) {
        this.benefitInfo = { ...data };
    }
}