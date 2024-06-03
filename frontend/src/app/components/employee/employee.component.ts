import { Component,OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee', 
  standalone: true,
  imports: [HttpClientModule,CommonModule,FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{


  constructor(public employeeService:EmployeeService){

  }

  ngOnInit(): void {
      this.getEmloyees();
  }

  getEmloyees(){
    this.employeeService.getEmployees().subscribe(
      res=>{
        this.employeeService.employees = res;
      },
      err=>console.log(err)
    )
  }
  addEmployee(form:NgForm){
    if(form.value._id){
      this.employeeService.putEmployee(form.value).subscribe(
        (res)=>console.log(res),
        (err)=>console.log(err)
      )
    }else{
      this.employeeService.createEmployee(form.value).subscribe(
        res=>{
          console.log(res)
          this.getEmloyees()
          form.reset()
        },
        err=>console.error(err)
      )
    }
  }

  resetForm(form:NgForm){
    form.reset();
  }

  
  deleteEmployee(id:string){
    if(confirm('Are you sure you want to delete it?')){
      this.employeeService.deleteEmployee(id).subscribe(
        (res)=>{
          this.getEmloyees();
        },
        (err)=>console.error(err)
      );
    }
  }

  editEmployee(employee:Employee){
    this.employeeService.selectedEmployee =employee;
  }
}
