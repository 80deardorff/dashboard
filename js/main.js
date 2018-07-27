// DASHBOARD DATA
var user = [{
    firstName: 'Adrian',
    lastName: 'Deardorff',
    idNum: '',
    img: 'img/adrianDeardorff.png',
    monthTarget: '',
    monthSales: ''
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

// FUNCTION FOR DISPLAYING TIME
function currentTime() {
    var now = new Date();
    var year = now.getFullYear();
    var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    var month = monthNames[now.getMonth()];
    var day = now.getDate();
    var hour = formatAddZero(formatToStandardTime(now.getHours()));
    var minute = formatAddZero(now.getMinutes());
    var second = formatAddZero(now.getSeconds());
    var meridiem = (function() {
                        if (now.getHours() > 12) {
                            return 'PM';
                        } else {
                            return 'AM';
                        }
                    })();
// SALES INFO
    $('#time').text(month + ' ' + day + ', ' + year + ' ' + hour + ':' + minute + ':' + second + ' ' + meridiem);
    setTimeout(function() {
        currentTime();
    }, 1000)
};
currentTime();

// FUNCTION FOR CHANGING FROM MILITARY TIME TO STANDARD TIME
function formatToStandardTime(hour) {
    if (hour > 12) {
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
