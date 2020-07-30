import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

    constructor(private _benefitService: BenefitService) { }

    ngOnInit() {
        if (this._benefitService.getBenefitInfo() && this._benefitService.getBenefitInfo().Id) {
            this._setFormControls(this._benefitService.getBenefitInfo());
        }
    }

    save() {
        if (this._benefitService.getBenefitInfo() && this._benefitService.getBenefitInfo().Id) {
            let benefitInfo = <Benefit>{
                Id: this._benefitService.getBenefitInfo().Id,
                CostPerYear: this.benefitForm.get('cost').value,
                CostPerDependent: this.benefitForm.get('dependentCost').value,
                Discount: +this.benefitForm.get('discount').value
            };
            this._benefitService.update(benefitInfo).subscribe(
                ret => {this._benefitService.setBenefitInfo(benefitInfo);}
            );
        } else {
            let benefitInfo = <Benefit>{
                CostPerYear: this.benefitForm.get('cost').value,
                CostPerDependent: this.benefitForm.get('dependentCost').value,
                Discount: +this.benefitForm.get('discount').value
            };
            this._benefitService.add(benefitInfo).subscribe(
                ret => {this._benefitService.setBenefitInfo(benefitInfo);}
            );
        }
    }

    private _setFormControls(data: Benefit) {
        this.benefitForm.controls['cost'].setValue(data.CostPerYear);
        this.benefitForm.controls['dependentCost'].setValue(data.CostPerDependent);
        this.benefitForm.controls['discount'].setValue(data.Discount);
    }

}