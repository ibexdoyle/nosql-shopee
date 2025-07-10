package com.example.payment_service.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.Base64;
import java.util.UUID;

public class CustomUUIDDeserializer extends JsonDeserializer<UUID> {

    @Override
    public UUID deserialize(JsonParser p, DeserializationContext ctxt)
            throws IOException, JsonProcessingException {
        Object value = p.readValueAs(Object.class);

        if (value instanceof String str) {
            try {
                // Xử lý string UUID chuẩn
                return UUID.fromString(str);
            } catch (IllegalArgumentException e) {
                // Thử decode base64 string
                try {
                    byte[] decoded = Base64.getDecoder().decode(str);
                    return fromBytes(decoded);
                } catch (IllegalArgumentException ex) {
                    throw new InvalidFormatException(p, "Invalid UUID string or Base64: " + str, str, UUID.class);
                }
            }
        } else if (value instanceof byte[] bytes) {
            return fromBytes(bytes);
        }
        throw new InvalidFormatException(p, "Invalid UUID format: " + value, value, UUID.class);
    }

    private UUID fromBytes(byte[] bytes) {
        if (bytes.length != 16) {
            throw new IllegalArgumentException("UUID byte array must be 16 bytes, but got: " + bytes.length);
        }
        ByteBuffer bb = ByteBuffer.wrap(bytes);
        return new UUID(bb.getLong(), bb.getLong());
    }
}
