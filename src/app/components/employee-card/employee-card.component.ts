import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IEmployee } from '../../Models/IEmployee';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css'
})
export class EmployeeCardComponent {

  employeeService=inject(EmployeeService);
  router = inject(Router);
  toastr=inject(ToastrService);
  @Input() employee:IEmployee={
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    position: ""
  }
  @Output() employeeDeleted = new EventEmitter<void>();

  editEmployee(id:number){
    this.router.navigate(['edit-form', id]);
  }

  onDelete(id:number){
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.toastr.success('Employee deleted successfully!','Success');
        this.employeeDeleted.emit();
      },
      error:(response)=>{
        console.log(response);
      }
    })
  }
}
