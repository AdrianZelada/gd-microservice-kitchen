import { Request, Response, Router } from "express";
import { RecipeStore } from "../repository/recipes";
import { OrderService } from "../services/order.service";
import { QUeueService } from "../services/queue.service";

export default function KitchenRoute(router: Router) {

    router.get('/recipes', (req: Request, res: Response) => {
        RecipeStore.getRecipes().then((data: any) =>{
            res.json(data);
        })
    });

    router.get('/getOrder', (req: Request, res: Response) => {
        const orderService = OrderService.getInstance();
        const queueService = QUeueService.getInstance();
        RecipeStore.getRandomRecipe().then((result: any) => {   
            orderService.add(result).then((orderItem: any)=>{
                queueService.enqueue(orderItem).then((val) => {
                    console.log("kitchen");
                    res.statusCode = 200;
                    res.json({
                        ...val
                    });
                });
            }) 
        });
    });

    router.get('/orders', (req: Request, res: Response) => {
        const orderService = OrderService.getInstance();
        orderService.getAll().then((resp)=>{
            res.statusCode = 200;
            res.json(resp);
        }).catch(e=>{
            res.statusCode = 500;
            res.json({
                msg: JSON.stringify(e)
            })
        })
    });
    
    return router;
}