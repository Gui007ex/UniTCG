package com.unitcg.api.strategies;

import com.unitcg.api.exception.PaymentException;
import com.unitcg.api.interfaces.PaymentStrat;

public class DebitCardPayment implements PaymentStrat {

    private String cardNumber;
    private String name;
    private String ccv;
    private String expDate;

    public DebitCardPayment(String name, String ccv, String cardNumber, String expDate) {
        this.name = name;
        this.ccv = ccv;
        this.cardNumber = cardNumber;
        this.expDate = expDate;
    }

    @Override
    public void pay(double value) throws PaymentException{
        if (cardNumber == null || cardNumber.length() != 16){
            throw new PaymentException("Numero de cartao invalido");
        }

        System.out.println("Pagamento de $" + value + " realizado com cartao de debito " + maskCardNumber(cardNumber) + " em nome de " + name);
    }

    @Override
    public String getPaymentDetails(){
        return "Cartao de debito: " + maskCardNumber(cardNumber) + ", " + name;
    }

    private String maskCardNumber(String cardNumber){
        return "**** **** **** " + cardNumber.substring(12);
    }
}
