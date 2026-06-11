#!/bin/bash
set -e

DB_NAME="${POSTGRES_DB:-lab4db}"
DB_USER="${POSTGRES_USER:-lab4user}"
DB_PASS="${POSTGRES_PASSWORD:-lab4pass}"
DB_HOST="${POSTGRES_HOST:-127.0.0.1}"
DB_PORT="${POSTGRES_PORT:-5432}"

echo "Creating PostgreSQL database '$DB_NAME' and user '$DB_USER'..."

sudo -u postgres psql <<SQL
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '$DB_USER') THEN
    CREATE ROLE $DB_USER LOGIN PASSWORD '$DB_PASS';
  END IF;
END
\$\$;

SELECT 'CREATE DATABASE $DB_NAME OWNER $DB_USER'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB_NAME')\gexec

GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
SQL

echo "Done. Database '$DB_NAME' owned by '$DB_USER' is ready."
