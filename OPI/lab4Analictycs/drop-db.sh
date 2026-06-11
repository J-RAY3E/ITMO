#!/bin/bash
set -e

DB_NAME="${POSTGRES_DB:-lab4db}"
DB_USER="${POSTGRES_USER:-lab4user}"
DB_HOST="${POSTGRES_HOST:-127.0.0.1}"
DB_PORT="${POSTGRES_PORT:-5432}"

echo "Dropping PostgreSQL database '$DB_NAME' and user '$DB_USER'..."

sudo -u postgres psql <<SQL
DROP DATABASE IF EXISTS $DB_NAME;
DROP ROLE IF EXISTS $DB_USER;
SQL

echo "Done. Database '$DB_NAME' and role '$DB_USER' removed."
