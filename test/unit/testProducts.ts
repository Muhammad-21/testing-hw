import { Product, ProductShortInfo } from "../../src/common/types";

const products: Product[] = [
    {
        id: 0,
        description: 'thing to play games',
        material: 'plastic',
        color: 'white',
        name: 'PS5',
        price: 200
    },
    {
        id: 1,
        description: 'thing to play games',
        material: 'plastic',
        color: 'green',
        name: 'X-box',
        price: 100
    }
]

export function getProducts(): ProductShortInfo[] {
    return products.map(product => ({id: product.id, name: product.name, price: product.price}));
}

export function getProductById(id: number): Product | undefined {
    return products.find(product => (product.id === id));
}