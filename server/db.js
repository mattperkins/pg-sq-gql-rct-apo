import Sequelize from 'sequelize'
import _ from 'lodash'
import Faker from 'faker'

const Connection = new Sequelize(
    'relay',
    'postgres',
    'postgres',
    {
        dialect: 'postgres',
        host: 'localhost'
    }
)

// Define Postgres tables
const Person = Connection.define('person', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        // Sequelize built in validator
        validate:{
            isEmail: true
        }
    },
})

const Post = Connection.define('post', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

// Define table relationships
Person.hasMany(Post)
Post.hasMany(Person)


// Open connection to db and install/sync tables

// Each time App runs : reinitialise tables
Connection.sync({force: true}).then(()=> {

    // add fixtures using the "lodash utility belt" 
    // add 10 new users at a time
    _.times(10, ()=> {
        return Person.create({
            // seed the db with test data (Faker)
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
            email: Faker.internet.email(),
        })
    })

})

export default Connection
