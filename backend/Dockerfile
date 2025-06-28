FROM gradle:8.8.0-jdk21-alpine as builder

WORKDIR /home/gradle/project

COPY build.gradle.kts settings.gradle.kts gradlew ./
RUN chmod +x ./gradlew

COPY gradle ./gradle

COPY src ./src

RUN ./gradlew build --no-daemon -x test

# --- FINAL STAGE ---
FROM eclipse-temurin:21-jre-alpine

# Install Tesseract OCR and the necessary language packs (Russian and English)
RUN apk add --no-cache tesseract-ocr tesseract-ocr-data-rus tesseract-ocr-data-eng

# For debugging: Check if the traineddata files are in the expected location.
# You can remove these two lines after confirming it works.
RUN echo "--- Checking contents of /usr/share/tessdata ---" && \
    ls -l /usr/share/tessdata

# Set the environment variable to point DIRECTLY to the tessdata directory.
ENV TESSDATA_PREFIX=/usr/share/tessdata

WORKDIR /app
COPY --from=builder /home/gradle/project/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]