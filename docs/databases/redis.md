---
title: Redis
---

Port: 6379

Commands: https://redis.io/commands

Docs: https://redis.io/docs

GitHub: https://github.com/redis

https://db-engines.com/en/system/Redis

https://upstash.com - Serverless data for Redis and Kafka

Command cheatsheet: https://github.com/LeCoupa/awesome-cheatsheets/blob/master/databases/redis.sh

https://university.redis.com

GUI: https://getmedis.com

Build your own Redis - https://app.codecrafters.io/courses/redis/overview

## Usages/patterns

### Top 5 uses of Redis

https://www.youtube.com/watch?v=a4yX7RUgTxI

https://www.linkedin.com/posts/alexxubyte_systemdesign-coding-interviewtips-activity-7032024069294149632-NT1a

- String
  - Session
  - Cache
  - Distributed Lock
- Int
  - Counter
  - Rate Limiter
  - Global ID
- Hash
  - Shopping Cart
- Bitmap
  - User Retention
- List
  - Message Queue
- ZSet
  - Rank/Leaderboard

### Interesting articles on the docs

Redis patterns example by building a Twitter clone: authentication with a cookie: https://redis.io/docs/manual/patterns/twitter-clone/#authentication

> Remember that we are only able to access data in a direct way, without secondary indexes. It's not possible to tell Redis to return the key that holds a specific value. This is also our strength. This new paradigm is forcing us to organize data so that everything is accessible by primary key, speaking in relational DB terms.

Use Redis for client-side caching: https://redis.io/docs/manual/client-side-caching

## VS memcached

From https://www.linkedin.com/feed/update/urn:li:activity:7032024069294149632?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A7032024069294149632%2C7032158702639976449%29&dashCommentUrn=urn%3Ali%3Afsd_comment%3A%287032158702639976449%2Curn%3Ali%3Aactivity%3A7032024069294149632%29

> Redis may be one of the most overrated system in modern software architecture.
> Its usefulness may more limited than many people think.
> First is about caching, people should use memcached instead, because:
>
> - Redis has external fragmentation, meaning it can theoretically use much more than RAM set by its 'maxmemory'. In the containerized environment it is quite easy for the Redis instances to be killed by the OOM Killer. If you turn on active defrag it will affect the performance of the main core.
> - It is single threaded, that little core can easily be saturated under load: https://about.gitlab.com/blog/2022/11/28/how-we-diagnosed-and-resolved-redis-latency-spikes/
>   It is weird that a caching systems should protect db against load itself became crumble under high load.
> - If you turned on Redis persistence, because of 'fork' it can double the RAM usage because of Copy On Write. To safely avoid this condition you cannot realistically give Redis more than Half of your system RAM, a very wasteful limitation.
>
> Memcached is designed for caching, so it doesn't have these RAM problems. Even plain old relational databases doesn't have, too.

## Installation

On macOS, use `brew install redis` as explained in https://redis.io/docs/getting-started/installation/install-redis-on-mac-os/.

## Start and stop

```shell
brew services start redis
brew services stop redis

# Check the status of the service
brew services info redis

# Restart after a Redis upgrade with Brew
brew services restart redis
```

https://redis.io/docs/getting-started/installation/install-redis-on-mac-os/#starting-and-stopping-redis-using-launchd

## CLI `redis-cli`

https://redis.io/docs/ui/cli/

### Connect

https://www.digitalocean.com/community/cheatsheets/how-to-connect-to-a-redis-database

https://docs.redis.com/latest/rs/references/cli-utilities/redis-cli/

Connect to a local instance: `redis-cli`

Connect to a remote instance:

```shell
redis-cli -h <host> -p <port> -a <password>
```

Default address is 127.0.0.1 and default port is 6379, so doing `redis-cli` is like doing `redis-cli -h 127.0.0.1 -p 6379`.

To authenticate, you can alternatively provide the password using the envar `REDISCLI_AUTH`. You can also connect without specifying the password (ie `redis-cli -h <host> -p <port>`), but you won't be able to add, change or query data until you run the command `AUTH <password>` to authenticate.

Test the connection: [`PING`](https://redis.io/commands/ping/)

### Keys

Get all keys:

- [`SCAN`](https://redis.io/commands/scan/). Preferred since it's O(1). Returns a cursor. According to the docs _can be used in production without the downside of commands like `KEYS` or `SMEMBERS` that may block the server for a long time (even several seconds) when called against big collections of keys or elements_. Examples:
  - `SCAN 0`
  - `SCAN 0 MATCH something:*`
- [`KEYS *`](https://redis.io/commands/keys/). Warning: is O(N).

See discussion at https://stackoverflow.com/questions/5252099/redis-command-to-get-all-available-keys.

Get type of key: [`TYPE <key>`](https://redis.io/commands/type/). It returns 'none' when the key does not exist.

Delete a key: [`DEL key1 key2 ...`](https://redis.io/commands/del/).

## Data types

https://redis.io/docs/manual/patterns/twitter-clone/

> Hashes are the ideal data structure to represent objects. For example we use Hashes in order to represent Users and Updates in our Twitter clone.

## Optimization

https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/

From [Using hashes to abstract a very memory-efficient plain key-value store on top of Redis](https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/memory-optimization/#using-hashes-to-abstract-a-very-memory-efficient-plain-key-value-store-on-top-of-redis)

> A few keys use a lot more memory than a single key containing a hash with a few fields
