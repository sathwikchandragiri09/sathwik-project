package com.vcube.empportal.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController


public class hello {
	@RequestMapping("/hello")
	
    String hello(){
	    return "Springboot is comedy!!";
    }
}
