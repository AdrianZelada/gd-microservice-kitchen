const { DataTypes } = require("sequelize");

export class QueueModel {
    connection: any;
    model: any;

    constructor(connection: any){
        this.connection = connection;
        this.model = this.connection.define('queue', {         
            id:{
                type: DataTypes.STRING,
                primaryKey: true
            },   
            name:{
                type:DataTypes.STRING
            },
            status:{
                type:DataTypes.STRING
            },
            tomato:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            lemon:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            potato:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            rice:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            ketchup:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            lettuce:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            onion:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            cheese:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            meat:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            chicken:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
        },{
            createdAt: false,
            updatedAt: false,
        });
    }

    async enqueue(recipe: any) {        
        const value = await this.model.create({
            ...recipe
        })        
        return JSON.parse(JSON.stringify(value));
    }

    async dequeue(id: string) {
        return await this.model.destroy({
            where:{
                id:id
            }
        })
    }

    async getAll(){
        const response =  await this.model.findAll();
        return JSON.parse(JSON.stringify(response));
    }

}