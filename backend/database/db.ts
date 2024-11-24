import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5433', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '1212',
    database: process.env.DB_NAME || 'DealLine',
    logging: false,
})

export default sequelize