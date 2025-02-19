---
title: DynamoDB
---

https://aws.amazon.com/dynamodb

Developer guide - https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html

https://github.com/aws-samples/aws-dynamodb-examples

Tutorials - https://www.youtube.com/c/EnricoPortolan/search?query=dynamodb

Tutorial - Create and Query a NoSQL Table with Amazon DynamoDB - https://aws.amazon.com/tutorials/create-nosql-table/

Amazon DynamoDB Learning Plan - https://explore.skillbuilder.aws/learn/public/learning_plan/view/1840/amazon-dynamodb-learning-plan

https://www.dynamodbbook.com

On-demand price reduction - https://aws.amazon.com/about-aws/whats-new/2024/11/amazon-dynamo-db-reduces-prices-on-demand-throughput-global-tables/

:::important
Prefix the name of all your tables with the name of your application (eg todo-user instead of user) to prevent name clashes in the future.
:::

RCU means "Read Capacity Units".

## Characteristics

From https://aws.amazon.com/dynamodb, https://aws.amazon.com/dynamodb/features, https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html and https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SQLtoNoSQL.WhyDynamoDB.html.

- NoSQL.
- Key-value store with document support.
- Schemaless.
- Proprietary, closed source.
- Serverless: scales down to zero and up to nearly unlimited throughput and storage with automated horizontal scaling.
- Pay per use.
- Fully managed: no version upgrades, no maintenance windows, no patching and no downtime maintenance.
- Highly available.
- Highly durable.
- Multi-region and multi-active with [global tables](https://aws.amazon.com/dynamodb/global-tables).

## How it works

See [Core components of Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html).

To use DynamoDB, you don't write SQL; all operations are done using the [REST API](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/Welcome.html). Since the REST API is very [low-level](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.LowLevelAPI.html), typically you **write code** that uses the SDK in your application. You can also use the CLI and the web console.

Data is organized in tables. Each table has a name and contains a collection of items. Each item is a collection of one or more attributes. Each attribute is a key-value pair. Attribute values can be of the following types ([source](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes)):

- Scalar (single value): number (N), string (S), binary (B), Boolean (BOOL) and null (NULL).
- Multiple scalars (set): string set (SS), number set (NS), and binary set (BS).
- Document (like a JSON): list (L, an array) and map (M, an object).

Each table needs to have a primary key, specified when you create the table, which uniquely identifies each item in the table, so that no two items can have the same key. For example, if we have users, the primary key can be the user ID (aka simple). And if we have songs, the primary key can be the the artist name and the song title (composite). The primary key must be a scalar of type string, number or binary.

If the [primary key](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html#HowItWorks.CoreComponents.PrimaryKey) is composed of a single attribute (simple), it's called the partition key. If it's composed of two attributes (composite), one is the partition key (HASH) and the other is the sort key (RANGE). In a simple primary key, the partition key attribute must be unique. In a composite primary key, the partition key can be the same for multiple items, but two items cannot have both the same partition and sort key.

If the primary key is simple, we can only retrieve a single item by primary key, since each primary key identifies a single item. But if the primary key is composite, we can [query](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html) for multiple items by primary key. For example, in a songs table where the partition key is the artist name, we can get all the songs of an artist. And we can also use [filter expressions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.FilterExpression.html). The items will be ordered by the sort key.

(AWS in Action p. 348) The partition key can be queried only using exact matches (`=`). The sort key can be queried using `=`, `>`, `<`, `>=`, `<=`, and `BETWEEN x AND y` operators. For example, you can query the sort key of a partition key from a certain starting point. You cannot query only the sort key—you must always specify the partition key.

DynamoDB is schemaless. Other than the primary key, tables don't have a schema like a relational database; items are not required to have the same attributes.

There are two capacity modes: on demand and provisioned.

## Secondary indexes

https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SecondaryIndexes.html

Problem: you can only query using the primary key. For example, if you have a list of users, and each user has a country, you can't get all the users belonging to a country (unless you scan all the items and then filter). This can be solved with a global secondary index, an index with hash (primary key) and optionally range (sort key) different than the ones in the table, which allows you to query efficiently on an additional attribute. For example, you can create a global index on the country to get all the users belonging to a country.

> Global secondary indexes allow you to perform queries on attributes that are not part of the table's primary key.

Global secondary indexes are always eventually consistent, since that data needs to be copied (projected), which is an asynchronous process. You need to pay for the additional storage. You can project a subset of the attributes only.

Local secondary indexes use the same partition (hash) key, but a different range (sort) key. They are used to filter a query. In a local secondary index, the sort key value does not need to be unique for a given partition key value. They support strongly consistent reads.

> You could have an **Order History** table with a hash key of **customer id**, a primary range key of **order date**, and a secondary index range key on **order destination city**. You can use a Local Secondary Index to find all orders delivered to a particular city using a simple query for a given **customer id**.

- Difference between local and global indexes in DynamoDB - https://stackoverflow.com/questions/21381744/difference-between-local-and-global-indexes-in-dynamodb
- Announcement - https://aws.amazon.com/blogs/aws/now-available-global-secondary-indexes-for-amazon-dynamodb
- Local or global: Choosing a secondary index type in DynamoDB -

## CLI

https://awscli.amazonaws.com/v2/documentation/api/latest/reference/dynamodb/index.html

[Create table](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/dynamodb/create-table.html) with single primary key (aka partition key) `uid`:

```shell
aws dynamodb create-table --table-name todo-user \
 --attribute-definitions AttributeName=uid,AttributeType=S \
 --key-schema AttributeName=uid,KeyType=HASH \
 --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
```

Create table with a primary key consisting of a partition key `uid` and a sort key `tid`:

```shell
aws dynamodb create-table --table-name todo-task \
 --attribute-definitions AttributeName=uid,AttributeType=S \
 AttributeName=tid,AttributeType=N \
 --key-schema AttributeName=uid,KeyType=HASH \
 AttributeName=tid,KeyType=RANGE \
 --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
```

Creating a table can take some time. To check the table status use [describe-table](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/dynamodb/describe-table.html) (the value of `TableStatus` should be `ACTIVE`):

```shell
aws dynamodb describe-table --table-name todo-user
```

[Put item](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/dynamodb/put-item.html):

```shell
aws dynamodb put-item --table-name Users --item '{"Name": {"S": "Albert Einstein"}, "DOB": {"S": "1879-03-14"}}'
```

[Batch write items](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/dynamodb/batch-write-item.html). To put or delete (not update) multiple items in one or more tables.

```shell
aws dynamodb batch-write-item --request-items file://users.json
```

The json file is something like:

```json title="users.json"
{
  "users-table": [
    {
      "PutRequest": {
        "Item": {
          "userid": { "S": "497dcba3" },
          "created": { "S": "2022-01-01T10:00Z" },
          "email": { "S": "peter@example.com" },
          "gender": { "S": "Male" },
          "age": { "N": "37" }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "userid": { "S": "50e14f43" },
          "created": { "S": "2024-01-02T13:00Z" },
          "email": { "S": "laura@example.com" },
          "gender": { "S": "Female" },
          "age": { "N": "19" }
        }
      }
    }
  ]
}
```

There's an example [here](https://github.com/nealdct/aws-clf-code/blob/main/amazon-dynamodb/batch-write.json).

[Scan](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/dynamodb/scan.html):

```shell
aws dynamodb scan --table-name users
```

```shell
aws dynamodb scan \
    --table-name users \
    --filter-expression "gender = :g" \
    --expression-attribute-values '{":g":{"S":"Male"}}'
```

```shell
aws dynamodb scan \
    --table-name users \
    --filter-expression "age > :a" \
    --expression-attribute-values '{":a":{"N":"18"}}'
```

[Query](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/dynamodb/query.html):

```shell
aws dynamodb query \
    --table-name users \
    --key-condition-expression "userid = :uid" \
    --expression-attribute-values '{":uid":{"S":"50e14f43"}}'
```

See query with the sort key [here](https://github.com/nealdct/aws-clf-code/blob/main/amazon-dynamodb/create-table-add-data.md).

## Single table design

https://www.reddit.com/r/aws/comments/xq1p6s/comment/iq7m7g4/

When does single table design not make sense? - https://www.reddit.com/r/aws/comments/1hsohbz/dynamodb_when_does_single_table_design_not_make/
