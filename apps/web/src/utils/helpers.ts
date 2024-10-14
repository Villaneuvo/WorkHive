export function formatCurrency(value: number) {
    if (value <= 0) {
        return 'No Salary';
    }
    return new Intl.NumberFormat('id-ID', currencyFormatOptions).format(value);
}

export function formatDate(date1: Date) {
    const date = new Date(date1);

    // Opsi format tanggal
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export const currencyFormatOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
};
