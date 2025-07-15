---
title: MongoDB
---

https://www.mongodb.com/

## Install on macOS with Homebrew

https://github.com/mongodb/homebrew-brew

Follow these instructions: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/

```
brew tap mongodb/brew
brew update
brew install mongodb-community
```

You can also do `brew install mongodb-community@5.0` which allows you to "maintain multiple versions of MongoDB side by side".

Output of `brew install mongodb-community`:

```
To start mongodb/brew/mongodb-community now and restart at login:
  brew services start mongodb/brew/mongodb-community
Or, if you don't want/need a background service you can just run:
  mongod --config /usr/local/etc/mongod.conf
```

## Start/stop

With Brew:

```shell
brew services start mongodb/brew/mongodb-community
brew services stop mongodb/brew/mongodb-community
brew services list
```

## Shell `mongosh`

https://www.mongodb.com/docs/mongodb-shell/

If you do `mongo` it says:

```
Warning: the "mongo" shell has been superseded by "mongosh",
which delivers improved usability and compatibility.The "mongo" shell has been deprecated and will be removed in
an upcoming release.
For installation instructions, see
https://docs.mongodb.com/mongodb-shell/install/
```

(Note that it comes with the Homebrew installation, no need to install it separately - [source](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#installing-mongodb-5.0-edition-edition).)

Connect to a container and use `mongosh`:

```shell
docker exec -it <container> mongosh
```

### Shell commands

Reference: https://www.mongodb.com/docs/mongodb-shell/reference/methods/

`help`: lists commands

`db`: the current database

`show dbs`/`show databases`: list databases

`use <dbname>`: crate a new database and switch to it

`show collections`

`db.users.insert({...})`: Collection.insert() is deprecated. Use insertOne, insertMany, or bulkWrite

`db.users.insertOne({ _id: ObjectId("5d9e690ad76fe06a3d7ae416"), email : "a@b.c" })`

`db.users.update({...}, {...})`: updates matching docs with the 2nd parameter values

`db.users.delete({...})`: removes matching docs

`db.users.deleteMany({})`: removes _all_ documents in the users collection

Note that Collection.remove() is deprecated. Use deleteOne, deleteMany, findOneAndDelete, or bulkWrite

`db.users.find()`: returns array

`db.users.find({_id: ObjectId("62ceb24066844a5c4de433f5")})`: returns array

`db.users.findOne({_id: ObjectId("62ceb24066844a5c4de433f5")})`: returns single item

## Schema design

https://learn.mongodb.com/courses/schema-design-patterns-and-antipatterns

https://learn.mongodb.com/courses/relational-to-document-model
