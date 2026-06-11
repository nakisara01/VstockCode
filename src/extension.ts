import * as vscode from 'vscode';
import { StockViewProvider, yahooFinance } from './StockViewProvider';

export function activate(context: vscode.ExtensionContext) {
    const provider = new StockViewProvider(context.extensionUri);

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(StockViewProvider.viewType, provider)
    );

    context.subscriptions.push(vscode.commands.registerCommand('vstockcode.refresh', () => {
        provider.updatePrices(true);
    }));

    context.subscriptions.push(vscode.commands.registerCommand('vstockcode.addSymbol', async (initialQuery?: string) => {
        let query = initialQuery;
        
        if (typeof query !== 'string' || !query.trim()) {
            query = await vscode.window.showInputBox({
                prompt: 'Enter company name or stock symbol to search',
                placeHolder: 'e.g. Apple or 삼성전자'
            });
        }

        if (!query) {
            return;
        }

        try {
            vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: 'Searching Yahoo Finance...',
                cancellable: false
            }, async () => {
                const searchResults = await yahooFinance.search(query);
                
                if (searchResults.quotes.length === 0) {
                    vscode.window.showInformationMessage('No results found for your search.');
                    return;
                }

                const items = searchResults.quotes.map(q => ({
                    label: q.shortname || q.longname || q.symbol,
                    description: q.symbol,
                    detail: `${q.exchDisp} - ${q.quoteType}`
                }));

                const selected = await vscode.window.showQuickPick(items, {
                    placeHolder: 'Select a stock to add'
                });

                if (selected) {
                    const symbol = selected.description;
                    const config = vscode.workspace.getConfiguration('vstockcode');
                    const symbols: string[] = config.get('symbols', []);
                    if (symbol && !symbols.includes(symbol)) {
                        symbols.push(symbol);
                        await config.update('symbols', symbols, vscode.ConfigurationTarget.Global);
                    }
                }
            });
        } catch (error) {
            console.error('Search failed', error);
            vscode.window.showErrorMessage('Failed to search stock. Please try again.');
        }
    }));

    context.subscriptions.push(vscode.commands.registerCommand('vstockcode.openFinance', async () => {
        // If webview is focused, triggerOpenFinance will handle it
        // Otherwise, show quick pick
        const config = vscode.workspace.getConfiguration('vstockcode');
        const symbols: string[] = config.get('symbols', ['005930.KS']);

        if (symbols.length === 0) {
            vscode.window.showInformationMessage('No stock symbols configured.');
            return;
        }

        if (symbols.length === 1) {
            const url = `https://finance.yahoo.com/quote/${symbols[0]}`;
            vscode.env.openExternal(vscode.Uri.parse(url));
            return;
        }

        const selected = await vscode.window.showQuickPick(symbols, {
            placeHolder: 'Select a stock to open in Yahoo Finance'
        });

        if (selected) {
            const url = `https://finance.yahoo.com/quote/${selected}`;
            vscode.env.openExternal(vscode.Uri.parse(url));
        }
    }));

    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('vstockcode.symbols') || e.affectsConfiguration('vstockcode.updateInterval')) {
            provider.startLoop();
        }
    }));
}

export function deactivate() {}
