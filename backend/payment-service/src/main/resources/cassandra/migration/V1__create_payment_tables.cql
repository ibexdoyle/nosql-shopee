-- KEYSPACE
CREATE KEYSPACE IF NOT EXISTS payment_keyspace
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE payment_keyspace;

-- Bảng chính lưu giao dịch
CREATE TABLE IF NOT EXISTS payment_transactions (
                                                    transaction_id UUID PRIMARY KEY,
                                                    order_id UUID,
                                                    user_id UUID,
                                                    amount decimal,
                                                    status text,
                                                    payment_method text,
                                                    created_at timestamp
);

-- Bảng log theo transaction_id và version (append-only)
CREATE TABLE IF NOT EXISTS payment_logs (
                                            transaction_id UUID,
                                            version int,
                                            message text,
                                            created_at timestamp,
                                            PRIMARY KEY (transaction_id, version)
) WITH CLUSTERING ORDER BY (version ASC);
