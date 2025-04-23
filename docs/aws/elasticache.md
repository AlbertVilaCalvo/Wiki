---
title: ElastiCache
---

https://aws.amazon.com/elasticache

Valkey, Redis OSS and Memcached managed service. ElastiCache is for in-memory databases what RDS is for relational databases.

Often, ElastiCache is used in front of an RDS database, acting as a secondary database that stores ephemeral data coming from a primary database. In addition:

> You can use ElastiCache as a primary data store for use cases that don't require data durability, such as gaming leaderboards, streaming, and data analytics [source](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/creating-elasticache-cluster-with-RDS-settings.html)

Optimize cost and boost performance of RDS for MySQL using Amazon ElastiCache for Redis - https://aws.amazon.com/blogs/database/optimize-cost-and-boost-performance-of-rds-for-mysql-using-amazon-elasticache-for-redis/

| Web Console | CLI/API           |
| ----------- | ----------------- |
| Cluster     | Replication group |
| Shard       | Node group        |

## Performance

- Scale vertically: use a bigger [node type](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/CacheNodes.SupportedTypes.html).
- Scale horizontally:
  - Add read replicas if you need more read capacity.
  - Add shards if you need more memory and/or more read and write capacity.

To reduce the amount of memory used, you can also **compress** the data. This needs to be implemented in your application code. See [Does Redis Db has built-in compression option?](https://stackoverflow.com/questions/10909602/does-redis-db-has-built-in-compression-option):

> In one of our Redis cluster we saved like 82% of memory (from circa 340GB to 60GB) thanks to GZIPing our json-based blobs.

### Read replicas

With read replicas, one node in a node group is the primary, which accepts reads and writes, and replicates data to read replicas, which only accept reads.

Data is replicated **asynchronously**. The metric `ReplicationLag` tells you how many seconds it takes to the read replicas to have the same data than the primary.

If you have no read replicas and the node fails, you experience data loss. You loose all the data if you only have one shard, or the data in that shard if you have more than one.

Read replicas also provide **high availability**.

### Sharding (cluster mode enabled)

https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Replication.Redis-RedisCluster.html

Cluster mode disabled doesn't support sharding. If it's enabled, you can have up to 500 shards (node groups). Both support Multi-AZ.

With sharding you split your data among multiple node groups. A shard consists of at least a primary node (for reads and writes) and optionally up to 5 read replica nodes (read only).

Adding shards allows you to scale the available memory in the cluster. If the data exceeds the memory of a machine's node, you'll need sharding.

In addition, **sharding** provides the following benefits:

- Faster failover, since no DNS swap is needed if the primary node fails; you just need to wait for a new primary to be elected.
  - If cluster mode is disabled, you connect to a _primary endpoint_ ([source](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Endpoints.html)).
  - If cluster mode is enabled, you use a _configuration endpoint_ which knows all the primary and node endpoints in the cluster ([source](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Replication.Endpoints.html)) and you can query to find the new primary.
- Higher read and write throughput, since request are split among shards.
- If a shard fails, you can still write to the other shards; only a share of the key space is affected. But if you only have one shard and it fails, you cannot write anything, since a single node takes the entire key space.

## Caching strategies

Caching patterns: lazy loading vs write-through - https://docs.aws.amazon.com/whitepapers/latest/database-caching-strategies-using-redis/caching-patterns.html

Caching strategies for Memcached - https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Strategies.html

### Lazy loading

1. The app writes to RDS.
2. When the app reads, it makes a request to the cache first. If the data is not cached, it queries RDS and stores the data in the cache.

The main problem is that you can read stale data. You need a TTL to expire items in the cache. The higher the TTL, the lower your load to your RDS database, but more stale data you'll have in the cache. Alternatively, you can remove the data from the cache when you write to RDS.

The main advantage is that the cache only contains data that is actually read.

### Write-through

1. The app writes to RDS and the cache.
2. When the app reads, it makes a request to the cache, which always contains the _latest_ data. (In case that the data is not cached, you read from RDS.)

The main problem is that the cache needs to be very big, because it stores all the data, even though most of it will probably not be read.

Another problem is that when you create a new cache node it will be empty, so you need a way to fill it (eg lazy loading).

The main advantage is that data in the cache is never stale.

## Security

There are 4 levels of access control:

### ElastiCache configuration and management

Access control to ElastiCache configuration with IAM policies attached to users, groups and roles.

See https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/IAM.html

List of available actions: https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazonelasticache.html

### Network access to the database instance

_All here applies to RDS as well._

Control network access to the database instance with Security Groups.

From AWS in Action p. 300:

> ElastiCache nodes in a cluster use only private IP addresses. Therefore, you can’t connect to a node directly over the internet. The same is true for other resources as RDS database instances. Therefore, create an EC2 instance in the same VPC as the cluster for testing. From the EC2 instance, you can then connect to the private IP address of the cluster.

From AWS in Action p. 310:

> ElastiCache nodes always have private IP addresses. This means that you can’t accidentally expose a Redis or Memcached cluster to the internet. You still want to use security groups to implement the principle of least privilege.

To control network access, create 2 security groups. The client security group is attached to the EC2 instances that need access to the cache cluster (the web or application servers). The cluster security group allows traffic only on port 6379 and only from the client security group.

### Database access

Access to the database data using the database engine access control system (eg username + password).

Memcached does not provide user authentication.

With Redis you can use two mechanisms to authenticate: tokens and users with RBAC (role based access control). Use RBAC if you need to restrict access to some of the data (eg allow the frontend to read some data, and the backend some other).

## Monitoring with CloudWatch

Host-Level Metrics - https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/CacheMetrics.HostLevel.html

Metrics for Valkey and Redis OSS - https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/CacheMetrics.Redis.html

Which Metrics Should I Monitor? - https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/CacheMetrics.WhichShouldIMonitor.html

Should watch the following metrics (AWS in Action p. 319):

- `CPUUtilization` (%)
- `EngineCPUUtilization` (%)
- `SwapUsage` (Bytes)
- `Evictions` (Count)
- `ReplicationLag` (Seconds)

## ElastiCache vs MemoryDB

Memory DB does not support Memcached, only supports Valkey and Redis OSS.

> MemoryDB behaves like ElastiCache for Redis, but it comes with persistence guarantees, which make it possible to use it as the primary database. (AWS in Action p. 308)

Elasticache or MemoryDB: Which I should I use? - https://www.reddit.com/r/aws/comments/pchg4m/elasticache_or_memorydb_which_i_should_i_use/

> If you have another database and just want redis as a fast cache, use ElastiCache. If you want Redis to be your primary database without potential data loss, go MemoryDB.

https://cloudwellserved.com/amazon-elasticache-for-redis-vs-amazon-memorydb-for-redis/
