// import {it, describe, expect} from '@jest/globals'
import {render, screen } from "@testing-library/react";
import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import '@testing-library/jest-dom/extend-expect';
import {Home} from "../../src/client/pages/Home";
import {Catalog} from "../../src/client/pages/Catalog";
import {Delivery} from "../../src/client/pages/Delivery";
import {Contacts} from "../../src/client/pages/Contacts";
import {Cart} from "../../src/client/pages/Cart";

const initState = { cart: {} }
const store = createStore(() => initState);

describe('В магазине должны быть страницы: главная, каталог, условия доставки, контакты, корзина', () => {
    it('Главная страница', () => {
        render(
            <BrowserRouter basename={'/'}>
                <Provider store={store}>
                    <Home/>
                </Provider>
            </BrowserRouter>
        )

        expect(screen.queryByRole('heading', {name: 'Quickly'})).toBeInTheDocument()
    })

    it('Каталог страница', () => {
        render(
            <BrowserRouter basename={'/'}>
                <Provider store={store}>
                    <Catalog/>
                </Provider>
            </BrowserRouter>
        )

        expect(screen.queryByRole('heading', {name: 'Catalog'})).toBeInTheDocument()
    })

    it('Условиия доставки страница', () => {
        render(
            <BrowserRouter basename={'/'}>
                <Provider store={store}>
                    <Delivery/>
                </Provider>
            </BrowserRouter>
        )

        expect(screen.queryByRole('heading', {name: 'Delivery'})).toBeInTheDocument()
    })

    it('Контакты страница', () => {
        render(
            <BrowserRouter basename={'/'}>
                <Provider store={store}>
                    <Contacts/>
                </Provider>
            </BrowserRouter>
        )

        expect(screen.queryByRole('heading', {name: 'Contacts'})).toBeInTheDocument()
    })

    it('Корзина страница', () => {
        render(
            <BrowserRouter basename={'/'}>
                <Provider store={store}>
                    <Cart/>
                </Provider>
            </BrowserRouter>
        )

        expect(screen.queryByRole('heading', {name: 'Shopping cart'})).toBeInTheDocument()
    })
})