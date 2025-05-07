package com.unitcg.api.factories;

import com.unitcg.api.exception.PaymentException;
import com.unitcg.api.interfaces.PaymentStrat;
import com.unitcg.api.strategies.CreditCardPayment;
import com.unitcg.api.strategies.ExternalPayment;

public class PaymentFactory {
    public static PaymentStrat createPayment (String type, String ... param) throws PaymentException {
        switch (type.toLowerCase()){
            case "creditcard" :
                if (param.length<4){
                    throw  new PaymentException("Dados invalidos");
                }
                return new CreditCardPayment(param[0], param[1], param[2], param[3]);
            case "external":
                if (param.length<2){
                    throw  new PaymentException("Dados invalidos");
                }
                return new ExternalPayment(param[0], param[1]);
            default:
                throw new PaymentException("Tipo de pag desconhecido");
        }
    }
}
