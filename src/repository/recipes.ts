const recipes = [
    { id: 1, name: 'Recipe 1',  tomato: 2, lemon: 1, potato: 0, rice: 1, ketchup: 0, lettuce: 1, onion: 0, cheese: 0, meat: 0, chicken: 1 },
    { id: 2, name: 'Recipe 2',  tomato: 1, lemon: 0, potato: 2, rice: 0, ketchup: 0, lettuce: 0, onion: 1, cheese: 0, meat: 1, chicken: 0 },
    { id: 3, name: 'Recipe 3',  tomato: 0, lemon: 1, potato: 0, rice: 1, ketchup: 1, lettuce: 1, onion: 0, cheese: 0, meat: 0, chicken: 1 },
    { id: 4, name: 'Recipe 4',  tomato: 2, lemon: 0, potato: 2, rice: 0, ketchup: 0, lettuce: 0, onion: 1, cheese: 1, meat: 1, chicken: 0 },
    { id: 5, name: 'Recipe 5',  tomato: 2, lemon: 1, potato: 2, rice: 0, ketchup: 0, lettuce: 2, onion: 2, cheese: 0, meat: 0, chicken: 1 },
    { id: 6, name: 'Recipe 6',  tomato: 2, lemon: 1, potato: 2, rice: 1, ketchup: 0, lettuce: 0, onion: 2, cheese: 1, meat: 0, chicken: 0 },
]

const getRecipes =async () => {
    return Promise.resolve(recipes);
}

const getRecipe = async (id: number) => {
    return Promise.resolve(recipes[id-1]);
};

const getRandomId = async () =>{
    const random = Math.floor(Math.random() * ((recipes.length + 1) - 1)) + 1;
    return Promise.resolve(random);        
}
const getRandomRecipe = async () => {
    return getRandomId().then((id) => {
        return getRecipe(id)
    })
}

export const RecipeStore = {
    getRecipes,
    getRecipe,
    getRandomId,
    getRandomRecipe
}