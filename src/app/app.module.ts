import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BenefitService } from './benefit.service';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { BenefitCalculatorComponent } from './components/benefit-calculator/benefit-calculator.component';
import { BenefitCriteriaComponent } from './components/benefit-criteria/benefit-criteria.component';
import { BenefitPresentationComponent } from './components/benefit-presentation/benefit-presentation.component';
import { ViewEmployeesComponent } from './components/view-employees/view-employees.component';
import { EmployeeService } from './employee.service';


@NgModule({
  declarations: [
    AppComponent,
    ViewEmployeesComponent,
    AddEmployeeComponent,
    BenefitPresentationComponent,
    BenefitCriteriaComponent,
    BenefitCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    MatTabsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonToggleModule
  ],
  providers: [EmployeeService, BenefitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
