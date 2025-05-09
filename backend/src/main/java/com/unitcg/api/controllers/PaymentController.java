package com.unitcg.api.controllers;

import com.unitcg.api.context.PaymentContext;
import com.unitcg.api.domain.payment.PaymentRequestDTO;
import com.unitcg.api.domain.payment.PaymentResponseDTO;
import com.unitcg.api.exception.PaymentException;
import com.unitcg.api.factories.PaymentFactory;
import com.unitcg.api.interfaces.PaymentStrat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pagamento")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @PostMapping
    public ResponseEntity<PaymentResponseDTO> processPayment (@RequestBody PaymentRequestDTO body){
        String result = "Pagamento efetuado";
        try {
            PaymentStrat creditCard = PaymentFactory.createPayment(
                    body.type(),
                    body.param()
            );
            PaymentContext context = new PaymentContext(creditCard);
            context.executePayment(150.50);
        }
        catch (PaymentException e){
            result = "Erro: " + e.getMessage();
        }
        return ResponseEntity.ok(new PaymentResponseDTO(result));
    }

}
