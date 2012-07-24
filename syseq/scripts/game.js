$(window).load(start);
$(window).keypress(checkKey);

function start() {
    generateBox(3);
    setupBindings();
}

function checkKey(e) {
    var key = e.keyCode;
    
    /* 1-9 = 49-57
     * q = 113
     * w = 119
     * e = 101
     * a = 97
     * s = 115
     * d = 100
     * z = 122
     * x = 120
     * c = 99
     */
    
    // Select function
    switch (key) {
    case 119: // Swap (w)
	setSelected("#swapImg");
	break;
    case 97: // Add (a)
	setSelected("#plusImg");
	break;
    case 115: // Subtract (s)
	setSelected("#minusImg");
	break;
    case 120: // Multiply (x)
	setSelected("#multiplyImg");
	break;
    case 100: // Divide (d)
	setSelected("#divideImg");
	break;
    case 122: // Undo (z)
	setSelected("#undoImg");
	break;
        
    // Select, Add, Subtract and Swap
    case 114: // Row 1 
	modRows(".r0");
	break;
    case 102: // Row 2
	modRows(".r1");
	break;
    case 118: // Row 3
	modRows(".r2");
	break;
    
    // Multiply and divide
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
	modRow(key - 48);
	break;
    }
}

function setSelected(val) {
    $("img").removeClass("selected");
    $(val).addClass("selected");
}

// Select, Add, Subtract, Swap
function modRows(vals) {
    if ($(".selected").length < 2) { // Select
	$("div").removeClass("selected");
	$(vals).addClass("selected");
    } else if ($(".selected").length == 2) { // Add, Subtract, Swap
	$("div.selected").children().each(function(index) {
	    var val = $(vals).children().eq(index);
	    if ($("#plusImg").hasClass("selected")) { // Add
		$(this).text(parseInt($(this).text()) + parseInt(val.text()));
	    } else if ($("#minusImg").hasClass("selected")) { // Subtract
		$(this).text(parseInt($(this).text()) - parseInt(val.text()));
	    } else if ($("#swapImg").hasClass("selected")) { // Swap
		var temp = $(this).text();
		$(this).text(val.text());
		val.text(temp);
	    }
	});
	
	$("div").removeClass("selected");
	$("img").removeClass("selected");
    }
}

function modRow(val) {
    if (val == 1) {
	$(this).text(parseInt($(this).text()) * -1);
    } else if ($("#multiplyImg").hasClass("selected")) {
	$("div.selected").children().each(function(index) {
	    $(this).text(parseInt($(this).text()) * val);
	});
    } else if ($("#divideImg").hasClass("selected")) {
	var div = true;
	$("div.selected").children().each(function(index) {
	    if (parseInt($(this).text()) % val != 0) {
		div = false;
	    }
	});
	if (div) {
	    $("div.selected").children().each(function(index) {
		$(this).text(parseInt($(this).text()) / val);
	    });
	} else {
	    alert("Division must be even!");
	}
    }
    
    $("div").removeClass("selected");
    $("img").removeClass("selected");
}

function generateBox(count) {
    for (var i=0;i<count;i++) {
	var row = generateRow(count,i);
	var container = $("#matrix");
	row.appendTo(container);
    }
}

function generateRow(count, rnum) {
    var box = $(document.createElement("div"));
    box.addClass("r" + rnum);
    box.click(function() { modRows(this) });
    for (var i=0;i<count;i++) {
	var label = $(document.createElement("label"));
	label.text(getNum(1,4))
	label.appendTo(box);
    }
    return box;
}

function setupBindings() {
    $("#mod img").click(function() { setSelected(this); });
}

function getNum(minVal, maxVal)
{
    var mult = maxVal - minVal + 1;
    return Math.floor(Math.random()*mult) + minVal;
}
