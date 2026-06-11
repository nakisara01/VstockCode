const yahooFinance = require('yahoo-finance2').default;
console.log('Keys:', Object.keys(yahooFinance || {}));
console.log('quote:', typeof yahooFinance?.quote);
