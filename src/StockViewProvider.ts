import * as vscode from 'vscode';
import yahooFinanceModule from 'yahoo-finance2';
import { generateSparkline } from './utils';

const YahooFinanceClass = yahooFinanceModule.default || yahooFinanceModule;
export const yahooFinance = new (YahooFinanceClass as any)({
    suppressNotices: ['yahooSurvey']
});

function formatNumber(num: number | undefined): string {
    if (num === undefined || num === null) return 'N/A';
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toString();
}

function showAutoClosingNotification(message: string, timeoutMs: number = 5000) {
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: message,
        cancellable: false
    }, async () => {
        return new Promise(resolve => setTimeout(resolve, timeoutMs));
    });
}

export class StockViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'vstockcode.stockView';
    private _view?: vscode.WebviewView;
    private _updateIntervalId?: NodeJS.Timeout;

    constructor(private readonly _extensionUri: vscode.Uri) {}

    public resolveWebviewView(webviewView: vscode.WebviewView) {
        this._view = webviewView;
        webviewView.webview.options = { enableScripts: true };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(data => {
            switch (data.type) {
                case 'openFinance':
                    vscode.env.openExternal(vscode.Uri.parse(`https://finance.yahoo.com/quote/${data.value}`));
                    break;
                case 'removeSymbol':
                    {
                        const config = vscode.workspace.getConfiguration('vstockcode');
                        const symbols: string[] = config.get('symbols', []);
                        const newSymbols = symbols.filter(s => s !== data.value);
                        config.update('symbols', newSymbols, vscode.ConfigurationTarget.Global);
                        break;
                    }
                case 'refresh':
                    this.updatePrices(true);
                    break;
                case 'triggerAddSymbol':
                    vscode.commands.executeCommand('vstockcode.addSymbol', data.value);
                    break;
                case 'addAlert':
                    {
                        const config = vscode.workspace.getConfiguration('vstockcode');
                        const alerts: any[] = config.get('alerts', []);
                        alerts.push(data.value);
                        config.update('alerts', alerts, vscode.ConfigurationTarget.Global);
                        showAutoClosingNotification(`[VStockCode] Alert added for ${data.value.symbol} ${data.value.operator} ${data.value.price}`);
                        break;
                    }
                case 'showError':
                    showAutoClosingNotification(`[VStockCode Error] ${data.value}`);
                    break;
                case 'checkMarketHours':
                    {
                        const param = data.value.toLowerCase().trim();
                        const MARKETS: Record<string, any> = {
                            'korea': { name: 'Korea (KOSPI/KOSDAQ)', tz: 'Asia/Seoul', pre: [8, 30], start: [9, 0], end: [15, 30], after: [18, 0], lunch: null },
                            'america': { name: 'America (NYSE/NASDAQ)', tz: 'America/New_York', pre: [4, 0], start: [9, 30], end: [16, 0], after: [20, 0], lunch: null },
                            'us': { name: 'America (NYSE/NASDAQ)', tz: 'America/New_York', pre: [4, 0], start: [9, 30], end: [16, 0], after: [20, 0], lunch: null },
                            'usa': { name: 'America (NYSE/NASDAQ)', tz: 'America/New_York', pre: [4, 0], start: [9, 30], end: [16, 0], after: [20, 0], lunch: null },
                            'japan': { name: 'Japan (JPX)', tz: 'Asia/Tokyo', pre: null, start: [9, 0], end: [15, 0], after: null, lunch: [[11, 30], [12, 30]] },
                        };

                        const market = MARKETS[param];
                        if (!market) {
                            showAutoClosingNotification(`[VStockCode Error] Unknown market: '${param}'. Try korea, america, or japan.`);
                            break;
                        }

                        const dateString = new Date().toLocaleString("en-US", {timeZone: market.tz});
                        const tzDate = new Date(dateString);
                        
                        const day = tzDate.getDay();
                        const h = tzDate.getHours();
                        const m = tzDate.getMinutes();
                        
                        const isWeekend = (day === 0 || day === 6);
                        
                        const timeVal = h + m / 60;
                        const startVal = market.start[0] + market.start[1] / 60;
                        const endVal = market.end[0] + market.end[1] / 60;
                        
                        let isPre = market.pre ? (timeVal >= (market.pre[0] + market.pre[1]/60) && timeVal < startVal) : false;
                        let isAfter = market.after ? (timeVal >= endVal && timeVal < (market.after[0] + market.after[1]/60)) : false;
                        let isOpen = (timeVal >= startVal && timeVal < endVal);
                        
                        if (isOpen && market.lunch) {
                            const lunchStart = market.lunch[0][0] + market.lunch[0][1] / 60;
                            const lunchEnd = market.lunch[1][0] + market.lunch[1][1] / 60;
                            if (timeVal >= lunchStart && timeVal < lunchEnd) {
                                isOpen = false;
                            }
                        }
                        
                        let status = '🔴 CLOSED';
                        if (!isWeekend) {
                            if (isOpen) status = '🟢 Regular trading hours (RTH)';
                            else if (isPre) status = '🟡 Pre-market trading';
                            else if (isAfter) status = '🟡 After-market trading';
                        } else {
                            status = '🔴 CLOSED (Weekend)';
                        }
                        
                        const formatTime = (arr: number[]) => `${String(arr[0]).padStart(2, '0')}:${String(arr[1]).padStart(2, '0')}`;
                        let hoursStr = `${formatTime(market.start)}~${formatTime(market.end)}`;
                        if (market.lunch) {
                            hoursStr += ` (Lunch: ${formatTime(market.lunch[0])}~${formatTime(market.lunch[1])})`;
                        }
                        
                        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                        const currentStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')} (${weekdays[day]})`;
                        
                        showAutoClosingNotification(`[${market.name}] ${status} | Local Time: ${currentStr} | RTH: ${hoursStr}`);
                        break;
                    }
            }
        });

        const config = vscode.workspace.getConfiguration('vstockcode');
        const updateInterval = config.get<number>('updateInterval', 60);

        this.updatePrices(false);
        this._updateIntervalId = setInterval(() => this.updatePrices(false), updateInterval * 1000);

        webviewView.onDidDispose(() => {
            if (this._updateIntervalId) {
                clearInterval(this._updateIntervalId);
            }
        });
    }

    public async updatePrices(showNotification: boolean = false) {
        if (!this._view || !this._view.visible) return;

        const config = vscode.workspace.getConfiguration('vstockcode');
        const symbols: string[] = config.get('symbols', ['005930.KS']);
        const alerts: any[] = config.get('alerts', []);
        let alertsModified = false;

        try {
            const indexSymbols = ['^KS11', '^KQ11', '^GSPC', '^IXIC', '^DJI'];
            const indices = await Promise.all(indexSymbols.map(async symbol => {
                try {
                    const quote = await yahooFinance.quote(symbol);
                    return {
                        symbol: quote.shortName || symbol,
                        price: quote.regularMarketPrice?.toFixed(2) || 'N/A',
                        changeStr: quote.regularMarketChangePercent?.toFixed(2) || '0.00',
                        change: quote.regularMarketChangePercent || 0
                    };
                } catch (err) {
                    return null;
                }
            }));

            if (symbols.length === 0) {
                this._view.webview.postMessage({ type: 'update', data: [], indices: indices.filter(i => i) });
                return;
            }

            const results = await Promise.all(symbols.map(async symbol => {
                try {
                    const quote = await yahooFinance.quote(symbol);
                    
                    let sparkline = '';
                    try {
                        const chart = await yahooFinance.chart(symbol, { 
                            period1: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 
                            interval: '1d' 
                        });
                        const prices = chart.quotes.map(q => q.close).filter(c => c !== null) as number[];
                        sparkline = generateSparkline(prices);
                    } catch (e) {
                        // ignore
                    }

                    alerts.forEach(alert => {
                        if (alert.symbol.toUpperCase() === quote.symbol.toUpperCase() && !alert._delete) {
                            let triggered = false;
                            if (alert.operator === '>' && quote.regularMarketPrice && quote.regularMarketPrice >= alert.price) triggered = true;
                            if (alert.operator === '<' && quote.regularMarketPrice && quote.regularMarketPrice <= alert.price) triggered = true;
                            if (triggered) {
                                showAutoClosingNotification(`[VStockCode] 🚨 ${quote.symbol} ALERT! Price is ${quote.regularMarketPrice} (${alert.operator} ${alert.price})!`);
                                alert._delete = true;
                                alertsModified = true;
                            }
                        }
                    });

                    return {
                        symbol: quote.symbol,
                        name: quote.shortName || quote.symbol,
                        price: quote.regularMarketPrice?.toFixed(2) || 'N/A',
                        change: quote.regularMarketChangePercent || 0,
                        changeStr: quote.regularMarketChangePercent?.toFixed(2) || '0.00',
                        sparkline,
                        details: {
                            marketCap: formatNumber(quote.marketCap),
                            pe: quote.trailingPE?.toFixed(2) || 'N/A',
                            high52: quote.fiftyTwoWeekHigh?.toFixed(2) || 'N/A',
                            low52: quote.fiftyTwoWeekLow?.toFixed(2) || 'N/A',
                            volume: formatNumber(quote.regularMarketVolume)
                        }
                    };
                } catch (error: any) {
                    return {
                        symbol, name: symbol, price: 'Error', change: 0, changeStr: '0.00', sparkline: '', details: {}
                    };
                }
            }));

            if (alertsModified) {
                config.update('alerts', alerts.filter(a => !a._delete), vscode.ConfigurationTarget.Global);
            }

            this._view.webview.postMessage({ 
                type: 'update', 
                data: results, 
                indices: indices.filter(i => i),
                timestamp: new Date().toLocaleTimeString()
            });
            if (showNotification) {
                showAutoClosingNotification('Stock prices refreshed');
            }
        } catch (err) {
            console.error(err);
        }
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stock Monitor</title>
    <style>
        body {
            font-family: var(--vscode-editor-font-family, 'Courier New', monospace);
            font-size: var(--vscode-editor-font-size, 13px);
            color: var(--vscode-terminal-foreground, #cccccc);
            background-color: var(--vscode-terminal-background, #1e1e1e);
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            height: 100vh;
            box-sizing: border-box;
        }
        .ticker-header {
            display: flex;
            overflow: hidden;
            white-space: nowrap;
            padding: 6px 0;
            background-color: color-mix(in srgb, var(--vscode-terminal-background) 80%, white);
            border-bottom: 1px solid var(--vscode-terminal-border, rgba(128, 128, 128, 0.2));
            font-size: 0.9em;
        }
        .ticker-wrap {
            display: flex;
            width: max-content;
            animation: ticker 40s linear infinite;
        }
        .ticker-wrap:hover {
            animation-play-state: paused;
        }
        .ticker-part {
            display: flex;
            padding-right: 50px;
        }
        @keyframes ticker {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
        }
        .ticker-item {
            display: inline-flex;
            align-items: center;
            margin-right: 16px;
        }
        .ticker-symbol {
            color: var(--vscode-terminal-ansiCyan, #56b6c2);
            margin-right: 4px;
        }
        .ticker-price {
            margin-right: 4px;
        }
        #stock-list {
            flex: 1;
            overflow-y: auto;
            padding: 8px;
        }
        .table {
            display: table;
            width: 100%;
            border-collapse: collapse;
        }
        .header {
            display: table-row;
            font-weight: bold;
            color: var(--vscode-descriptionForeground);
            border-bottom: 1px dashed var(--vscode-descriptionForeground);
        }
        .header-cell {
            display: table-cell;
            padding: 4px 8px;
            text-align: left;
        }
        .header-cell.right {
            text-align: right;
        }
        .header-cell.center {
            text-align: center;
        }
        
        .stock-item {
            display: table-row;
            cursor: pointer;
        }
        .stock-item:hover {
            background-color: var(--vscode-list-hoverBackground);
        }
        .cell {
            display: table-cell;
            padding: 4px 8px;
            border-bottom: 1px solid rgba(128, 128, 128, 0.1);
            vertical-align: middle;
        }
        .cell.right {
            text-align: right;
        }
        .cell.center {
            text-align: center;
        }
        .stock-symbol {
            color: var(--vscode-terminal-ansiCyan, #56b6c2);
            font-weight: bold;
        }
        .stock-name {
            color: var(--vscode-terminal-ansiWhite, #abb2bf);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100px;
        }
        .stock-price {
            color: var(--vscode-terminal-ansiYellow, #e5c07b);
        }
        .sparkline {
            color: var(--vscode-terminal-ansiBlue, #61afef);
            letter-spacing: -1px;
            font-size: 1.1em;
        }
        
        .positive { color: var(--vscode-terminal-ansiGreen, #98c379); }
        .negative { color: var(--vscode-terminal-ansiRed, #e06c75); }
        .neutral { color: var(--vscode-descriptionForeground); }
        
        .arrow-up::before { content: '▲ '; }
        .arrow-down::before { content: '▼ '; }
        .arrow-neutral::before { content: '- '; }

        .selected {
            background-color: var(--vscode-list-activeSelectionBackground);
            color: var(--vscode-list-activeSelectionForeground);
        }
        .selected .stock-symbol, .selected .stock-name, .selected .stock-price {
            color: var(--vscode-list-activeSelectionForeground);
        }
        
        .link-btn, .delete-btn {
            background: none;
            border: none;
            color: var(--vscode-descriptionForeground);
            cursor: pointer;
            padding: 0 4px;
            font-size: 1.1em;
            opacity: 0;
            transition: opacity 0.1s;
        }
        .stock-item:hover .link-btn, .stock-item:hover .delete-btn {
            opacity: 1;
        }
        .link-btn:hover { color: var(--vscode-terminal-ansiCyan, #56b6c2); }
        .delete-btn:hover { color: var(--vscode-terminal-ansiRed, #e06c75); }

        /* Detail Row */
        .detail-row {
            display: none;
            background-color: color-mix(in srgb, var(--vscode-terminal-background) 95%, white);
        }
        .detail-row.open {
            display: table-row;
        }
        .detail-cell {
            padding: 8px 12px;
            font-size: 0.9em;
            color: var(--vscode-descriptionForeground);
            border-bottom: 1px dashed rgba(128, 128, 128, 0.3);
        }
        .detail-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
        }
        .detail-item strong {
            color: var(--vscode-terminal-foreground);
        }

        /* Cmd Line */
        .cmd-line {
            display: flex;
            align-items: center;
            padding: 8px;
            border-top: 1px dashed var(--vscode-descriptionForeground);
            background-color: color-mix(in srgb, var(--vscode-terminal-background, #1e1e1e) 90%, white);
            position: relative;
        }
        .prompt {
            color: var(--vscode-terminal-ansiGreen, #98c379);
            margin-right: 8px;
            font-weight: bold;
        }
        .autocomplete-container {
            flex: 1;
            position: relative;
            display: flex;
        }
        .autocomplete-menu {
            position: absolute;
            bottom: 100%;
            left: 0;
            width: 100%;
            background-color: var(--vscode-editorSuggestWidget-background);
            border: 1px solid var(--vscode-editorSuggestWidget-border);
            color: var(--vscode-editorSuggestWidget-foreground);
            box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.2);
            display: none;
            flex-direction: column;
            max-height: 150px;
            overflow-y: auto;
            z-index: 1000;
            margin-bottom: 4px;
        }
        .autocomplete-item {
            padding: 6px 12px;
            cursor: pointer;
        }
        .autocomplete-item.active {
            background-color: var(--vscode-editorSuggestWidget-selectedBackground);
            color: var(--vscode-editorSuggestWidget-selectedForeground);
        }
        .cmd-desc {
            color: var(--vscode-descriptionForeground);
            font-size: 0.9em;
            margin-left: 8px;
        }
        .autocomplete-item.active .cmd-desc {
            color: inherit;
            opacity: 0.8;
        }
        #cmd-input {
            flex: 1;
            background: transparent;
            border: none;
            color: var(--vscode-terminal-foreground, #cccccc);
            font-family: inherit;
            font-size: inherit;
            outline: none;
        }
    </style>
</head>
<body>
    <div id="ticker-container" class="ticker-header" style="display:none;"></div>
    
    <div id="stock-list">
        <div class="table" id="stock-table">
            <div style="padding: 20px; color: var(--vscode-descriptionForeground);">Loading terminal data...</div>
        </div>
    </div>
    
    <div class="cmd-line">
        <span class="prompt">vstockcode❯</span>
        <div class="autocomplete-container">
            <div id="autocomplete-menu" class="autocomplete-menu"></div>
            <input type="text" id="cmd-input" placeholder="Type / to see commands" autocomplete="off" spellcheck="false" />
        </div>
        <div id="last-updated" style="font-size: 0.8em; color: var(--vscode-descriptionForeground); margin-left: 10px;"></div>
    </div>
    <script>
        const vscode = acquireVsCodeApi();
        let selectedIndex = 0;
        let stocksData = [];
        let openDetails = new Set(); // store symbols with open details

        window.addEventListener('message', event => {
            const message = event.data;
            switch (message.type) {
                case 'update':
                    if (message.indices) {
                        renderIndices(message.indices);
                    }
                    if (message.timestamp) {
                        document.getElementById('last-updated').innerText = 'Updated: ' + message.timestamp;
                    }
                    stocksData = message.data;
                    renderStocks();
                    break;
            }
        });

        function renderIndices(indices) {
            const container = document.getElementById('ticker-container');
            if (indices.length === 0) {
                container.style.display = 'none';
                return;
            }
            container.style.display = 'flex';
            const itemsHtml = indices.map(idx => {
                const isPos = idx.change > 0;
                const isNeg = idx.change < 0;
                const colorClass = isPos ? 'positive' : isNeg ? 'negative' : 'neutral';
                const arrow = isPos ? '▲' : isNeg ? '▼' : '-';
                return \`
                    <div class="ticker-item">
                        <span class="ticker-symbol">\${idx.symbol}</span>
                        <span class="ticker-price">\${idx.price}</span>
                        <span class="\${colorClass}">\${arrow}\${idx.changeStr}%</span>
                    </div>
                \`;
            }).join('');
            
            container.innerHTML = \`<div class="ticker-wrap">
                <div class="ticker-part">\${itemsHtml}</div>
                <div class="ticker-part">\${itemsHtml}</div>
            </div>\`;
        }

        function renderStocks() {
            const container = document.getElementById('stock-table');
            container.innerHTML = '';

            if (stocksData.length === 0) {
                container.innerHTML = '<div style="padding: 20px; color: var(--vscode-descriptionForeground);">No stocks configured. Type "/add <name>" below.</div>';
                return;
            }

            container.innerHTML = \`
                <div class="header">
                    <div class="header-cell">SYMBOL</div>
                    <div class="header-cell">NAME</div>
                    <div class="header-cell center">TREND</div>
                    <div class="header-cell right">PRICE</div>
                    <div class="header-cell right">CHANGE</div>
                    <div class="header-cell"></div>
                </div>
            \`;

            stocksData.forEach((stock, index) => {
                const item = document.createElement('div');
                item.className = 'stock-item' + (index === selectedIndex ? ' selected' : '');
                
                let changeClass = 'neutral';
                let arrowClass = 'arrow-neutral';
                if (stock.change > 0) {
                    changeClass = 'positive';
                    arrowClass = 'arrow-up';
                } else if (stock.change < 0) {
                    changeClass = 'negative';
                    arrowClass = 'arrow-down';
                }

                item.innerHTML = \`
                    <div class="cell stock-symbol">\${stock.symbol}</div>
                    <div class="cell stock-name">\${stock.name}</div>
                    <div class="cell center sparkline">\${stock.sparkline}</div>
                    <div class="cell right stock-price">\${stock.price}</div>
                    <div class="cell right \${changeClass}"><span class="\${arrowClass}"></span>\${stock.changeStr}%</div>
                    <div class="cell" style="width: 40px; text-align: center; white-space: nowrap;">
                        <button class="link-btn" title="Yahoo Finance" aria-label="Open Yahoo Finance">🔗</button>
                        <button class="delete-btn" title="Remove" aria-label="Remove \${stock.symbol}">✖</button>
                    </div>
                \`;

                const detailRow = document.createElement('div');
                detailRow.className = 'detail-row' + (openDetails.has(stock.symbol) ? ' open' : '');
                detailRow.innerHTML = \`
                    <div class="detail-cell" colspan="6">
                        <div class="detail-grid">
                            <div class="detail-item">Vol: <strong>\${stock.details.volume}</strong></div>
                            <div class="detail-item">Mkt Cap: <strong>\${stock.details.marketCap}</strong></div>
                            <div class="detail-item">P/E: <strong>\${stock.details.pe}</strong></div>
                            <div class="detail-item">52w H/L: <strong>\${stock.details.high52} / \${stock.details.low52}</strong></div>
                        </div>
                    </div>
                \`;

                item.addEventListener('click', (e) => {
                    if (e.target.closest('.delete-btn') || e.target.closest('.link-btn')) return;
                    
                    if (openDetails.has(stock.symbol)) {
                        openDetails.delete(stock.symbol);
                        detailRow.classList.remove('open');
                    } else {
                        openDetails.add(stock.symbol);
                        detailRow.classList.add('open');
                    }
                });

                const deleteBtn = item.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    vscode.postMessage({ type: 'removeSymbol', value: stock.symbol });
                });

                const linkBtn = item.querySelector('.link-btn');
                linkBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    vscode.postMessage({ type: 'openFinance', value: stock.symbol });
                });

                container.appendChild(item);
                container.appendChild(detailRow);
            });
        }

        // Dropdown Logic
        const cmdInput = document.getElementById('cmd-input');
        const autocompleteMenu = document.getElementById('autocomplete-menu');
        
        const commands = [
            { cmd: '/add', desc: 'Add a new stock symbol or name' },
            { cmd: '/rm', desc: 'Remove a stock by symbol or name' },
            { cmd: '/alert', desc: 'Set an alert (e.g. /alert AAPL > 150)' },
            { cmd: '/markethours', desc: 'Check market status (e.g. korea, america, japan)' },
            { cmd: '/refresh', desc: 'Refresh stock prices immediately' }
        ];
        
        let selectedMenuIndex = -1;
        let visibleCommands = [];

        cmdInput.addEventListener('input', (e) => {
            const val = cmdInput.value;
            if (val.startsWith('/')) {
                const search = val.split(' ')[0].toLowerCase();
                visibleCommands = commands.filter(c => c.cmd.startsWith(search));
                
                if (visibleCommands.length > 0) {
                    renderAutocomplete();
                    autocompleteMenu.style.display = 'flex';
                } else {
                    autocompleteMenu.style.display = 'none';
                }
            } else {
                autocompleteMenu.style.display = 'none';
                selectedMenuIndex = -1;
            }
        });

        function renderAutocomplete() {
            autocompleteMenu.innerHTML = '';
            visibleCommands.forEach((c, i) => {
                const div = document.createElement('div');
                div.className = 'autocomplete-item' + (i === selectedMenuIndex ? ' active' : '');
                div.innerHTML = \`<strong>\${c.cmd}</strong><span class="cmd-desc">\${c.desc}</span>\`;
                div.addEventListener('click', () => {
                    cmdInput.value = c.cmd + ' ';
                    autocompleteMenu.style.display = 'none';
                    cmdInput.focus();
                });
                autocompleteMenu.appendChild(div);
            });
        }

        cmdInput.addEventListener('keydown', (e) => {
            if (autocompleteMenu.style.display === 'flex') {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    selectedMenuIndex = (selectedMenuIndex + 1) % visibleCommands.length;
                    renderAutocomplete();
                    return;
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    selectedMenuIndex = selectedMenuIndex <= 0 ? visibleCommands.length - 1 : selectedMenuIndex - 1;
                    renderAutocomplete();
                    return;
                } else if (e.key === 'Tab' || (e.key === 'Enter' && selectedMenuIndex >= 0)) {
                    e.preventDefault();
                    const targetCmd = selectedMenuIndex >= 0 ? visibleCommands[selectedMenuIndex].cmd : visibleCommands[0].cmd;
                    cmdInput.value = targetCmd + ' ';
                    autocompleteMenu.style.display = 'none';
                    selectedMenuIndex = -1;
                    return; // Prevent normal enter submission
                } else if (e.key === 'Escape') {
                    autocompleteMenu.style.display = 'none';
                    selectedMenuIndex = -1;
                    return;
                }
            }

            if (e.key === 'Enter') {
                const val = cmdInput.value.trim();
                if (!val) return;
                
                cmdInput.value = '';
                autocompleteMenu.style.display = 'none';

                const args = val.split(/\\s+/);
                const cmd = args[0].toLowerCase();
                const param = args.slice(1).join(' ');

                if (cmd === '/refresh' || cmd === '/r') {
                    vscode.postMessage({ type: 'refresh' });
                } else if (cmd === '/add' || cmd === '/a') {
                    vscode.postMessage({ type: 'triggerAddSymbol', value: param });
                } else if (cmd === '/rm' || cmd === '/remove' || cmd === '/del' || cmd === '/d') {
                    if (param) {
                        const p = param.toLowerCase();
                        const stock = stocksData.find(s => s.symbol.toLowerCase() === p || s.name.toLowerCase().includes(p));
                        if (stock) {
                            vscode.postMessage({ type: 'removeSymbol', value: stock.symbol });
                        } else {
                            vscode.postMessage({ type: 'removeSymbol', value: param.toUpperCase() });
                        }
                    }
                } else if (cmd === '/alert') {
                    const match = param.match(/^([A-Za-z0-9.\\-]+)\\s*([><])\\s*([0-9.]+)$/);
                    if (match) {
                        vscode.postMessage({ type: 'addAlert', value: { symbol: match[1].toUpperCase(), operator: match[2], price: parseFloat(match[3]) } });
                    }
                } else if (cmd === '/markethours' || cmd === '/m') {
                    if (param) {
                        vscode.postMessage({ type: 'checkMarketHours', value: param });
                    } else {
                        vscode.postMessage({ type: 'showError', value: 'Please specify a market (korea, america, japan)' });
                    }
                }
            }
        });
        
        window.addEventListener('load', () => cmdInput.focus());
        document.body.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT' && !e.target.closest('.stock-item')) {
                cmdInput.focus();
            }
        });
    </script>
</body>
</html>`;
    }
}
