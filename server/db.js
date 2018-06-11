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