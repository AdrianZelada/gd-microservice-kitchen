import { Axios } from 'axios';

const Warehouse = {
    getIngredients: (recipe: any)=>{
        const axios = new Axios();
        return axios.post(`${process.env.SERVER_WAREHOUSE}/getIngredients`, recipe)
    }
}

export const WarehouseService = Warehouse;