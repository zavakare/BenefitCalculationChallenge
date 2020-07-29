import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Benefit } from '../../../employeeModel';
import { BenefitService } from '../../benefit.service';


@Component({
    selector: 'benefit-criteria',
    templateUrl: 'benefit-criteria.component.html'
})
export class BenefitCriteriaComponent implements OnInit {
    benefitForm = new FormGroup({
        cost: new FormControl(''),
        dependentCost: new FormControl(''),
        discount: new FormControl(''),
    });

    constructor(
        private _formBuilder: FormBuilder,
        private _benefitService: BenefitService) { }

    ngOnInit() {
        this._benefitService.get().subscribe((data: Benefit[]) =>
        {
            this._benefitService.setBenefitInfo(data[0]);
            this._setFormControls(data[0]);
        });
    }

    save() {
        let benefitInfo = <Benefit>{
            Id: this._benefitService.getBenefitInfo().Id,
            CostPerYear: this.benefitForm.get('cost').value,
            DependentCost: this.benefitForm.get('dependentCost').value,
            Discount: +this.benefitForm.get('discount').value
        };
        this._benefitService.update(benefitInfo);
    }

    private _setFormControls(data: Benefit) {
        this._formBuilder.control('cost').setValue(data.CostPerYear);
            this._formBuilder.control('dependentCost').setValue(data.DependentCost);
            this._formBuilder.control('discount').setValue(data.Discount);
    }

}