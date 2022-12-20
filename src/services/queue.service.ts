
// const { buildOrder } = require("../services/kichen.service");
const purchaseHistoryService = require('../services/purchase_history.service').getInstance();
const orderService = require('../services/order.service').getInstance();
export class QUeueService {
    static instance: QUeueService;
    db: any;
    isBusy: boolean = false;
    constructor(db: any) {
        if(QUeueService.instance) {
            return QUeueService.instance
        } else {
            this.db = db;
            this.isBusy = false;
            return this;
        }        
    }

    static configQueueService(db: any) {
        QUeueService.instance = new QUeueService(db);
    }

    static getInstance() {        
        return QUeueService.instance;
    }

    async enqueue(recipe: any) {
        this.db.enqueue(recipe).then(() => {
            if(!this.isBusy){
                this.cookingOrder();
            }
        });
        return await recipe;
    }

    async cookingOrder() {
        const queue = await this.db.getAll();
        if(queue.length > 0){
            this.isBusy =true;
            const order = queue[0];
            buildOrder(order, 
                (itemBought: any)=>{
                    return purchaseHistoryService.add({
                        ...itemBought,
                        orderName: order.name
                    });
                }
                ,() =>{
                this.db.dequeue(order.id).then(() => {
                    orderService.update(order.id, 'resolved').then(() =>{
                        this.cookingOrder();
                    });
                })
            });
        } else {
            this.isBusy = false;
        }
    }

    async getAll() {
        return this.db.getAll();
    }
}
