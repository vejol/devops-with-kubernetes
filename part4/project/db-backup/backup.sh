#!/bin/bash
echo "Starting backup script..."
set -e

TIMESTAMP=$(date +"%Y-%m-%d-%H-%M-%S")

echo "Using pg_dump tool to backup the database..."
pg_dump -v $POSTGRES_URL > /usr/src/app/backup.sql
echo "pg_dump command Succeeded."

echo "Uploading backup to Google Cloud Storage..."
gsutil cp /usr/src/app/backup.sql gs://vejolkko-todo-backup/backup_$TIMESTAMP.sql
echo "Backup copied to Google Cloud Storage."

echo "Backup script completed."