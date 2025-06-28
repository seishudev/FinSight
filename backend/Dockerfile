# --- ЭТАП СБОРКИ (BUILDER) ---
# Используем Gradle. Я обновил версию до 8.8.0, чтобы соответствовать вашей, но вы можете использовать и более новую.
FROM gradle:8.8.0-jdk21-alpine as builder

WORKDIR /home/gradle/project

# 1. Копируем только файлы сборки.
# Этот слой будет закеширован, пока вы не измените build.gradle.kts
COPY build.gradle.kts settings.gradle.kts gradlew ./
COPY gradle ./gradle

# 2. Запускаем загрузку зависимостей.
# Gradle достаточно умен, чтобы скачать зависимости, даже если нет исходного кода.
# Этот слой тоже будет закеширован.
# --no-daemon обязательно для Docker
RUN ./gradlew build --no-daemon || true

# 3. Теперь копируем исходный код.
# Если вы поменяете только код, Docker начнет пересборку с этого места,
# а зависимости уже будут в кеше из шага 2.
COPY src ./src

# 4. Запускаем финальную сборку. Это будет ОЧЕНЬ БЫСТРО,
# так как все зависимости уже скачаны.
RUN ./gradlew build --no-daemon -x test


# --- ФИНАЛЬНЫЙ ЭТАП (FINAL STAGE) ---
# Эта часть остается такой, как мы обсуждали ранее.
FROM eclipse-temurin:21-jre-alpine

RUN apk add --no-cache tesseract-ocr tesseract-ocr-data-rus tesseract-ocr-data-eng

WORKDIR /app
COPY --from=builder /home/gradle/project/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]