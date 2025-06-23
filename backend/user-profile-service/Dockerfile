# Dùng image nhẹ với OpenJDK 17
FROM openjdk:17-jdk-slim

# Thư mục làm việc trong container
WORKDIR /app

# Copy file jar đã build vào container (chỉnh đúng tên)
COPY target/*.jar app.jar

# Câu lệnh khởi chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]
