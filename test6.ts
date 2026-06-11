import yahooFinance from 'yahoo-finance2';
const yf = new (yahooFinance as any)();
console.log('yf.quote:', typeof yf.quote);
