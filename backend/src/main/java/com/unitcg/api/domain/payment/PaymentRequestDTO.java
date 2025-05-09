package com.unitcg.api.domain.payment;

import java.util.List;

public record PaymentRequestDTO(String type, String ... param) {
}
