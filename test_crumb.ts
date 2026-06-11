import yahooFinanceModule from 'yahoo-finance2';
const YahooFinanceClass = yahooFinanceModule.default || yahooFinanceModule;
const yahooFinance = new (YahooFinanceClass as any)();

async function run() {
    try {
        const result = await yahooFinance.quoteSummary('AAPL', { modules: ['price'] });
        console.log(result.price.regularMarketPrice);
    } catch (e) {
        console.error(e.message);
    }
}
run();
