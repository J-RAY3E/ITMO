# 🚀 Configuración de WildFly para Optimizar Memoria

## Problema Original
```
java.lang.OutOfMemoryError: Metaspace
```

El Metaspace se llena porque WildFly carga demasiadas clases de subsistemas que no necesitas.

---

## 📋 Instrucciones de Uso

### Opción 1: Solo Aumentar Memoria (Rápido)

1. Conéctate a tu servidor Linux:
   ```bash
   ssh s466103@tuservidor
   ```

2. Edita el archivo de configuración:
   ```bash
   nano /home/studs/s466103/wildfly-26.1.3.Final/bin/standalone.conf
   ```

3. Añade al final del archivo:
   ```bash
   JAVA_OPTS="$JAVA_OPTS -XX:MetaspaceSize=256m"
   JAVA_OPTS="$JAVA_OPTS -XX:MaxMetaspaceSize=512m"
   JAVA_OPTS="$JAVA_OPTS -Xms256m"
   JAVA_OPTS="$JAVA_OPTS -Xmx512m"
   ```

4. Reinicia WildFly:
   ```bash
   # Detener
   /home/studs/s466103/wildfly-26.1.3.Final/bin/jboss-cli.sh --connect --command=":shutdown"
   
   # Iniciar
   /home/studs/s466103/wildfly-26.1.3.Final/bin/standalone.sh &
   ```

---

### Opción 2: Usar Perfil Web (Recomendado)

Usa el perfil `standalone-web.xml` que es mucho más ligero:

```bash
/home/studs/s466103/wildfly-26.1.3.Final/bin/standalone.sh -c standalone-web.xml
```

Este perfil elimina automáticamente:
- EJB
- Messaging
- WebServices
- Y otros subsistemas pesados

---

### Opción 3: Deshabilitar Subsistemas Manualmente

1. Copia `disable-subsystems.cli` a tu servidor
2. Ejecuta:
   ```bash
   /home/studs/s466103/wildfly-26.1.3.Final/bin/jboss-cli.sh --connect --file=disable-subsystems.cli
   ```

---

## ⚠️ Notas Importantes

- **Backup**: Antes de modificar, haz backup de `standalone.conf` y `standalone.xml`
- **Perfil web**: Si usas `standalone-web.xml`, asegúrate de que tu datasource esté configurado allí también
- **EJB**: Si tu app usa `@Stateless` o `@Singleton`, NO deshabilites el subsistema ejb3

---

## 📊 Subsistemas Necesarios para tu App (weblab3)

| Subsistema | Necesario | Razón |
|------------|-----------|-------|
| undertow | ✅ Sí | Servidor web |
| jsf | ✅ Sí | JavaServer Faces |
| cdi | ✅ Sí | Inyección de dependencias |
| jpa | ✅ Sí | Persistencia con base de datos |
| transactions | ✅ Sí | Transacciones JTA |
| datasources | ✅ Sí | Conexión a Derby |
| naming | ✅ Sí | JNDI lookups |
| security | ✅ Sí | Seguridad básica |
| ejb3 | ❓ Depende | Solo si usas EJBs |
| jaxrs | ❌ No | No usas REST |
| messaging | ❌ No | No usas JMS |
| webservices | ❌ No | No usas SOAP |
| microprofile-* | ❌ No | APIs modernas no usadas |

---

## 🔧 Verificar Memoria Después de Cambios

Monitorea el uso de memoria con:
```bash
# Ver memoria de proceso Java
ps aux | grep wildfly

# Ver Metaspace en tiempo real (requiere JMX)
jstat -gc <PID>
```
