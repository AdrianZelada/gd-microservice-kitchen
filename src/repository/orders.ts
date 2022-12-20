const { DataTypes } = require("sequelize");

export class OrderModel {

    connection: any = null;
    model: any = null;

    constructor(connection: any){
        this.connection = connection;
        this.model = this.connection.define('order', {         
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

    async add(recipe: any) {        
        const value = await this.model.create({
            ...recipe
        })        
        return JSON.parse(JSON.stringify(value));
    }

    async update(id: string, status: string) {
        return this.model.update({
            status: status
        },{
            where:{
                id:id
            }
        });
    }

    async getAll(){
        const response =  await this.model.findAll();
        return JSON.parse(JSON.stringify(response));
    }

}