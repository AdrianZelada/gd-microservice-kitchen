import axios  from 'axios';

const Warehouse = {
    getIngredients: (recipe: any)=>{
        return axios.post(`http://${process.env.SERVER_WAREHOUSE}/warehouse`, {...recipe})
    }
}

export const WarehouseService = Warehouse;