# Node, Express, PostgreSQL, Sequelize, GraphQL, React, Apollo

CLIENT

# INSTALL 
## yarn 
# RUN 
## yarn start 
# ENDPOINTS 
## localhost:3000
# DEPLOY 
## npm build



SERVER

# INSTALL 
## yarn 
# RUN 
## nodemon server.js 
# ENDPOINTS 
## localhost: 4000
# DEPLOY 
## npm build



DATABASE

```
Spawn db:

$ node db.js 

```
run postgres server
psql databaseName
```

```
=# \d schema dump
=# \dt schema dump condensed
=# \l list all databases
```

```
=# select * from people;
```

```
=# select * from people where id=11;
```


# SCHEMA

# ENDPOINTS 
## localhost:4000/graphql

## QUERIES

```
{
    people{
        id
        firstName
        lastName
        email
    }
}
```

```
{
  people{
    id
    lastName
    firstName
    email
    posts{
        title
        content
    }
  }
}
```

```
{
  posts{
    title
    content
  }
}
```

```
{
  posts{
    title
  	content
    person{
      id
      firstName
      lastName
      email
    }
  }
}
```

## MUTATION

```
mutation addPerson {
  addPerson(firstName: "Fred", lastName: "Bloggs", email: "fred@bloggs.com"){
    id
  }
}
```