package com.example.order_service.util;

import com.example.order_service.model.OrderItem;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

public class OrderItemDeserializer {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static List<OrderItem> deserializeItems(List<String> itemJsonStrings){
        return itemJsonStrings.stream()
                .map(json->{
                    try{
                        return objectMapper.readValue(json, new TypeReference<OrderItem>(){});
                    } catch(Exception e){
                        throw new RuntimeException("Failed to deserialize OrderItem", e);
                    }
                })
                .toList();
    }
}
