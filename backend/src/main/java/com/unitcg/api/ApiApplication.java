package com.unitcg.api;

import com.unitcg.api.context.PaymentContext;
import com.unitcg.api.exception.PaymentException;
import com.unitcg.api.factories.PaymentFactory;
import com.unitcg.api.interfaces.PaymentStrat;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

}
