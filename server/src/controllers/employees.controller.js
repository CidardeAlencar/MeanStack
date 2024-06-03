// const hello=(req,res)=>res.send('hello');
//clase
const employeeCtrl={}

const Employee = require("../models/Employee")
//metodos

employeeCtrl.getEmployees=async(req,res)=>{
    const employees=await Employee.find()
    res.json(employees)
}
employeeCtrl.createEmployee=async(req,res)=>{
    const newEmployee=new Employee(req.body)
    await newEmployee.save()
    res.send({
        message:'Employee Created'
    })
}
employeeCtrl.getEmployee=async(req,res)=>{
    const id=req.params.id
    const employee= await Employee.findById(id)
    res.send(employee)
    // res.send('Obteniendo un empleado')
}

employeeCtrl.editEmployee=async(req,res)=>{
    const employeeUpdated=await Employee.findByIdAndUpdate(req.params.id,req.body)
    res.json({
        status:'employee updated'
    })
}

employeeCtrl.deleteEmployee=async(req,res)=>{
    const employeeDeleted=await Employee.findByIdAndDelete(req.params.id)
    res.json({
        status:"Employee deleted"
    })
}

module.exports=employeeCtrl;