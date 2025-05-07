package com.unitcg.api.strategies;

import com.unitcg.api.exception.PaymentException;
import com.unitcg.api.interfaces.PaymentStrat;

public class ExternalPayment implements PaymentStrat {

    private String providerName;
    private String transaction;
    private String transactionId;

    public ExternalPayment(String transaction, String providerName) {
        this.transaction = transaction;
        this.providerName = providerName;
    }

    @Override
    public void pay(double value) throws PaymentException {
        System.out.println("Integrando com " + providerName + " para pagamento de R$" + value);
        System.out.println("Id de transacao externa: " + transactionId);

        boolean paymentSuccess = simulateExternalPayment(value);

        if (!paymentSuccess){
            throw new PaymentException("Falha no pagamento.com " + providerName);
        }
    }

    @Override
    public String getPaymentDetails(){
        return "Pagamento externo " + providerName + ", Id: " + transactionId;
    }

    private boolean simulateExternalPayment( double value ){
        //Simulação - 90% de chance de sucesso
        return Math.random() >0.1;
    }
}
