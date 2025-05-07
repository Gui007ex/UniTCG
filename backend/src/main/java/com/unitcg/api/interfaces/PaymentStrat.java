package com.unitcg.api.interfaces;

import com.unitcg.api.exception.PaymentException;

public interface PaymentStrat{
    void pay(double value) throws PaymentException;

    String getPaymentDetails();
}
