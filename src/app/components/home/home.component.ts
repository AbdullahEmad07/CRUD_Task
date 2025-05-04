import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../../Models/IEmployee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private employeeService=inject(EmployeeService);
  employees:IEmployee[]=[];
  filteredEmployees: IEmployee[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.loadEmployees();
  }
  loadEmployees(){
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employeeService.empArr = data;
        this.employees=data;
        this.filterEmployees();
      },
      error: (err) => {
        console.error('Failed to load employees', err);
      }
    });
  }

  filterEmployees() {
    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.employees.filter(emp =>
      emp.firstName.toLowerCase().includes(term) ||
      emp.lastName.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term) ||
      emp.position.toLowerCase().includes(term)
    );
  }
}
