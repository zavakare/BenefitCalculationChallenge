import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
        employerPortion: new FormControl('')
    });
    benefitInfo: Benefit = <Benefit>{};
    valueEnum: any = ValueTypeEnum;

    @ViewChild('toggle') toggleGroup: MatButtonToggleGroup;
    @Output() calculate = new EventEmitter<DataEntered>();

    constructor(private _benefitService: BenefitService) { }

    ngOnInit() {
        if (this._benefitService.getBenefitInfo() && this._benefitService.getBenefitInfo().Id){
            this._setBenefitInfo(this._benefitService.getBenefitInfo());
        }
    }

    onCalculateClick() {
        let dataEntered = <DataEntered>{
            Portion: this.benefitForm.get('employerPortion').value,
            ValueType: this.toggleGroup.value,
            TotalPaychecks: this.benefitForm.get('totalPaychecks').value,
        };

        this.calculate.emit(dataEntered);
    }


    private _setBenefitInfo(data: Benefit) {
        this.benefitInfo = { ...data };
    }
}