import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css'
})
export class AddFormComponent {
  employeeService=inject(EmployeeService);
  router=inject(Router);
  toastr=inject(ToastrService);

  addForm=new FormGroup({
    firstName:new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(16)]),
    lastName:new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(16)]),
    email:new FormControl("",[Validators.required,Validators.email]),
    position:new FormControl("",[Validators.required,Validators.minLength(2)])
  });

  onAdd(){
    if(this.addForm.controls.firstName.value&&this.addForm.controls.lastName.value
      &&this.addForm.controls.email.value&&this.addForm.controls.position.value
    ){
      this.employeeService.employeeToAdd.firstName=this.addForm.controls.firstName.value;
      this.employeeService.employeeToAdd.lastName=this.addForm.controls.lastName.value;
      this.employeeService.employeeToAdd.email=this.addForm.controls.email.value;
      this.employeeService.employeeToAdd.position=this.addForm.controls.position.value;

      this.employeeService.addEmployee().subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.toastr.success('Employee added successfully!','Success');
          this.router.navigate(['']);

        },
        error:(err)=>{
          console.log(err.error);
          this.toastr.error(`${err.error}`,'Error');
        }
      })
    }
    
  }
}
