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
        console.log("recipe")
        console.log(recipe)
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

            console.log("order");
            console.log(order)
            WarehouseService.getIngredients(order).then((response: any) => {
                console.log("response");
                console.log(response)
                const {data} = response;
                this.db.dequeue(data.orderId).then(() => {
                    orderService.update(data.orderId, 'resolved').then(() =>{
                        this.cookingOrder();
                    });
                })
            }).catch(e => {
                console.error("Asdasdasdas");
                console.error(e);
            });
            // buildOrder(order, 
            //     (itemBought: any)=>{
            //         return purchaseHistoryService.add({
            //             ...itemBought,
            //             orderName: order.name
            //         });
            //     }
            //     ,() =>{
            //     this.db.dequeue(order.id).then(() => {
            //         orderService.update(order.id, 'resolved').then(() =>{
            //             this.cookingOrder();
            //         });
            //     })
            // });
        } else {
            this.isBusy = false;
        }
    }

    async getAll() {
        return this.db.getAll();
    }
}
