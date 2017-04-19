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
    getFixNumber: function getFixNumber(num, length) {
        return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
    },
    getNoticedepart: function getNoticedepart(noticedepart) {
        if (typeof noticedepart === 'undefined' || noticedepart.length == 0) {
            return '';
        } else {
            var str = '';
            for (var i = 0; i < noticedepart.length - 1; i++) {
                str = str + noticedepart[i] + '&';
            }
            str = str + noticedepart[noticedepart.length - 1];
            return str;
        }
    },
    getFormatTime: function getFormatTime(origin) {
        return origin.replace(/[^0-9]/g, '');
    },
    getState: function getState(person, nextperson) {
        switch (person) {
            case '1':
                if(nextperson=='2'||nextperson=='6'){
                    return '更新';
                }
                else{
                    return '查看';
                }
            case '2':
                if(nextperson=='2'){
                    return '审核';
                }else if(nextperson=='3'){
                    return '更新';
                }else{
                    return '查看';
                }
            case '3':
                if(nextperson=='3'){
                    return '审核';
                }else if (nextperson=='4'){
                    return '更新';
                }else{
                    return '查看';
                }
            case '4':
                if(nextperson=='4'){
                    return '审核';
                }else if (nextperson=='5'){
                    return '更新';
                }else{
                    return '查看';
                }
            case '5':
                if(nextperson=='5') {
                    return '审核';
                }else{
                    return '查看';
                }
            default:
                return '查看';
        }
    }
}