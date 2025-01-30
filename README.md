# DevOps with Kubernetes

## Exercises

There are separate commits for most of the exercises.

## Exercise 3.06: DBaaS vs DIY

The choice between Google Cloud SQL and a self-managed containerized database solution involves many considerations. Both approaches have their pros and cons.

### Database as a Service - Google Cloud SQL

#### Pros

- Setting up the database is easy and does not require much work or understanding of configurations.
- Database maintenance and updates are outsourced to Google, saving time and effort.
- The service can be considered highly scalable, meaning that as the load increases, the service automatically ensures database availability.
- Google Cloud SQL offers various backup options:
  - Backups can be made automatically at regular intervals or manually initiated by the user.
  - Backup and retention are automatically configured, making it easy to enable backups.

#### Cons

- Costs are higher compared to a self-managed database. The price consists of many components, making it difficult to estimate accurately.
- In some cases, DBaaS may be more limited in functionality compared to a self-managed database solution. The user may want a feature in the database that is not available in the managed service.

### Self-Managed Database Using Containerized PostgreSQL

#### Pros

- It is a more cost-effective option. There are costs associated with database usage and data storage, but generally, a self-managed database is cheaper than the DBaaS option.
- Provides full control over configuration, allowing you to choose any database and its version.

#### Cons

- Requires more manual work. It is more labor-intensive to set up and requires an understanding of database configurations.
- You must take care of the database's scalability yourself.
- The database solution must be maintained by yourself, meaning you need to ensure its functionality and updates.
- You need to set up the backup solution yourself. This requires time and expertise. The database can be backed up, for example, by taking a snapshot of the volume where the database data is stored. Another option could be using the pg_dump tool to create a backup.
