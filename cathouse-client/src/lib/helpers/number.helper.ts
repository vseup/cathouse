export function rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function toEur(num: number): string {
    return Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(num);
}