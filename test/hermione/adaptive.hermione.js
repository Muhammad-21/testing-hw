const { bug_id } = require('./bugId');
const {commerce} = require("faker");

const generateMockedProducts = () => {
    const products = []

    for(let id = 0; id < 27; id++) {
        products.push({
            id,
            name: "товар " + id,
            price: 100,
            description: "Крутой товар " + id,
            material: "Рубироид",
            color: "красный",
        });
    }

    return products;
}

const mockedOneProduct = {
    id: 1,
    name: "товар1",
    price: 100,
    description: "Крутой товар",
    material: "Рубироид",
    color: "красный",
}

const onRequestHandler = (request) => {
    switch (request.url()) {
        case 'http://localhost:3000/hw/store/api/products/1': {
            request.respond({
                content: 'application/json',
                headers: {"Access-Control-Allow-Origin": "*"},
                body: JSON.stringify(mockedOneProduct)
            })
            break;
        }
        case 'http://localhost:3000/hw/store/api/products': {
            request.respond({
                content: 'application/json',
                headers: {"Access-Control-Allow-Origin": "*"},
                body: JSON.stringify(generateMockedProducts())
            })
            break;
        }
        default: request.continue({});
    }
}

module.exports = {onRequestHandler}

describe("Адаптивность", async function () {
    describe('Страница товара', function () {
        it("вёрстка должна адаптироваться под ширину экрана 1100px", async ({browser}) => { //bug_id=9
            const puppeteer = await browser.getPuppeteer();
            const [page] = await puppeteer.pages();
            await page.setViewport({width: 1100, height: 1080});

            await page.setRequestInterception(true);

            page.on('request', onRequestHandler);
            await page.goto('http://localhost:3000/hw/store/catalog/1' + (bug_id ? `?bug_id=${bug_id}` : ''));
            await browser.assertView('product page 1100px width', '.Application')
        });

        it("вёрстка должна адаптироваться под ширину экрана 800px", async ({browser}) => {
            const puppeteer = await browser.getPuppeteer();
            const [page] = await puppeteer.pages();
            await page.setViewport({width: 800, height: 1080});

            await page.goto('http://localhost:3000/hw/store/catalog/1' + (bug_id ? `?bug_id=${bug_id}` : ''));
            await browser.assertView('product page 800px width', '.Application')
        });

        it("вёрстка должна адаптироваться под ширину экрана 700px", async ({browser}) => {
            const puppeteer = await browser.getPuppeteer();
            const [page] = await puppeteer.pages();
            await page.setViewport({width: 700, height: 1080});

            await page.goto('http://localhost:3000/hw/store/catalog/1' + (bug_id ? `?bug_id=${bug_id}` : ''));
            await browser.assertView('product page 700px width', '.Application')
        });

        it("вёрстка должна адаптироваться под ширину экрана 570px", async ({browser}) => {
            const puppeteer = await browser.getPuppeteer();
            const [page] = await puppeteer.pages();
            await page.setViewport({width: 570, height: 1080});

            await page.goto('http://localhost:3000/hw/store/catalog/1' + (bug_id ? `?bug_id=${bug_id}` : ''));
            await browser.assertView('product page 570px width', '.Application')
        });
    });

    describe('Страница каталога', function () {
        const assertViewOpt = { screenshotDelay: 1000 }
        it("вёрстка должна адаптироваться под ширину экрана 1100px", async ({browser}) => { //bug_id=9
            const puppeteer = await browser.getPuppeteer();
            const [page] = await puppeteer.pages();
            await page.setViewport({width: 1100, height: 6000});
            await page.setRequestInterception(true);

            page.on('request', onRequestHandler);

            await page.goto('http://localhost:3000/hw/store/catalog/' + (bug_id ? `?bug_id=${bug_id}` : ''));
            await browser.assertView('product page 1100px width', '.Application', assertViewOpt)
        });

        it("вёрстка должна адаптироваться под ширину экрана 800px", async ({browser}) => {
            const puppeteer = await browser.getPuppeteer();
            const [page] = await puppeteer.pages();
            await page.setViewport({width: 800, height: 6000});

            await page.goto('http://localhost:3000/hw/store/catalog/' + (bug_id ? `?bug_id=${bug_id}` : ''));
            await browser.assertView('product page 800px width', '.Application', assertViewOpt)
        });

        it("вёрстка должна адаптироваться под ширину экрана 700px", async ({browser}) => {
            const puppeteer = await browser.getPuppeteer();
            const [page] = await puppeteer.pages();
            await page.setViewport({width: 700, height: 6000});

            await page.goto('http://localhost:3000/hw/store/catalog/' + (bug_id ? `?bug_id=${bug_id}` : ''));
            await browser.assertView('product page 700px width', '.Application', assertViewOpt)
        });

        it("вёрстка должна адаптироваться под ширину экрана 570px", async ({browser}) => {
            const puppeteer = await browser.getPuppeteer();
            const [page] = await puppeteer.pages();
            await page.setViewport({width: 570, height: 15000});

            await page.goto('http://localhost:3000/hw/store/catalog/' + (bug_id ? `?bug_id=${bug_id}` : ''));
            await browser.assertView('product page 570px width', '.Application', {screenshotDelay: 2000})
        });
    });
})