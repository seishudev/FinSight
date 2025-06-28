FROM gradle:8.8.0-jdk21-alpine as builder

WORKDIR /home/gradle/project

COPY build.gradle.kts settings.gradle.kts gradlew ./
RUN chmod +x ./gradlew

COPY gradle ./gradle

COPY src ./src

RUN ./gradlew build --no-daemon -x test

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app
COPY --from=builder /home/gradle/project/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
