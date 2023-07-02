import { render, screen} from '@testing-library/react'
import {Provider} from "react-redux";
import React from "react";
import { createStore } from 'redux';
import {Catalog} from "../../src/client/pages/Catalog";
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import {Application} from "../../src/client/Application";
import {bug_id} from "../hermione/bugId"
import {ExampleStore} from "../../src/server/data";

const basename = '/'

describe('Каталог товаров', () => {
    it ('В каталоге должны отображаться товары, список которых приходит с сервера', ()=> {
        const initState = {
            cart: {},
            products: [
                { id: 1, name: "товар1", price: 100 },
                { id: 2, name: "товар2", price: 100 },
            ]
        }
        const store = createStore(() => initState);

        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        )

        expect(screen.queryByRole('heading', {name: 'товар1'})).toBeInTheDocument()

        expect(screen.queryByRole('heading', {name: 'товар2'})).toBeInTheDocument()
    })

    it ('Для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', async ()=> {
        console.log(bug_id)
        const products = new ExampleStore().getAllProducts(Number(bug_id)); //bud_id=1
        const initState = {
            cart: {},
            products: [
                { ...products[0], id: 1, name: products[0].name ? "товар1" : undefined, price: products[0].price ? 100 : undefined},
                { ...products[1], id: 2, name: products[1].name ? "товар2" : undefined, price: products[1].price ? 300 : undefined},
            ]
        }
        const store = createStore(() => initState);

        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        )

        expect(screen.queryByText('товар1')).not.toBeNull()
        expect(screen.queryByText('$100')).toBeInTheDocument()

        expect(screen.queryByText('товар2')).not.toBeNull()
        expect(screen.queryByText('$300')).toBeInTheDocument()

        expect(screen.queryAllByRole('link', {name: /Details/i})).toHaveLength(2)
    })

    it('на странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', () => {
        const initState = {
            cart: {},
            products: [
                { id: 1, name: "товар1", price: 100 },
            ],
            details: {
                1: {
                    id: 1,
                    name: "товар1",
                    price: 100,
                    description: "Крутой товар",
                    material: "Рубироид",
                    color: "красный",
                }}
        }
        const store = createStore(() => initState);

        render(
            <MemoryRouter initialEntries={['/catalog/1']}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        )

        expect(screen.queryByRole('heading', {name: 'товар1'})).toBeInTheDocument()
        expect(screen.queryByText('$100')).toBeInTheDocument()
        expect(screen.queryByText('Крутой товар')).toBeInTheDocument()
        expect(screen.queryByText('Рубироид')).toBeInTheDocument()
        expect(screen.queryByText('красный')).toBeInTheDocument()
        expect(screen.queryByText('Add to Cart')).toBeInTheDocument()
    })

    it ('Если товар уже добавлен в корзину, в каталоге должно отображаться сообщение об этом', () => {
        const initState = {
            cart: {1: {}},
            products: [
                { id: 1, name: "товар1", price: 100 },
                { id: 2, name: "товар2", price: 100 },
            ],
            details: {
                1: {
                    id: 1,
                    name: "товар1",
                    price: 100,
                    description: "Крутой товар",
                    material: "Рубироид",
                    color: "красный",
                }}
        }
        const store = createStore(() => initState);

        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        )

        expect(screen.queryByText('Item in cart')).toBeInTheDocument()
    })
    it ('Если товар уже добавлен в корзину, в странице товара должно отображаться сообщение об этом', () => {
        const initState = {
            cart: {1: {}},
            products: [
                { id: 1, name: "товар1", price: 100 },
                { id: 2, name: "товар2", price: 100 },
            ],
            details: {
                1: {
                    id: 1,
                    name: "товар1",
                    price: 100,
                    description: "Крутой товар",
                    material: "Рубироид",
                    color: "красный",
                }}
        }
        const store = createStore(() => initState);

        render(
            <MemoryRouter initialEntries={['/catalog/1']}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        )

        expect(screen.queryByText('Item in cart')).toBeInTheDocument()
    })
})