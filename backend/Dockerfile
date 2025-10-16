# Build stage
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /workspace
# copy pom + mvnw and .mvn to leverage layer caching
COPY pom.xml mvnw .mvn/ ./
# copy source and build
COPY src ./src
RUN mvn -B -DskipTests package

# Run stage
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /workspace/target/*.jar app.jar
ENV JAVA_OPTS=""
EXPOSE 8080
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar /app/app.jar"]
