---
title: RDS
---

https://aws.amazon.com/rds

https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html

https://aws.amazon.com/solutions/implementations/amazon-rds-postgresql - https://aws-ia.github.io/cfn-ps-amazon-rds/

RDS course - https://awseducate.instructure.com/courses/912 - Getting Started with Databases

Tutorial - https://aws.amazon.com/getting-started/hands-on/create-mysql-db/

For long term usage (1 to 3 years), you can save money with reserved instances, see [Reserved DB instances for Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithReservedDBInstances.html).

## Security

There are 3 levels of access control:

### RDS configuration and management

Access control to RDS configuration with IAM policies attached to users, groups and roles.

See examples here: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/security_iam_id-based-policy-examples.html

List of available actions: https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazonrds.html

### Network access to the database instance

_All here applies to ElastiCache as well._

Control network access to the database instance with Security Groups (at the database instances) and Network ACLs (at the subnets).

Public access from the internet should not be allowed. RDS instances should only be accessible from within the VPC. Only machines that need to connect to the database should have network access to the database. For example, only backend EC2 instances should have network access to database instances. To do so, create two security groups (one for the clients and another for the RDS instance) and configure the RDS security group to only allow access from the backend instances' security group, on port 3306 (MySQL) or 5432 (PostgreSQL).

### Database access

Access to the database data using the database engine access control system (eg username + password).

Typically you create a user in the database for the application that needs to access the data.

You can also use [IAM database authentication](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html). It works with MariaDB, MySQL and PostgreSQL. You don't use a password to connect to an instance, you use an authentication token.

### Connection encryption

Using SSL/TLS to encrypt a connection to a DB instance or cluster - https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.SSL.html

To have SSL/TLS encryption at the connection from the instances to the database, you need to download the AWS-provided root certificates and use them when connecting to the RDS DB instance.

### Encryption at rest

You can only enable encryption when you create an instance. Encryption can’t be disabled.

You can’t restore an unencrypted backup or snapshot to an encrypted instance. In other words, you can’t change the encryption status of an existing database.

A snapshot has the same encryption status (enabled/disabled) than the database. But you can create an encrypted copy of an unencrypted snapshot.

If we have an unencrypted database and we want to encrypt it, we can:

- Create a snapshot of the existing unencrypted DB instance.
- Create an encrypted copy of the snapshot.
- Create a new DB instance from the encrypted snapshot and update the application to use it.

The opposite (create an unencrypted database from an encrypted database) can't be done, since you cannot remove the encryption from an encrypted DB snapshot.

A read replica will always have the same encryption status as the primary. When a read replica in the same region than the primary, the same KMS key is used. If it is in a different region, a different KMS key is be used.

## Backups / Snapshots

https://aws.amazon.com/rds/features/backup

- Automated backup: a snapshot done automatically by AWS during the backup window. It appears at the "System snapshots" list at the console (Snapshots page). Has a name like "rds:database-1-2025-04-03-20-04". Retained up to 35 days.
- Manual snapshot: a snapshot done manually by you. It appears at the "Manual snapshots" list at the console (Snapshots page). They do not expire, you can keep them forever.
- Restore: create a new DB instance or DB cluster from a snapshot.

Automated backups are deleted when the database instance is deleted, but manual snapshots are not.

The default [backup retention period](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.BackupRetention.html) is one day, the minimum is 0 and the maximum is 35 days. To disable automated backups, set the backup retention period to 0.

:::warning
An outage occurs if you change the backup retention period of a DB instance from 0 to a nonzero value or from a nonzero value to 0. [source](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.BackupRetention.html)
:::

There's a limit of 100 _manual_ snapshots per region (no limit for automated snapshots).

A manual snapshot backs up the entire database instance, not just individual databases.

A snapshot has the same encryption status (enabled/disabled) than the database.

### AWS Backup

You can use AWS Backup to create a backup plan that automates RDS backups on a schedule. Snapshots can be retained for years or indefinitely. It also supports continuous backups for point-in-time recovery, which enables you to choose when to restore, down to the second. See [Amazon RDS Backup & Restore Using AWS Backup](https://aws.amazon.com/getting-started/hands-on/amazon-rds-backup-restore-using-aws-backup/).

### Create a manual snapshot

Create a manual snapshot with [`create-db-snapshot`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/create-db-snapshot.html):

```shell
aws rds create-db-snapshot \
 --db-snapshot-identifier prod-2024-12-11-manual \
 --db-instance-identifier <db-id>
```

(To get the database identifier you can do `aws rds describe-db-instances --query "DBInstances[0].DBInstanceIdentifier" --output text`.)

Creating the snapshot can take a few minutes. To check its state run:

```shell
aws rds describe-db-snapshots --db-snapshot-identifier prod-2024-12-11-manual
```

### Restore a snapshot

You can't restore an snapshot to an existing database. To restore a database from a snapshot, you need to **create a new database instance** with [`restore-db-instance-from-db-snapshot`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/restore-db-instance-from-db-snapshot.html):

```shell
aws rds restore-db-instance-from-db-snapshot \
 --db-instance-identifier prod-db-restore \
 --db-snapshot-identifier prod-2024-12-11-manual \
 --db-subnet-group-name prod-dbsubnetgroup-9lf7puduixew
```

Get the Subnet group from the console (first tab, "Connectivity & security").

If you are restoring from an _automated_ snapshot, you can also restore the database in a specific **point in time** with [`restore-db-instance-to-point-in-time`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/restore-db-instance-to-point-in-time.html):

```shell
aws rds restore-db-instance-to-point-in-time \
 --target-db-instance-identifier prod-db-restore-point-in-time \
 --source-db-instance-identifier <db-id> \
 --restore-time 2024-12-11T09:30:00Z
 --db-subnet-group-name prod-dbsubnetgroup-9lf7puduixew
```

### Retain an automated snapshot

Automated snapshots are deleted automatically after the retention period. To keep an automated snapshot, first get the automated snapshot identifier:

```shell
aws rds describe-db-snapshots --snapshot-type automated \
 --db-instance-identifier <db-id> \
 --query "DBSnapshots[0].DBSnapshotIdentifier" \
 --output text
```

This returns something like `rds:prod-database-7c17lpkmp9zg-2024-12-11-12-43`. Then copy the automated snapshot to a manual snapshot:

```shell
aws rds copy-db-snapshot \
 --source-db-snapshot-identifier rds:prod-database-7c17lpkmp9zg-2024-12-11-12-43 \
 --target-db-snapshot-identifier prod-snapshot-copy
```

### Delete a snapshot

[docs](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/delete-db-snapshot.html)

```shell
aws rds delete-db-snapshot --db-snapshot-identifier <snapshot-id>
```

## CLI

Reference - https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/index.html

Examples - https://github.com/aws/aws-cli/tree/develop/awscli/examples/rds

Get instance information with [describe-db-instances](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/describe-db-instances.html):

```shell
aws rds describe-db-instances
```

As usual, we can query to get specific values:

```shell
aws rds describe-db-instances --query "DBInstances[0].Endpoint"
aws rds describe-db-instances --query "DBInstances[0].Endpoint.Address" --output text
```

Delete a database instance with [`delete-db-instance`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/delete-db-instance.html):

```shell
aws rds delete-db-instance --db-instance-identifier <db-id>
```

If you don't want to create a final snapshot before deleting the instance, add `--skip-final-snapshot`.

## Monitoring with CloudWatch

https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/monitoring-cloudwatch.html

https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-metrics.html

Should watch the following metrics:

- `FreeStorageSpace` (Bytes)
- `CPUUtilization` (%)
- `FreeableMemory` (Bytes)
- `DiskQueueDepth` (Count)
- `SwapUsage` (Bytes)
