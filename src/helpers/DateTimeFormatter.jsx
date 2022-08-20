class DateTimeFormatter {
    constructor(millies) {
        this.date = new Date(millies);
    }
    toDate = ()=> {
        return this.date.toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }
    toTime = ()=> {
        return this.date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric'
        });
    }
}

export default DateTimeFormatter;