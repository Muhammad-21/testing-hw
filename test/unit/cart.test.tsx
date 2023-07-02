// import {describe, expect, it} from '@jest/globals'
import {render, fireEvent, screen} from '@testing-library/react'
import {Provider} from "react-redux";
import React, {ReactNode} from "react";
import { createStore } from 'redux';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import {Application} from "../../src/client/Application";
import {ExampleApi, LOCAL_STORAGE_CART_KEY} from "../../src/client/api";
import { initStore } from '../../src/client/store';
import {Cart} from "../../src/client/pages/Cart";
import {CartState} from "../../src/common/types";
import {CartApi, MockedExampleApi} from "./mockedApi";
import {Product} from "../../src/client/pages/Product";
import {Route} from "react-router";

const basename = '/'
const api = new MockedExampleApi(basename) as any;
const cart = new CartApi();
export const mockedStore = initStore(api, cart);

export const Wrapper = (props: {children: ReactNode}) => {
    return (
        <BrowserRouter basename={basename}>
            <Provider store={mockedStore}>
                {props.children}
            </Provider>
        </BrowserRouter>
    )
}

describe('Корзина товаров', () => {
    it('Товар добавляется в корзину при нажатии на кнопку Add to cart', async () => {
        const id = 0 //bug_id=7
        render(
            <MemoryRouter initialEntries={[`/catalog/${id}`]}>
                <Route path={'/catalog/:id'}>
                    <Product/>
                </Route>
            </MemoryRouter>,
            {wrapper: Wrapper}
        )

        await new Promise(process.nextTick);

        fireEvent.click(screen.getByRole('button', {name: 'Add to Cart'}));

        expect(mockedStore.getState().cart[0]).not.toBeUndefined()

    })

    it('В шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', () => {
        const initState = {
            cart: {
                1:{ name: "товар1", price: 100, count: 3},
                2:{ name: "товар2", price: 100, count: 1 },
            },
            products: [
                { id: 1, name: "товар1", price: 100 },
                { id: 2, name: "товар2", price: 100 },
            ]
        }

        const store = createStore(() => initState);

        render(
            <MemoryRouter initialEntries={['/cart']}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        )

        expect(screen.queryByRole('link', { name: /Cart \(2\)/i})).toBeInTheDocument();
    })

    it('В корзине должна отображаться таблица с добавленными в нее товарами', () => {
        const initState = {
            cart: {
                1:{ name: "товар1", price: 100, count: 3},
                2:{ name: "товар2", price: 100, count: 1 },
            },
            products: [
                { id: 1, name: "товар1", price: 100 },
                { id: 2, name: "товар2", price: 100 },
            ]
        }

        const store = createStore(() => initState);

        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        )

        expect(screen.queryByTestId('1')).toBeInTheDocument()
        expect(screen.queryByTestId('2')).toBeInTheDocument()
    })

    it('Для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа', () => {
        const initState = {
            cart: {
                1:{ name: "товар1", price: 150, count: 4},
                2:{ name: "товар2", price: 200, count: 5 },
            },
            products: [
                { id: 1, name: "товар1", price: 150 },
                { id: 2, name: "товар2", price: 200},
            ]
        }

        const store = createStore(() => initState);

        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        )

        expect(screen.queryByText('товар1')).toBeInTheDocument()
        expect(screen.queryByText('4')).toBeInTheDocument()
        expect(screen.queryByText('$150')).toBeInTheDocument()
        expect(screen.queryByText('$600')).toBeInTheDocument()

        expect(screen.queryByText('товар2')).toBeInTheDocument()
        expect(screen.queryByText('5')).toBeInTheDocument()
        expect(screen.queryByText('$200')).toBeInTheDocument()
        expect(screen.queryByText('$1000')).toBeInTheDocument()

        expect(screen.queryByText('$1600')).toBeInTheDocument()
    })

    it('В корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', () => {
        const cart = {
            getState: () => ({
                1:{ name: "товар1", price: 150, count: 4},
                2:{ name: "товар2", price: 200, count: 5 },
            }),
            setState(cart: CartState) {
                localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
            }
        }
        const api = new ExampleApi('/');

        const store = initStore(api, cart);

        render(
            <MemoryRouter initialEntries={['/cart']}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        )

        fireEvent.click(screen.getByRole('button', {name: 'Clear shopping cart'}));

        expect(screen.queryByRole("table")).not.toBeInTheDocument();
    })

    it('Если корзина пустая, должна отображаться ссылка на каталог товаров', () => {
        const initState = {
            cart: {}
        }

        const store = createStore(()=>initState)

        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        )

        expect(screen.queryByRole('link', {name: 'catalog'})).toHaveAttribute('href', '/catalog')
    })
})
