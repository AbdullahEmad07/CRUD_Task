import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css'
})
export class EditFormComponent implements OnInit {
  activatedRoute=inject(ActivatedRoute);
  router=inject(Router);
  toastr=inject(ToastrService);
  employeeService=inject(EmployeeService);
  employeeId:number=0;

  editForm=new FormGroup({
      id:new FormControl({ value: 0, disabled: true }),
      firstName:new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(16)]),
      lastName:new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(16)]),
      email:new FormControl("",[Validators.required,Validators.email]),
      position:new FormControl("",[Validators.required,Validators.minLength(2)])
    });

    ngOnInit(): void {
      this.activatedRoute.params.subscribe({
        next:(params)=>{
          this.employeeId=params?.['id'];
          const employee=this.employeeService.empArr.find(e=>e.id==this.employeeId);
          if(employee){
            this.editForm.controls.id.setValue(employee?.id);
            this.editForm.controls.firstName.setValue(employee?.firstName);
            this.editForm.controls.lastName.setValue(employee?.lastName);
            this.editForm.controls.email.setValue(employee?.email);
            this.editForm.controls.position.setValue(employee?.position);
          }
          
        }
      })
    }

    onUpdate(){
      if(this.editForm.controls.firstName.value&&this.editForm.controls.lastName.value
        &&this.editForm.controls.email.value&&this.editForm.controls.position.value
      ){
        this.employeeService.employeeToAdd.firstName=this.editForm.controls.firstName.value;
        this.employeeService.employeeToAdd.lastName=this.editForm.controls.lastName.value;
        this.employeeService.employeeToAdd.email=this.editForm.controls.email.value;
        this.employeeService.employeeToAdd.position=this.editForm.controls.position.value;

        this.employeeService.updateEmployee(this.employeeId).subscribe({
          next: () => {
            this.toastr.success('Employee updated successfully!','Success');
            this.router.navigate(['']);
          },
          error:(response)=>{
            this.toastr.error(`${response.error}`,'Error');
          }
        })
      }
    }
}
