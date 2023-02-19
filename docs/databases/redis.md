---
title: Redis
---

Commands: https://redis.io/commands

Docs: https://redis.io/docs

GitHub: https://github.com/redis

https://upstash.com - Serverless data for Redis and Kafka

Command cheatsheet: https://github.com/LeCoupa/awesome-cheatsheets/blob/master/databases/redis.sh

https://university.redis.com

## Top 5 uses of Redis

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

https://redis.io/docs/manual/cli

Connect:

```bash
redis-cli -h <host> -p <port> -a <password>
```

Default address is 127.0.0.1 and default port is 6379, so doing `redis-cli` is like doing `redis-cli -h 127.0.0.1 -p 6379`.

To authenticate, you can alternatively provide the password using the envar `REDISCLI_AUTH`. You can also connect first, and then run the command `AUTH <password>` to authenticate.

Use [`PING`](https://redis.io/commands/ping/) to test the connection.

Get all keys:

- [`SCAN`](https://redis.io/commands/scan/). Preferred since it's O(1). Returns a cursor. According to the docs _can be used in production without the downside of commands like `KEYS` or `SMEMBERS` that may block the server for a long time (even several seconds) when called against big collections of keys or elements_. Examples:
  - `SCAN 0`
  - `SCAN 0 MATCH something:*`
- [`KEYS *`](https://redis.io/commands/keys/). Warning: is O(N).

See discussion at https://stackoverflow.com/questions/5252099/redis-command-to-get-all-available-keys.

Get type of key: [`TYPE <key>`](https://redis.io/commands/type/). It returns 'none' when the key does not exist.

Delete a key: [`DEL key1 key2 ...`](https://redis.io/commands/del/).
