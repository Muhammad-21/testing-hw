import { CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo } from '../../src/common/types';
import { getProducts, getProductById } from './testProducts';

export class MockedExampleApi {
    constructor(private readonly basename: string) {

    }

    async getProducts() {
        return Promise.resolve({status: 200, data: getProducts()});
    }

    async getProductById(id: number) {
        return Promise.resolve({status: 200, data: getProductById(id)});
    }

    // async checkout(form: CheckoutFormData, cart: CartState) {
    //     return await axios.post<CheckoutResponse>(`${this.basename}/api/checkout`, { form, cart });
    // }
}

export const LOCAL_STORAGE_CART_KEY = 'example-store-cart';

export class CartApi {
    getState(): CartState {
        try {
            const json = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
            return JSON.parse(json || '') as CartState || {};
        } catch {
            return {};
        }
    }

    setState(cart: CartState) {
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    }
}