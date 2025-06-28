# --- ЭТАП СБОРКИ (BUILDER) ---
    FROM gradle:8.8.0-jdk21-alpine as builder

    WORKDIR /home/gradle/project
    
    # Шаг 1: Копируем все файлы, необходимые для определения зависимостей
    COPY build.gradle.kts settings.gradle.kts gradlew ./
    COPY gradle ./gradle
    
    # Шаг 2: Делаем gradlew исполняемым. ЭТО КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ
    RUN chmod +x ./gradlew
    
    # Шаг 3: Скачиваем зависимости, чтобы закешировать этот слой.
    # Эта команда специально предназначена для загрузки зависимостей и работает чище.
    RUN ./gradlew dependencies --no-daemon
    
    # Шаг 4: Копируем исходный код. Изменения здесь не затронут кеш зависимостей.
    COPY src ./src
    
    # Шаг 5: Выполняем финальную сборку. Она будет очень быстрой, так как все уже скачано.
    RUN ./gradlew build --no-daemon -x test
    
    
    # --- ФИНАЛЬНЫЙ ЭТАП (FINAL STAGE) ---
    # Эта часть остается без изменений, она правильная.
    FROM eclipse-temurin:21-jre-alpine
    
    RUN apk add --no-cache tesseract-ocr tesseract-ocr-data-rus tesseract-ocr-data-eng
    
    WORKDIR /app
    COPY --from=builder /home/gradle/project/build/libs/*.jar app.jar
    
    EXPOSE 8080
    
    ENTRYPOINT ["java", "-jar", "app.jar"]