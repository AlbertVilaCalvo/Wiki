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

```
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

### Shell commands

Reference: https://www.mongodb.com/docs/mongodb-shell/reference/methods/

`help`: lists commands

`db`: the current database

`show dbs`/`show databases`: list databases

`use <dbname>`: crate a new database and switch to it

`show collections`

`db.users.insert({...})`

`db.users.update({...}, {...})`: updates matching docs with the 2nd parameter values

`db.users.delete({...})`: removes matching docs

`db.users.deleteMany({})`

`db.users.find()`: returns array

`db.users.find({_id: ObjectId("62ceb24066844a5c4de433f5")})`: returns array

`db.users.findOne({_id: ObjectId("62ceb24066844a5c4de433f5")})`: returns single item
