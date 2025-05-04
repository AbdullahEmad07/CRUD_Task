import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from '../Models/IEmployee';
import { IAddEmployee } from '../Models/IAddEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = environment.apiUrl;
  empArr:IEmployee[]=[];
  employeeToAdd:IAddEmployee={
      firstName:"",
      lastName:"",
      email:"",
      position:""
    };
  
  http = inject(HttpClient);
  getAllEmployees(){
    return this.http.get<IEmployee[]>(`${this.baseUrl}/employees`);
  }
  addEmployee(){
    return this.http.post<IAddEmployee>(`${this.baseUrl}/employees`,this.employeeToAdd);
  }

  updateEmployee(id:number){
    return this.http.put<IAddEmployee>(`${this.baseUrl}/employees/${id}`,this.employeeToAdd);
  }

  deleteEmployee(id:number){
    return this.http.delete(`${this.baseUrl}/employees/${id}`);
  }
}
