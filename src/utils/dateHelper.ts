function addLeadZero(value: number) {
    if (value < 10) {
        return `0${value}`;
    }

    return value.toString();
}

export function formatDate(date: Date): string {
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yy = date.getFullYear() % 100;

    return `${addLeadZero(dd)}.${addLeadZero(mm)}.${addLeadZero(yy)}`;
}

export function formatTime(date: Date): string {
    const hh = date.getHours();
    const mm = date.getMinutes();

    return `${addLeadZero(hh)}:${addLeadZero(mm)}`;
}

export function formatDateTime(date: Date): string {
    return `${formatDate(date)} ${formatTime(date)}`;
}
