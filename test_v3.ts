import YahooFinance from 'yahoo-finance2';
const yahooFinance = new (YahooFinance as any)();

async function run() {
    try {
        const result = await yahooFinance.quote('AAPL');
        console.log('quote result:', result.regularMarketPrice);
    } catch (e) {
        console.error('error:', e.message);
    }
}
run();
