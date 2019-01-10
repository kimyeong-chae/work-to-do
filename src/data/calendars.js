'use strict';

/* eslint-disable require-jsdoc, no-unused-vars */

var CalendarList = [];

function CalendarInfo() {
    this.id = null;
    this.name = null;
    this.checked = true;
    this.color = null;
    this.bgColor = null;
    this.borderColor = null;
}

function addCalendar(calendar) {
    CalendarList.push(calendar);
}

function hexToRGBA(hex) {
    var radix = 16;
    var r = parseInt(hex.slice(1, 3), radix),
        g = parseInt(hex.slice(3, 5), radix),
        b = parseInt(hex.slice(5, 7), radix),
        a = parseInt(hex.slice(7, 9), radix) / 255 || 1;
    var rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';

    return rgba;
}


var calendar;
var id = 0;

calendar = new CalendarInfo();
id += 1;
calendar.id = String(id);
calendar.name = '이성찬';
calendar.color = '#ffffff';
calendar.bgColor = '#9e5fff';
calendar.dragBgColor = '#9e5fff';
calendar.borderColor = '#9e5fff';
addCalendar(calendar);

calendar = new CalendarInfo();
id += 1;
calendar.id = String(id);
calendar.name = '김영채';
calendar.color = '#ffffff';
calendar.bgColor = '#00a9ff';
calendar.dragBgColor = '#00a9ff';
calendar.borderColor = '#00a9ff';
addCalendar(calendar);

calendar = new CalendarInfo();
id += 1;
calendar.id = String(id);
calendar.name = '최우람';
calendar.color = '#ffffff';
calendar.bgColor = '#ff5583';
calendar.dragBgColor = '#ff5583';
calendar.borderColor = '#ff5583';
addCalendar(calendar);

calendar = new CalendarInfo();
id += 1;
calendar.id = String(id);
calendar.name = '한덕';
calendar.color = '#ffffff';
calendar.bgColor = '#03bd9e';
calendar.dragBgColor = '#03bd9e';
calendar.borderColor = '#03bd9e';
addCalendar(calendar);

export default CalendarList;
