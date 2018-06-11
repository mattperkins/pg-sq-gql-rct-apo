import Sequelize from 'sequelize'

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

