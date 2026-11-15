package com.vcube.empportal.controller;
import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vcube.empportal.model.Employee;
import com.vcube.empportal.repo.Employeerepo;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:5173")

public class hello {
	@Autowired	
	
	Employeerepo employeeRepo;
	
	
	@GetMapping("/hello")
    String hello(){
	    return "Springboot is comedy!!";
    }
	
	 @GetMapping("/getEmpList")
	List <Employee> getAllEmployeeDetails(){
		
		return employeeRepo.findAll();
	}
	 
	 @GetMapping("/getEmp/{eid}")
	 Employee getEmployee (@PathVariable Integer eid) {
		 return employeeRepo.findById(eid).orElseThrow();
		 
				 
				 
				 
				 
				 
				 
				 
	 }
	 @PostMapping("/createEmp")
	public Employee createEmployee(@RequestBody Employee employee){
		 
		return employeeRepo.save(employee);
		 
	 }
	 @GetMapping("/deleteEmp/{eid}")
	 @CrossOrigin(origins = "http://localhost:5173")
	 public String deleteEmp(@PathVariable int eid) {
	     employeeRepo.deleteById(eid);
	     return "Deleted " + eid;
	 }

	 @PutMapping("/updateEmp")
	 @CrossOrigin(origins = "http://localhost:5173")
	 public Employee updateEmp(@RequestBody Employee emp) {
	     return employeeRepo.save(emp);
	 }
}
