const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema} = require('graphql')
const Db = require('./db')

// Models
const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'This represents a Person',
    fields: ()=>{
        return {
            id:{
                type: GraphQLInt,
                resolve(person){
                    return person.id
                }
            },
            firstName:{
                type: GraphQLString,
                resolve(person){
                    return person.firstName
                }
            },
            lastName:{
                type: GraphQLString,
                resolve(person){
                    return person.lastName
                }
            },
            email:{
                type: GraphQLString,
                resolve(person){
                    return person.email
                }
            },
            posts:{
                type: new GraphQLList(Post),
                resolve(person){
                    // Provided by sequelize due to relationships in database
                    // (see "Define table relationships" comment in db.js)
                    return person.getPosts()
                }
            }
        }
    }
})

const Post = new GraphQLObjectType({
     name: 'Post',
     description: 'This is a Post',
     fields: ()=>{
         return{
            id: {
                type: GraphQLInt,
                resolve(person){
                    return person.id
                }
            },
            title: {
                type: GraphQLString,
                resolve(post){
                    return post.title
                }
            },
            content: {
                type: GraphQLString,
                resolve(post){
                    return post.content
                }
            },
            person:{
                type: Person,
                resolve(post){
                    // Provided by sequelize due to relationships in database
                    // (see "Define table relationships" comment in db.js)
                    return post.getPerson()
                }
            }           
         }
     }
})

// Query
const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'This is a root query',
    fields: ()=>{
        return{
            people:{
                type: new GraphQLList(Person),
                args:{
                    id:{
                        type: GraphQLInt
                    },
                    email:{
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return Db.models.person.findAll({where: args})
                }
            },
            posts:{
                type: new GraphQLList(Post),
                resolve(root, args){
                    return Db.models.post.findAll({where: args})
                }
            }
        }
    }
})

const Schema = new GraphQLSchema({
    query: Query
})

module.exports = Schema