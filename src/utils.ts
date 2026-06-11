export function generateSparkline(prices: number[]): string {
    if (!prices || prices.length === 0) return '';
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min;
    if (range === 0) return prices.map(() => '▄').join('');

    const blocks = [' ', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
    
    return prices.map(p => {
        const index = Math.round(((p - min) / range) * (blocks.length - 1));
        return blocks[index];
    }).join('');
}
