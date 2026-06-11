#!/bin/bash
set -e

STANDALONE_CONF="$JBOSS_HOME/bin/standalone.conf"
JMX_CONF_DIR="${JBOSS_HOME}/standalone/configuration/jmx"

if ! grep -q "java.rmi.server.hostname" "$STANDALONE_CONF" 2>/dev/null; then
  echo 'JAVA_OPTS="$JAVA_OPTS -Djava.rmi.server.hostname=localhost"' >> "$STANDALONE_CONF"
fi

unset JAVA_OPTS

/opt/jboss/wildfly/bin/standalone.sh "$@" &

echo "Waiting for WildFly to start..."
for i in $(seq 1 90); do
  if curl -s -o /dev/null http://localhost:9990/management 2>/dev/null; then
    break
  fi
  sleep 2
done

JAVA_PID=$(/opt/java/openjdk/bin/jcmd -l 2>/dev/null | grep "jboss-modules" | awk '{print $1}')

if [ -n "$JAVA_PID" ]; then
  chmod 400 "$JMX_CONF_DIR/jmxremote.password"
  /opt/java/openjdk/bin/jcmd $JAVA_PID ManagementAgent.start \
    jmxremote.port=9999 \
    jmxremote.authenticate=true \
    jmxremote.password.file="$JMX_CONF_DIR/jmxremote.password" \
    jmxremote.access.file="$JMX_CONF_DIR/jmxremote.access" \
    jmxremote.ssl=false \
    jmxremote.rmi.port=9999 2>/dev/null || true
  echo "JMX agent started on port 9999 (password auth, no SSL)"
fi

wait $!
