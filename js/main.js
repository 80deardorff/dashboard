// DASHBOARD DATA
var user = [{
    firstName: 'Adrian',
    lastName: 'Deardorff',
    idNum: '',
    img: 'img/adrianDeardorff.png',
    target: 1208065,
    sales: 280623
}]

// GENERATING A 4 DIGIT RANDOM ID NUMBER
function randomNum(min, max) {
    return Math.floor(Math.random() * max - min) + min;
};

user[0].idNum = randomNum(1, 10000).toLocaleString('en', {minimumIntegerDigits:4,minimumFractionDigits:0,useGrouping:false});


// SIDE-NAV
$('#side-nav-btn').click(function() {
    $('div.main').toggleClass('main-side-nav-expanded');
    $('div.side-nav').toggleClass('side-nav-expanded');
});

// USER INFO
$('#userImg').attr('src', user[0].img);
$('#userName').text(user[0].firstName + ' ' + user[0].lastName);
$('#userId').text('Employee ID: ' + user[0].idNum);

// TIME VARIABLES
var now, year, month, day, hour, minute, second, meridiem, workingDays;
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// FUNCTION FOR DISPLAYING TIME
function currentTime() {
    now = new Date();
    year = now.getFullYear();
    month = monthNames[now.getMonth()];
    day = now.getDate();
    hour = toStandardTime(now.getHours());
    minute = formatAddZero(now.getMinutes());
    second = formatAddZero(now.getSeconds());
    meridiem = (function() {
                        if (now.getHours() > 12) {
                            return 'PM';
                        } else {
                            return 'AM';
                        }
                    })();
    workingDays = getWeekdaysInMonth(now.getMonth(), year);
    // CURRENT TIME
    $('#time').text(month + ' ' + day + ', ' + year + ' ' + hour + ':' + minute + ':' + second + ' ' + meridiem);
    $('#workingDays').text('Working days in ' + month + ': ' + getWeekdaysInMonth(now.getMonth(), year));
    setTimeout(function() {
        currentTime();
    }, 1000)
};
currentTime();

// SALES VARIABLES
var target = user[0].target;
var sales = user[0].sales;
var currentTarget = target / workingDays * day;
var percentPlusMinus = (currentTarget - sales) / currentTarget * 100;

// MONTHLY TARGET
$('#monthTarget').text(month + ' Target: $' + target.toLocaleString(undefined, {maximumFractionDigits:0}));

// MONTH TO DATE TARGET
$('#mtdTarget').text('Current Day Target: $' + currentTarget.toLocaleString(undefined, {maximumFractionDigits:0}));

// CURRENT SALES
$('#currentSales').text(month + ' Sales: $' + sales.toLocaleString(undefined, {maximumFractionDigits:0}));

// STATUS FOR TIME OF MONTH
var span1 = document.createElement('span');
span1.innerText = percentPlusMinus.toLocaleString(undefined, {maximumFractionDigits:2}) + '%';
span1.setAttribute('id', 'span1');
$('#mtdTarget').append(span1);

// SETS STYLE TO GREEN AND ADDS A PLUS SIGN IF ABOVE TARGET
if (percentPlusMinus > 0) {
    span1.innerText = '-' + percentPlusMinus.toLocaleString(undefined, {maximumFractionDigits:2}) + '%';
    span1.setAttribute('style', 'color: #ff6161');
}
else {
    span1.innerText = '+' + (percentPlusMinus * -1).toLocaleString(undefined, {maximumFractionDigits:2}) + '%';
}

// SALES BAR BASED ON PERCENT OF TARGET FOR MONTH
var monthPercent = Math.floor((sales / target * 100)).toLocaleString(undefined, {maximumFractionDigits:0});
if (monthPercent > 100) {
    monthPercent = 100;
};
$('#salesBar').css({'width': monthPercent + '%', 'max-width': '100%', 'transition': 'width 3.0s ease-in-out'});
$('#indicator').html('<i class="fas fa-caret-up"></i><br>' + monthPercent + '%');
if (monthPercent < 3) {
    monthPercent = 3;
}
$('#indicator').css({'left': monthPercent - 3 + '%', 'transition': 'left 3.0s ease-in-out'})

// FUNCTION FOR CHANGING FROM MILITARY TIME TO STANDARD TIME
function toStandardTime(hour) {
    if (hour == 0) {
        return 12;
    } else if (hour > 12) {
        return hour - 12;
    } else {
        return hour;
    }
};

// FUNCTION FOR ADDING ON A ZERO TO NUMBERS LESS THAN 10 FOR FORMATTING PURPOSES
function formatAddZero(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return num;
    }
};

// FUNCTION FOR COUNTING NUMBER OF WORKING DAYS IN MONTH
function isWeekday(year, month, day) {
    var day = new Date(year, month, day).getDay();
    return day !=0 && day !=6;
}
function getWeekdaysInMonth(month, year) {
    var days = daysInMonth(month, year);
    var weekdays = 0;
    for(var i=0; i< days; i++) {
        if (isWeekday(year, month, i+1)) {
            weekdays++;
        }
    }
    return weekdays;
}
function daysInMonth(month, year) {
  //Day 0 is the last day in the previous month
 return new Date(year, month + 1, 0).getDate();
// Here January is 0 based
};
