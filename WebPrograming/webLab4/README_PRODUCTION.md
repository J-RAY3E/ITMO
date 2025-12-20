# Weblab 3 - Production Guide

## Structure
The project has been refactored into a modern architecture:
- **Backend**: Java EE (EJB, JPA, JAX-RS) dealing with business logic, database interactions, and REST API.
- **Frontend**: React + Redux application located in `frontend/`.

## Cleanup
The legacy JSF/JSP files (`index.xhtml`, `start.xhtml`, `ResultBean`, etc.) have been removed. The `src/main/webapp` folder is now empty except for configuration files, as the frontend is built dynamically.

## Building for Production
The `pom.xml` has been configured to build the fullstack application in one go.

1. **Run Maven Build**:
   ```bash
   mvn clean package
   ```
   This command will:
   - Compile the Java backend.
   - Automatically install Node.js and release dependencies.
   - Run `npm run build` in the `frontend` directory.
   - Copy the React build artifacts (`frontend/dist`) into the final WAR file.
   - Package everything into `target/weblab3.war`.

## Deployment
1. **Database**:
   - Ensure PostgreSQL is running.
   - Ensure PostgreSQL is running.
   - Configure a DataSource in WildFly named `java:jboss/datasources/weblab3DS` pointing to your Postgres database.

   **Configuring PostgreSQL Driver (Production Way)**:
   Instead of deploying the JAR manually every time, install it as a module:
   1. Create directory structure: `WIlDFLY_HOME/modules/org/postgresql/main`
   2. Copy `postgresql-42.7.2.jar` into that folder.
   3. Create a `module.xml` file in that folder with content:
      ```xml
      <?xml version="1.0" ?>
      <module xmlns="urn:jboss:module:1.1" name="org.postgresql">
          <resources>
              <resource-root path="postgresql-42.7.2.jar"/>
          </resources>
          <dependencies>
              <module name="javax.api"/>
              <module name="javax.transaction.api"/>
          </dependencies>
      </module>
      ```
   4. Register driver in CLI:
      ```bash
      /subsystem=datasources/jdbc-driver=postgresql:add(driver-name=postgresql,driver-module-name=org.postgresql,driver-class-name=org.postgresql.Driver)
      ```
   5. Create DataSource (pointing to this driver):
      ```bash
      data-source add --name=weblab3DS --jndi-name=java:jboss/datasources/weblab3DS --driver-name=postgresql --connection-url=jdbc:postgresql://localhost:5432/postgres --user-name=postgres --password=your_password
      ```
   
2. **Deploy**:
   - Copy `target/weblab3.war` to your WildFly `standalone/deployments` folder.
   - The application will be available at `http://localhost:8080/weblab3`.

## Development Mode (Hot Reload)
If you want to work on the frontend with hot reload:
1. Start WildFly (Backend).
2. Run `npm run dev` in `frontend/` folder.
3. Access `http://localhost:5173`. It is configured to proxy API requests to the running Backend.
