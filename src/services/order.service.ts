// const { generateUuid } = require("../services/utils");

import { uuidv4 } from './utils';
export class OrderService {
    static instance : OrderService;
    db:any;
    constructor(db :any) {
        if(OrderService.instance) {
            return OrderService.instance
        } else {
            this.db = db;            
            return this;
        }        
    }

    static configOrderService(db: any) {
        OrderService.instance = new OrderService(db);
    }

    static getInstance() {        
        return OrderService.instance;

    }

    async add(recipe: any) {
        recipe.id = uuidv4();
        recipe.status = 'pending';
        return this.db.add(recipe);
    }

    async update(id: string, status: string){
        return this.db.update(id, status);
    }

    async getAll() {
        return this.db.getAll();
    }
}
