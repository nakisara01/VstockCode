import yahooFinanceModule from 'yahoo-finance2';
console.log('Keys:', Object.keys(yahooFinanceModule));
console.log('default:', yahooFinanceModule.default);
if (yahooFinanceModule.default) {
    console.log('default keys:', Object.keys(yahooFinanceModule.default));
}
