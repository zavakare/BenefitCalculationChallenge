export interface CalculateInfo {
    Employees: EmployeeInfo[];
    Benefit: Benefit;
    TotalPayChecks: number;
}

export interface EmployeeInfo {
    EmployeeId: number;
    NameInfo: Person;
    Dependents: Person[];
    PayCheckAmount: number;
}

export interface Person {
    FirstName: string;
    LastName: string;
}

export interface Salary {
    PayCheckAmount: number;
    TotalPayChecks: number;
}

export interface Benefit {
    Id: number;
    CostPerYear: number;
    DependentCost: number; //per year
    Discount: number; //Names that start with A
}

export interface TestClass {
    Id?: number;
    FirstName: string;
    LastName: string;
    PayCheckAmount: number;
    TotalPayChecks: number;
    Dependents: Person[];
}

export interface GridData {
    EmployeeId: number;
    Employee: string;
    DependentCount: number;
    PayCheckAmount: number;
    YearBenefitCost: number;//year
    EmployeePortion?: number;
    EmployerPortion?: number;
    YearEmployeePortion?: number;
    YearEmployerPortion?: number;

}