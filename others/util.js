module.exports = {
    getDate: function getDate() {
        var rightNow = new Date();
        // example toISOString() -> 2017-04-08T15:13:05.279Z
        // but you need to consider about timezone offset
        rightNow.setMinutes(rightNow.getMinutes() - rightNow.getTimezoneOffset());
        var result = rightNow.toISOString().slice(0, 10).replace(/-/g, '');
        return result;
    },
    getTime: function getTime() {
        var rightNow = new Date();
        rightNow.setMinutes(rightNow.getMinutes() - rightNow.getTimezoneOffset());
        var result = rightNow.toISOString().slice(0, 19).replace(/[^0-9]/g, '');
        return result;
    },
    getTimeBefore: function getTimeBefore(days) {
        var rightNow = new Date();
        rightNow.setMinutes(rightNow.getMinutes() - rightNow.getTimezoneOffset());
        var daysBefore = rightNow.getTime() - days * 24 * 60 * 60 * 1000;
        daysBefore = new Date(daysBefore);
        var result = daysBefore.toISOString().slice(0, 19).replace(/[^0-9]/g, '');
        return result;
    },
    getFixNumber: function getFixNumber(num, length) {
        return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
    },
    getFormatTime: function getFormatTime(origin) {
        return origin.replace(/[^0-9]/g, '');
    },
    getNormalTime: function getNormalTime(origin) {
        // origin: 20170215180000
        // result: 2017-02-15 18:00:00

        if (origin == null) {
            return origin;
        }

        var result = origin;
        result = result.replace(/(.{12})/, '$1:');
        // origin: 201702151800:00

        result = result.replace(/(.{10})/, '$1:');
        // origin: 2017021518:00:00

        result = result.replace(/(.{8})/, '$1 ');
        // origin: 20170215 18:00:00

        result = result.replace(/(.{6})/, '$1-');
        // origin: 201702-15 18:00:00

        result = result.replace(/(.{4})/, '$1-');
        // origin: 2017-02-15 18:00:00

        return result;
    },
    getState: function getState(person, nextperson) {
        switch (person) {
            case '1':
                if (nextperson == '20' || nextperson == '60') {
                    return '更新';
                }
                else {
                    return '查看';
                }
            case '2':
                if (nextperson == '20') {
                    return '审批';
                } else {
                    return '查看';
                }
            case '3':
                if (nextperson == '30') {
                    return '审批';
                } else {
                    return '查看';
                }
            case '4':
                if (nextperson == '40') {
                    return '审批';
                } else {
                    return '查看';
                }
            case '5':
                if (nextperson == '50') {
                    return '审批';
                } else {
                    return '查看';
                }
            default:
                return '查看';
        }
    }
}