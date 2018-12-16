/********  LEAF ANIMATION  ********/

var _containerHeight = $(window).height() * 3;

var _width, _height, _scrollHeight;
var _movingElements = [];
var _scrollPercent = 0;
var pre = prefix();
var _jsPrefix = pre.lowercase;
if (_jsPrefix == 'moz') _jsPrefix = 'Moz';
var _cssPrefix = pre.css;
var _positions = [
    {
        name: 'leaf1',
        start: {
            percent: 0, x: 0, y: 0
        },
        end: {
            percent: 0.5, x: -0.5, y: -0.1
        }
    },
    {
        name: 'leaf2',
        start: {
            percent: 0, x: 0, y: 0
        },
        end: {
            percent: 1.6, x: -0.5, y: 0.5
        }
    },
    {
        name: 'leaf3',
        start: {
            percent: 0, x: 0, y: 0
        },
        end: {
            percent: 1, x: 0.5, y: 0.5
        }
    },
    {
        name: 'leaf4',
        start: {
            percent: 0, x: 0, y: 0
        },
        end: {
            percent: 0.8, x: 0.5, y: -0.5
        }
    },
    {
        name: 'leaf5',
        start: {
            percent: 0, x: 0, y: 0
        },
        end: {
            percent: 1.3, x: 0, y: -0.5
        }
    }
];
resize();
initMovingElements();

function initMovingElements() {
    for (var ii = 0; ii < 2; ii++) {
        for (var i = 0; i < _positions.length; i++) {

            _positions[i].diff = {
                percent: _positions[i].end.percent - _positions[i].start.percent,
                x: _positions[i].end.x - _positions[i].start.x,
                y: _positions[i].end.y - _positions[i].start.y,
            };
            var el = document.getElementsByClassName('leaf ' + _positions[i].name)[ii];
            _movingElements.push(el);

        }
    }
    _positions = _positions.concat(_positions);

}

function resize() {
    _width = window.innerWidth;
    _height = window.innerHeight;
    _containerHeight = window.innerHeight * 3;
    _scrollHeight = (_containerHeight - _height);
}


function updateElements(iteration) {

    for (let i = iteration*5; i < (iteration+1)*5; i++) {
        let p = _positions[i];
        if (p != null) {

            if (_scrollPercent <= p.start.percent) {
                _movingElements[i].style[_jsPrefix + 'Transform'] = 'translate3d(' + (p.start.x * _width) + 'px, ' + (p.start.y * _containerHeight) + 'px, 0px)';
            } else if (_scrollPercent >= p.end.percent) {
                _movingElements[i].style[_jsPrefix + 'Transform'] = 'translate3d(' + (p.end.x * _width) + 'px, ' + (p.end.y * _containerHeight) + 'px, 0px)';
            } else {
                _movingElements[i].style[_jsPrefix + 'Transform'] = 'translate3d(' + (p.start.x * _width + (p.diff.x * (_scrollPercent - p.start.percent) / p.diff.percent * _width)) + 'px, ' +
                    (p.start.y * _containerHeight + (p.diff.y * (_scrollPercent - p.start.percent) / p.diff.percent * _containerHeight)) + 'px, 0px)';
            }
        }
    }
}


function loop() {
    let _scrollOffset = window.pageYOffset || window.scrollTop;
    let iteration = Math.floor((_scrollOffset) / _scrollHeight);
    _scrollPercent = ((_scrollOffset) / _scrollHeight - iteration) || 0;
    updateElements(iteration);
    console.log((_scrollOffset) / _scrollHeight);

    requestAnimationFrame(loop);
}

loop();

window.addEventListener('resize', resize);

/* prefix detection http://davidwalsh.name/vendor-prefix */

function prefix() {
    var styles = window.getComputedStyle(document.documentElement, ''),
        pre = (Array.prototype.slice
                .call(styles)
                .join('')
                .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
        )[1],
        dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
    return {
        dom: dom,
        lowercase: pre,
        css: '-' + pre + '-',
        js: pre[0].toUpperCase() + pre.substr(1)
    };
}

/********  LEAF ANIMATION END ********/


/********  NAVBAR ANIMATION  ********/


$('.topNav').append($('.navigation').clone());


$('.topNav .navigation').hover(function () {
    $('.topNav').addClass('is-not-hover').addClass('is-hover');
}, function () {
    $('.topNav').removeClass('is-hover');
});

/********  NAVBAR ANIMATION END ********/


/********  NAVBAR CIRCLE ANIMATION ********/


$('.nav-button').hover(function () {
    if (!$(this).hasClass('selected')) {
        $(this).find(">:first-child").addClass('circle-off').addClass('circle-on');
    }
}, function () {
    if (!$(this).hasClass('selected')) {
        $(this).find(">:first-child").removeClass('circle-on');
    }
});

/********  NAVBAR CIRCLE ANIMATION END  ********/

let page2 = $(".page2"),
    screen = $(document);

/********  NAVBAR COLOR CHANGE  ********/
let navbarList = [$(".navbarBottom"), $(".navbarDots"), $(".navbarTop"), $(".mousey")];
let listSize = navbarList.length;

function checkColor() {
    {
        for (var i = 0; i < listSize; i++) {
            var navBarItem = navbarList[i];


            if (navBarItem.offset().top + 50 > page2.position().top) {

                navBarItem.removeClass('dis-invert').addClass('invert');
            } else {
                if (navBarItem.hasClass('invert')) navBarItem.removeClass('invert').addClass('dis-invert');
            }
        }

    }
}

setInterval(checkColor, 500);
/********  NAVBAR COLOR CHANGE END ********/
/********  SECTION 2 FIX ********/



let content2 = $('.content2');
setInterval(function () {

    if (page2.offset().top < screen.scrollTop()) {
        if (!content2.hasClass('fixed')) {
            content2.addClass('fixed');
        }

    } else {
        content2.removeClass('fixed')
    }
}, 5);
