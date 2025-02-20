#!/bin/bash
echo "Starting backup script..."
set -e

echo "Taking database backup..."
pg_dump -v $POSTGRES_URL > /usr/src/app/todo-backup.sql
echo "Database backup completed."

gsutil cp /usr/src/app/todo-backup.sql gs://vejolkko-todo-backup/todo-database-backup.sql
echo "Backup copied to Google Cloud Storage."

echo "Backup script completed."