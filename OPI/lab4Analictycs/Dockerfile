FROM gradle:8.7-jdk17 AS builder

RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

WORKDIR /home/gradle/project

COPY build.gradle gradle.properties ./
COPY frontend/package*.json ./frontend/

RUN gradle dependencies --no-daemon

COPY . .

RUN gradle warBuild --no-daemon


FROM quay.io/wildfly/wildfly:26.1.3.Final-jdk17 AS runtime


ENV JBOSS_HOME=/opt/jboss/wildfly

# Install PostgreSQL JDBC driver module
RUN mkdir -p $JBOSS_HOME/modules/org/postgresql/main && \
    curl -sL -o $JBOSS_HOME/modules/org/postgresql/main/postgresql-42.7.5.jar \
        "https://jdbc.postgresql.org/download/postgresql-42.7.5.jar" && \
    echo '<?xml version="1.0" encoding="UTF-8"?> \
<module name="org.postgresql" xmlns="urn:jboss:module:1.9"> \
    <resources> \
        <resource-root path="postgresql-42.7.5.jar"/> \
    </resources> \
    <dependencies> \
        <module name="java.compiler"/> \
        <module name="java.desktop"/> \
        <module name="java.instrument"/> \
        <module name="java.logging"/> \
        <module name="java.management"/> \
        <module name="java.naming"/> \
        <module name="java.scripting"/> \
        <module name="java.sql"/> \
        <module name="java.transaction.xa"/> \
    </dependencies> \
</module>' > $JBOSS_HOME/modules/org/postgresql/main/module.xml

COPY --chmod=755 entrypoint.sh /opt/jboss/wildfly/bin/entrypoint.sh

COPY --from=builder /home/gradle/project/build/*.war /opt/jboss/wildfly/standalone/deployments/webLab4.war

COPY wildfly-local/standalone/configuration/standalone.xml $JBOSS_HOME/standalone/configuration/

EXPOSE 8080 8081


ENTRYPOINT ["/opt/jboss/wildfly/bin/entrypoint.sh"]
CMD ["-b", "0.0.0.0", "-bmanagement", "0.0.0.0"]
