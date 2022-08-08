### build stage ###
FROM gradle:7.5-jdk11 AS builder
RUN mkdir /usr/src/app
COPY --chown=gradle:gradle . /usr/src/app
WORKDIR /usr/src/app
RUN gradle build -x test

FROM openjdk:11
ENV JAVA_OPTS=""
COPY --from=builder /usr/src/app/build/libs/*.jar app.jar
ENTRYPOINT java ${JAVA_OPTS} -jar /app.jar