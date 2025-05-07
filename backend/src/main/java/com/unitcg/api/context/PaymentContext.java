package com.unitcg.api.context;

import com.unitcg.api.exception.PaymentException;
import com.unitcg.api.interfaces.PaymentStrat;
import com.unitcg.api.messaging.PaymentNotificationProduces;

public class PaymentContext {
    private PaymentStrat paymentStrat;

    private PaymentNotificationProduces paymentNotificationProduces;

    public PaymentContext(PaymentStrat paymentStrat) {
        this.paymentNotificationProduces = new PaymentNotificationProduces();
        this.paymentStrat = paymentStrat;
    }

    public void executePayment(double amount) throws PaymentException{
        try {
            paymentStrat.pay(amount);
            String message = "Pagamento bem sucedido" + paymentStrat.getPaymentDetails() + "Valor: R$" + amount;
            paymentNotificationProduces.sendPaymentNotification(message);
        } catch (PaymentException e) {
            String message = "Falha no pagamento " + paymentStrat.getPaymentDetails() + ": " + e.getMessage();
            paymentNotificationProduces.sendPaymentNotification(message);
            throw e;
        }
    }
}
