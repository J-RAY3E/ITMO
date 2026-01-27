# Point Checker Application

Aplicación JSF para verificar si un punto cae dentro de un área definida en el plano de coordenadas.

## Requisitos del Sistema

- Java 11 o superior
- Apache Maven 3.6+
- PostgreSQL 12 o superior
- Servidor de aplicaciones compatible con JSF 2.3 (GlassFish, WildFly, TomEE, etc.)

## Configuración de la Base de Datos

1. Crear una base de datos PostgreSQL:
```sql
CREATE DATABASE pointchecker;
```

2. Actualizar las credenciales en `src/main/resources/META-INF/persistence.xml`:
```xml
<property name="javax.persistence.jdbc.url" value="jdbc:postgresql://localhost:5432/pointchecker"/>
<property name="javax.persistence.jdbc.user" value="postgres"/>
<property name="javax.persistence.jdbc.password" value="postgres"/>
```

## Construcción del Proyecto

```bash
mvn clean package
```

Esto generará el archivo WAR en `target/point-checker.war`

## Despliegue

1. Copiar el archivo WAR generado al directorio de despliegue de su servidor de aplicaciones
2. Iniciar el servidor
3. Acceder a la aplicación en `http://localhost:8080/point-checker/`

## Estructura del Proyecto

```
p3/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/pointchecker/
│   │   │       ├── bean/           # Managed Beans
│   │   │       ├── dao/            # Data Access Objects
│   │   │       ├── entity/         # JPA Entities
│   │   │       └── util/           # Utility classes
│   │   ├── resources/
│   │   │   └── META-INF/
│   │   │       └── persistence.xml # Hibernate configuration
│   │   └── webapp/
│   │       ├── WEB-INF/
│   │       │   ├── web.xml         # Servlet configuration
│   │       │   └── faces-config.xml # JSF navigation
│   │       ├── resources/
│   │       │   ├── css/
│   │       │   └── js/
│   │       ├── index.xhtml          # Start page
│   │       └── main.xhtml           # Main application page
└── pom.xml                          # Maven dependencies
```

## Características

- **Página de Inicio:** Muestra información del estudiante y reloj actualizable
- **Página Principal:** Formulario de entrada, visualización de canvas interactivo, y tabla de resultados
- **Validación:** Validación de coordenadas y radio
- **Persistencia:** Almacenamiento de resultados en PostgreSQL usando Hibernate
- **Componentes JSF:** Uso de PrimeFaces para componentes ricos de UI

## Tecnologías Utilizadas

- JSF 2.3
- PrimeFaces 12.0
- ICEfaces 4.3
- Hibernate 5.6
- PostgreSQL 42.7
- Maven
