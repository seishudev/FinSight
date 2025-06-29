FROM gradle:8.8.0-jdk21-alpine AS builder

WORKDIR /home/gradle/project

COPY build.gradle.kts settings.gradle.kts gradlew ./
RUN chmod +x ./gradlew

COPY gradle ./gradle

COPY src ./src

# Сборка проекта без запуска тестов
RUN ./gradlew build --no-daemon -x test

# --- FINAL STAGE ---
FROM eclipse-temurin:21-jre-alpine


WORKDIR /app

# Копируем собранный .jar файл из стадии сборки (builder)
COPY --from=builder /home/gradle/project/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]