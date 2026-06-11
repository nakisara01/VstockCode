import YahooFinance from 'yahoo-finance2';
const yahooFinance = new (YahooFinance as any)({ suppressNotices: ['yahooSurvey'] });

async function run() {
    try {
        const quote = await yahooFinance.quote('AAPL');
        console.log('Quote keys:', Object.keys(quote));
        console.log('Market Cap:', quote.marketCap);
        console.log('PE:', quote.trailingPE);
        console.log('52w High/Low:', quote.fiftyTwoWeekHigh, quote.fiftyTwoWeekLow);
        
        const chart = await yahooFinance.chart('AAPL', { period1: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), interval: '1d' });
        console.log('Chart quotes length:', chart.quotes.length);
        console.log('Chart sample:', chart.quotes[0]);
    } catch (e) {
        console.error('error:', e);
    }
}
run();
