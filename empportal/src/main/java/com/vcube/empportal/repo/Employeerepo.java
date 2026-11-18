package com.vcube.empportal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

import com.vcube.empportal.model.Employee;

@Repository

public interface Employeerepo extends JpaRepository<Employee, Integer> {

}
