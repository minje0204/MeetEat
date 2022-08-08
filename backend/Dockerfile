### build stage ###
FROM openjdk:11 AS builder
ARG JAR_FILE=build/libs/*.jar
ENV JAVA_OPTS=""
COPY ${JAR_FILE} app.jar
ENTRYPOINT java ${JAVA_OPTS} -jar /app.jar