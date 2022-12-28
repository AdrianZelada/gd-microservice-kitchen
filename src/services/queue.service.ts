import { WarehouseService } from "./warehouse.service";
import { OrderService } from "./order.service";
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
        const orderService = OrderService.getInstance();

        if(queue.length > 0){
            this.isBusy =true;
            const order = {
                orderId: queue[0].id,
                ingredients: {
                    ...queue[0]
                }
            }

            delete order.ingredients.id;
            WarehouseService.getIngredients(order).then((response: any) => {
                const {data} = response;
                this.db.dequeue(data.orderId).then(() => {
                    orderService.update(data.orderId, 'resolved').then(() =>{
                        this.cookingOrder();
                    });
                })
            }).catch(e => {
                console.error(e);
            });
        } else {
            this.isBusy = false;
        }
    }

    async getAll() {
        return this.db.getAll();
    }
}
