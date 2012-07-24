var time, 
    started, 
    timer, 
    correctCount, 
    totalCount;

$(window).load(start);

function start() {
    $('#content').children().remove();
    time = 30;
    correctCount = 0;
    totalCount = 0;
    started = false;
    timer = setInterval(updateTimer,1000);
    nextProblem();
}

function updateTimer() {
    if (started) {
        time -= 1;
    }
    $('#time').text(time + 's');
    if (time <= 0) {
        clearInterval(timer);
        $('.question').last().remove();
        var title = $(document.createElement('strong'));
        var right = $(document.createElement('label'));
        var wrong = $(document.createElement('label'));
        var total = $(document.createElement('label'));
        var play = $(document.createElement('button'));
        var container = $(document.createElement('div'));
        var score = (correctCount - ((totalCount - correctCount)/2))*10;
        score = score >= 0 ? score : 0;

        title.text('Game Over')
            .appendTo(container);
        $(document.createElement('br')).appendTo(container);
        right.text('Correct: ' + correctCount)
            .addClass('correct')
            .appendTo(container);
        $(document.createElement('br')).appendTo(container);
        wrong.text('Incorrect: ' + (totalCount - correctCount))
            .addClass('incorrect')
            .appendTo(container);
        $(document.createElement('br')).appendTo(container);
        total.text('Total Score: ' + score)
            .appendTo(container);
        $(document.createElement('br')).appendTo(container);
        play.bind('click',start)
            .text('Play Again')
            .appendTo(container);

        container.appendTo($('#content'));
    }
}

function keyScript(e) {
    started = true;
    if (e.keyCode == 13) {
        var cAns = $(this).siblings('.ans').val();
        var pAns = $(this).val();

        totalCount++;
        if (cAns == pAns) {
            correctCount++;
        }
        process($(this), cAns == pAns ? 'correct' : 'incorrect');
    }
}

function process(box, result) {
    var parent = box.parent();
    $(document.createElement('label'))
        .text(box.val())
        .appendTo(parent);
    box.remove();
    parent.addClass(result);
    nextProblem();
}

function nextProblem() {
    var a = getNum();
    var b = getNum();
    var s = getSign();
    var ans=0;
    if (s == '+') {
        ans = a+b;
    } else if (s == '-') {
        a=a+b;
        ans = a-b;
    } else if (s == '*') {
        ans = a*b;
    } else if (s == '/') {
        a=a*b;
        ans = a/b;
    }
    loadProblem(a + ' ' + s + ' ' + b + ' = ', ans);
}

function getNum() {
    return Math.floor(Math.random()*10) + 1;
}

function getSign() {
    var signs = new Array('+','-','*','/');
    var num = Math.floor(Math.random()*4);
    return signs[num];
}

function loadProblem(problem, answer) {
    var container = $(document.createElement('div'))
        .addClass('question')
        .appendTo($('#content'));

    $(document.createElement('label'))
        .text(problem)
        .appendTo(container);

    $(document.createElement('input'))
        .attr('type','text')
        .bind('keypress',keyScript)
        .mask('9?99',{placeholder:''})
        .appendTo(container)
        .focus();

    $(document.createElement('input'))
        .addClass('ans')
        .attr('type','hidden')
        .val(answer)
        .appendTo(container);

    $('#time').remove();
    $(document.createElement('label'))
        .attr('id','time')
        .text(time + 's')
        .appendTo(container);
}
