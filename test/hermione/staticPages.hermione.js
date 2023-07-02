const { bug_id } = require('./bugId');

describe('Страницы главная, доставка и контакты имеют статическое содержимое', () => {
    it('home', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages()

        await page.goto('http://localhost:3000/hw/store' + (bug_id ? `?bug_id=${bug_id}` : ''));
        await browser.pause(1000);
        await browser.assertView('home', 'body')
    });

    it('delivery', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages()

        await page.goto('http://localhost:3000/hw/store/delivery' + (bug_id ? `?bug_id=${bug_id}` : ''));
        await browser.pause(1000);
        await browser.assertView('delivery', 'body')
    });

    it('contacts', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages()

        await page.goto('http://localhost:3000/hw/store/contacts' + (bug_id ? `?bug_id=${bug_id}` : ''));
        await browser.pause(1000);
        await browser.assertView('contacts', 'body')
    });
})