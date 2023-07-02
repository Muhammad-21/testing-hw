// import {it, describe, expect} from '@jest/globals'
import {render, screen } from "@testing-library/react";
import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Application } from "../../src/client/Application";
import '@testing-library/jest-dom/extend-expect';

const basename = '/'
const initState = { cart: {} }
const store = createStore(() => initState);

describe("Навигация по сайту", () => {
    it("В шапке отображаются ссылки на страницы магазина, а также ссылка на корзину", () => {

        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </BrowserRouter>
        );

        const catalog = screen.queryByRole('link', {name: /catalog/i})
        const delivery = screen.queryByRole('link', {name: /delivery/i})
        const contacts = screen.queryByRole('link', {name: /contacts/i})
        const cart = screen.queryByRole('link', {name: /cart/i})

        expect(catalog).toBeInTheDocument()
        expect(catalog).toHaveAttribute('href', '/catalog')

        expect(delivery).toBeInTheDocument()
        expect(delivery).toHaveAttribute('href', '/delivery')

        expect(contacts).toBeInTheDocument()
        expect(contacts).toHaveAttribute('href', '/contacts')

        expect(cart).toBeInTheDocument()
        expect(cart).toHaveAttribute('href', '/cart')
    });

    it('Название магазина в шапке должно быть ссылкой на главную страницу', ()=> {

        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </BrowserRouter>
        );

        const title = screen.queryByRole('link', {name: /Example store/i})

        expect(title).toHaveAttribute('href', '/')
    });
});