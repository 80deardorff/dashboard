// DASHBOARD DATA
var user = [];

//CONSTRUCTOR FUNCTION FOR USERS
function User(firstName, lastName, idNum, img, target, sales, title) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.idNum = idNum;
    this.img = img;
    this.target = target;
    this.sales = sales;
    this.title = title;
}

//USER INFO
user.push(
    new User('Adrian', 'Deardorff', '', 'img/adrianDeardorff.png', 1208065, 280623, 'Southern Region CTC'),
    new User('Jeremy', 'Schneckloth', '', 'img/adrianDeardorff.png', 1012432, 301854, 'Central Region CTC'),
    new User('Andre', 'Buccino', '', 'img/adrianDeardorff.png', 1434765, 456803, 'Western Region CTC')
);

//CURRENT NUMBER USER DISPLAYED
var userNum = 0;

//CREATES A RANDOM 4 DIGIT NUMBER FOR THE USER ID
user[userNum].idNum = randomNum(1, 10000).toLocaleString('en', {minimumIntegerDigits:4,minimumFractionDigits:0,useGrouping:false});

// SIDE-NAV
$('#side-nav-btn').click(function() {
    $('div.main').toggleClass('main-side-nav-expanded');
    $('div.side-nav').toggleClass('side-nav-expanded');
});

// USER INFO
$('#userImg').attr('src', user[userNum].img);
$('#userName').text(user[userNum].firstName + ' ' + user[userNum].lastName);
$('#userId').text('Employee ID: ' + user[userNum].idNum);

// TIME VARIABLES
var now, year, month, monthName, day, hour, minute, second, meridiem, workingDays;
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//RUN AND DISPLAY CURRENT TIME
currentTime();

// SALES VARIABLES
var target = user[userNum].target;
var sales = user[userNum].sales;
var currentTarget = target / workingDays * getCurrentWeekdaysInMonth(month, year);
var percentPlusMinus = (currentTarget - sales) / currentTarget * 100;

// MONTHLY TARGET
$('#monthTarget').text(monthName + ' Target: $' + target.toLocaleString(undefined, {maximumFractionDigits:0}));

// MONTH TO DATE TARGET
$('#mtdTarget').text('Current Day Target: $' + currentTarget.toLocaleString(undefined, {maximumFractionDigits:0}));

// CURRENT SALES
$('#currentSales').text(monthName + ' Sales: $' + sales.toLocaleString(undefined, {maximumFractionDigits:0}));

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

// FUNCTION FOR GENERATING A 4 DIGIT RANDOM ID NUMBER
function randomNum(min, max) {
    return Math.floor(Math.random() * max - min) + min;
};

// FUNCTION FOR DISPLAYING TIME AND WORKING DAYS IN MONTH
function currentTime() {
    now = new Date();
    year = now.getFullYear();
    month = now.getMonth();
    monthName = monthNames[now.getMonth()]
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
    $('#time').text(monthName + ' ' + day + ', ' + year + ' ' + hour + ':' + minute + ':' + second + ' ' + meridiem);
    //WORKING DAYS
    $('#workingDays').text('Working days in ' + monthName + ': ' + getWeekdaysInMonth(now.getMonth(), year));
    setTimeout(function() {
        currentTime();
    }, 1000)
};

//FUNCTION FOR WORKING DAYS IN MONTH AT CURRENT DAY OF MONTH SO FAR
function getCurrentWeekdaysInMonth(month, year) {
    var weekdays = 0;
    for(var i=0; i< day; i++) {
        if (isWeekday(year, month, i+1)) {
            weekdays++;
        }
    }
    return weekdays;
}

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

// FUNCTIONS FOR COUNTING NUMBER OF WORKING DAYS IN MONTH
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
function isWeekday(year, month, day) {
    var day = new Date(year, month, day).getDay();
    return day !=0 && day !=6;
}
function daysInMonth(month, year) {
  //Day 0 is the last day in the previous month
 return new Date(year, month + 1, 0).getDate();
// Here January is 0 based
};
