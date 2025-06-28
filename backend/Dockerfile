FROM gradle:8.8.0-jdk21-alpine as builder

WORKDIR /home/gradle/project

COPY build.gradle.kts settings.gradle.kts gradlew ./
RUN chmod +x ./gradlew

COPY gradle ./gradle

COPY src ./src

RUN ./gradlew build --no-daemon -x test

# --- FINAL STAGE ---
FROM eclipse-temurin:21-jre-alpine

# Install Tesseract OCR and the Russian language pack
# The --no-cache flag updates the package list, installs, and cleans up in one step.
RUN apk add --no-cache tesseract-ocr tesseract-ocr-data-rus

WORKDIR /app
COPY --from=builder /home/gradle/project/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]