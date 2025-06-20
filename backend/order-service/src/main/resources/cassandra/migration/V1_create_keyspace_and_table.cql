CREATE KEYSPACE IF NOT EXISTS order_keyspace
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE order_keyspace;

CREATE TABLE IF NOT EXISTS orders_by_user (
                                              user_id UUID,
                                              created_at timestamp,
                                              order_id UUID,
                                              shop_id UUID,
                                              status text,
                                              total decimal,
                                              items list<text>,
                                              PRIMARY KEY (user_id, created_at)
) WITH CLUSTERING ORDER BY (created_at DESC);
