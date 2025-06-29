FROM gradle:8.8.0-jdk21-alpine AS builder

WORKDIR /home/gradle/project

# 1. Копируем только файлы сборки
COPY build.gradle.kts settings.gradle.kts ./

# 2. Скачиваем зависимости (эта команда может отличаться для твоего проекта)
#    Она создаст слой кэша. Если файлы сборки не менялись, этот шаг будет взят из кэша.
RUN gradle dependencies --no-daemon || true

# 3. Копируем остальной код
COPY src ./src

# 4. Собираем проект, используя уже скачанные зависимости
RUN gradle build --no-daemon -x test

# --- FINAL STAGE ---
FROM eclipse-temurin:21-jre-alpine

# Установка Tesseract OCR для распознавания текста
RUN apk add --no-cache tesseract-ocr tesseract-ocr-data-rus

WORKDIR /app

# Копируем собранный .jar файл из стадии сборки (builder)
COPY --from=builder /home/gradle/project/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]