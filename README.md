# VStockCode

VStockCode is a powerful, terminal-style stock market monitor that lives right inside your VS Code panel. Keep track of your favorite global stocks (KOSPI, NASDAQ, S&P 500) without ever leaving your editor!

## Features

- **Terminal Aesthetic**: Sleek, hacker-style monospace UI.
- **Global Indices Ticker**: Real-time ticker for KOSPI, KOSDAQ, S&P 500, NASDAQ, and Dow Jones.
- **Slash Commands**: Add/remove stocks using terminal commands like `/add AAPL`, `/rm AAPL`.
- **Price Alerts**: Set alerts for your target prices (e.g., `/alert TSLA < 150`).
- **Market Hours Tracker**: Use `/markethours america` or `/m korea` to instantly check if the market is open, in pre-market, or closed.
- **Sparkline Charts**: Visual 30-day mini-charts (`TREND`) right in your stock list.
- **Expandable Details**: Click a stock to see Market Cap, P/E ratio, Volume, and 52-week High/Low.

## How to use

1. Open the **Stock Monitor** panel at the bottom of VS Code.
2. Click the prompt (`vstockcode❯`) and type `/` to see available commands.
3. Try `/add 삼성전자` or `/add MSFT` to add stocks.
4. Try `/alert MSFT > 450` to set a price alert.

Enjoy seamless monitoring!
