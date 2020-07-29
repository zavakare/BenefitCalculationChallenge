import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Benefit } from '../employeeModel';

@Injectable()
export class BenefitService {
  private _benefitInfoSaved: Benefit = <Benefit>{};
  private headers: HttpHeaders;
  private accessPointUrl: string = 'http://localhost:56923/api/Benefit';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  public getBenefitInfo(): Benefit {
      return this._benefitInfoSaved;
  }

  public setBenefitInfo(benefit: Benefit) {
      this._benefitInfoSaved = benefit;
  }

  public get() {
    return this.http.get(this.accessPointUrl, {headers: this.headers});
  }

  public add(payload) {
    return this.http.post(this.accessPointUrl, payload, {headers: this.headers});
  }

  public remove(payload) {
    return this.http.delete(this.accessPointUrl + '/' + payload.id, {headers: this.headers});
  }

  public update(payload) {
    return this.http.put(this.accessPointUrl + '/' + payload.id, payload, {headers: this.headers});
  }

}