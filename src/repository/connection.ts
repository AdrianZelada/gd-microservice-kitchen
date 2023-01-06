import { Sequelize} from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB_NAME || 'give_dish',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || 'sample',
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);

sequelize.authenticate().then(() => {
    console.error('Connection has been established successfully.');      
}).catch(e => {
    console.error('Unable to connect to the database:', e); 
    process.exit(0)}
    );

export default sequelize;
