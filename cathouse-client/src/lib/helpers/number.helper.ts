export function rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function toEur(num: number): string {
    return Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(num);
}

export function to2digits(num: number): string {
    return Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
}