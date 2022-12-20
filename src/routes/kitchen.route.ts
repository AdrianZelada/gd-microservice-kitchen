import { Request, Response, Router } from "express";
import { RecipeStore } from "../repository/recipes";
import { OrderService } from "../services/order.service";
export default function KitchenRoute(router: Router) {

    router.get('/', (req: Request, res: Response) => {
        RecipeStore.getRandomRecipe().then((result: any) => {   
            res.statusCode = 200;
            res.json({
                ...result
            })
        })
    });


    
    router.get('/getOrder', (req: Request, res: Response) => {
        const orderService = OrderService.getInstance();
        RecipeStore.getRandomRecipe().then((result: any) => {   
            orderService.add(result).then((orderItem: any)=>{
                res.statusCode = 200;
                res.json({
                    ...orderItem
                });
            }) 
        });
    });
    
    return router;
}