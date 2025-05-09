package com.unitcg.api.controllers;

import com.unitcg.api.context.PaymentContext;
import com.unitcg.api.exception.PaymentException;
import com.unitcg.api.factories.PaymentFactory;
import com.unitcg.api.interfaces.PaymentStrat;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pagamento")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @GetMapping
    public void newPayment(){
        try {
            PaymentStrat creditCard = PaymentFactory.createPayment(
                    "creditcard",
                    "Joao Antonio",
                    "254",
                    "1234567891025489",
                    "12/25"
            );
            PaymentContext context = new PaymentContext(creditCard);
            System.out.println("hi");
            context.executePayment(150.50);
        }
        catch (PaymentException e){
            System.out.println("Erro: " + e.getMessage());
        }
    }


}
