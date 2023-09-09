//Declaring Variables
var count = 1,
    total = 0,
    correct = 0,
    wrong = 0,
    lim = 0;
var ans = '',
    question = '',
    width = 220,
    t = '',
    n1,
    n2,
    n3,
    r1,
    r2,
    cor,
    qlvl,
    prev = 0;
var opr = [];

//Set up
$(document).ready(function () {
    var b = `<button onclick="level(`;
    var e = `</button><br />`;
    $('#diff').append(`${b}1)">Easy${e} ${b}2)">Medium${e} ${b}3)">Hard${e}`);
    b = `<button class="opt" id="o`;
    e = `"></button>`;
    $('#options').html(`${b}1${e}${b}2${e} <br/> ${b}3${e}${b}4${e}`);
    $('#quizbody').hide();
});

//Selecting Difficulty Level
function level(lvl) {
    if (lvl == 1) {
        lim = 10;
        opr = ['+', '-', '+', '-', '*'];
    } else if (lvl == 2) {
        opr = ['+', '-', '*'];
        lim = 15;
    } else if (lvl == 3) {
        opr = ['+', '-', '*'];
        lim = 30;
    }
    $('#diff').hide();
    $('#quizbody').show();
    qlvl = lvl;
    quiz(lvl);
}

//Generating Quiz
function quiz() {
    $('#timer').css('visibility', 'visible');
    $('#timer').hide();
    $('#timer').fadeIn();
    $('#h').hide();
    $('.opt').css('background-color', 'transparent');
    var len = opr.length;
    n1 = rNum(lim);
    n2 = rNum(lim);
    n3 = rNum(lim) + 1;
    r1 = opr[rNum(len)];
    r2 = opr[rNum(len)];

    //Modifying question according to levels
    if (qlvl == 1) {
        if (r1 == '*' || r2 == '*') {
            if (n1 > 10) n1 = n1 - 5;
            else if (n2 > 10) n2 = n2 - 7;
            else if (n3 > 10) n3 = n3 - 8;
        }
        if (r1 == '*' && r2 == '*') {
            r2 = '-';
        }
    }
    if (qlvl == 2) {
        if (r1 == '*' && r2 == '*') {
            r2 = '-';
        }
        if (r1 == '+' && r2 == '+') {
            r2 = '-';
            n1 = n1 + 4;
        }
        if (n1 < 10 && n2 < 7 && r1 != '*' && r2 != '*') {
            r1 = '*';
        }
    }

    if (qlvl == 3) {
        if (r1 != '*' && r2 != '*') r1 = '*';
    }
    //Generating Question and Answer
    question = n1 + r1 + n2 + r2 + n3;
    ans = eval(question);
    $('#question').html(question + ' = ?');

    //Creating Options
    var answers = [0, 0, 0];
    var opt1 = ans + rNum(10) + 1;
    answers[0] = opt1;
    opt2 = eval(question.replace('-', '+'));
    if (opt2 != ans) answers[1] = opt2;
    else answers[1] = ans + rNum(15) + 1;
    var nAns = ans + 1;
    var opt3 = nAns.toString().replace('-', '');
    if (ans.toString().includes('-') && opt3 != opt2 && opt3 != opt1) {
        answers[2] = nAns.toString().replace('-', '');
    } else {
        opt3 = ans - rNum(7) - 1;
        if (opt3 != opt1) answers[2] = opt3;
        else answers[2] = opt3 + 1;
    }

    cor = rNum(4) + 1;
    if (cor == prev) {
        if (cor == 1 || cor == 2) cor = cor + 1;
        else cor = cor - 1;
    }
    prev = cor;
    $('#o' + cor).html(ans);
    var j = 0;
    for (i = 1; i <= 4; i++) {
        if (i != cor) {
            $('#o' + i).html(answers[j]);
            j++;
        }
    }
    t = setInterval(timeCheck, 70);
    $('#question').hide();
    $('#question').fadeIn(750);
    $('.opt').prop('disabled', false);
}

//Checking Answer
function check(opt, id) {
    $('#o' + cor).css('background-color', 'green');
    $('#timer').css('visibility', 'hidden');
    if (opt == ans) {
        correct++;
        $('#correct').html(correct);
        $('#h').html('Correct');
        $('#h').css('color', 'green');
    } else {
        $('#h').html('Wrong');
        $('#h').show();
        wrong++;
        $('#wrong').html(wrong);
        $('#' + id).css('background-color', 'red');
        $('#h').css('color', 'red');
    }
    $('#h').show();
    count++;
    total++;
    $('#no').html(count);
    $('#total').html(total);
    clearInterval(t);
    width = 220;
    bar.style.width = '220px';
    $('.opt').prop('disabled', true);
    setTimeout(function () {
        quiz();
    }, 2500);
}

//Timer
function timeCheck() {
    var bar = document.getElementById('bar');
    if (width == 0) {
        $('#timer').css('visibility', 'hidden');
        clearInterval(t);
        $('#o' + cor).css('background-color', 'orange');
        wrong++;
        $('#wrong').html(wrong);
        $('#h').css('color', 'orange');
        width = 220;
        bar.style.width = '220px';
        $('#h').html('Time Out');
        $('#h').show();
        $('.opt').prop('disabled', true);
        setTimeout(function () {
            quiz();
        }, 2500);
    } else {
        width--;
        bar.style.width = width + 'px';
    }
}
function rNum(limit) {
    var gen = Math.floor(Math.random() * limit);
    return gen;
}

//Other Functions
$(function () {
    //Reseting
    $('#res').click(function () {
        $('#diff').show();
        $('#quizbody').hide();
        (count = 1), (total = 0), (correct = 0), (wrong = 0), (lim = 0);
        $('#correct').html(correct);
        $('#wrong').html(wrong);
        $('#total').html(total);
        clearInterval(t);
        width = 220;
        bar.style.width = '200px';
    });

    $('.opt').click(function () {
        check($(this).text(), event.target.id);
    });
});
