/********  LEAF ANIMATION  ********/

var _containerHeight = $(window).height() * 2.5;
(function() {
    window.onresize = displayWindowSize;
    window.onload = displayWindowSize;

    function displayWindowSize() {
        _containerHeight = window.innerHeight * 2.5;
        // your size calculation code here
    }
})();
var _width, _height, _scrollHeight;
var letters = document.getElementsByTagName('span');
var _movingElements = [];
var _scrollPercent = 0;
var pre = prefix();
var _jsPrefix = pre.lowercase;
if (_jsPrefix == 'moz') _jsPrefix = 'Moz';
var _cssPrefix = pre.css;
var _positions = [
    {
        name: 'leaf11',
        start: {
            percent: 0, x: 0, y: 0
        },
        end: {
            percent: 0.5, x: -0.5, y: -0.1
        }
    },
    {
        name: 'leaf12',
        start: {
            percent: 0, x: 0, y: 0
        },
        end: {
            percent: 1.6, x: -0.5, y: 0.5
        }
    },
    {
        name: 'leaf13',
        start: {
            percent: 0, x: 0, y: 0
        },
        end: {
            percent: 1, x: 0.5, y: 0.5
        }
    },
    {
        name: 'leaf14',
        start: {
            percent: 0, x: 0, y: 0
        },
        end: {
            percent: 0.8, x: 0.5, y: -0.5
        }
    },
    {
        name: 'leaf15',
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
    for (var i = 0; i < _positions.length; i++) {
        _positions[i].diff = {
            percent: _positions[i].end.percent - _positions[i].start.percent,
            x: _positions[i].end.x - _positions[i].start.x,
            y: _positions[i].end.y - _positions[i].start.y,
        };
        var el = document.getElementsByClassName('leaf ' + _positions[i].name)[0];
        _movingElements.push(el);
    }
}

function resize() {
    _width = window.innerWidth;
    _height = window.innerHeight;
    _scrollHeight = _containerHeight - _height;
}

function rotateLetters() {
    for (var i = 0; i < letters.length; i++) {
        letters[i].style[_jsPrefix + 'Transform'] = 'rotateY(' + (_scrollPercent * 500) + 'deg)'
    }
}

function updateElements() {
    for (var i = 0; i < _movingElements.length; i++) {
        var p = _positions[i];
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


function loop() {
    _scrollOffset = window.pageYOffset || window.scrollTop;
    _scrollPercent = _scrollOffset / _scrollHeight || 0;
    rotateLetters();
    updateElements();

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
    if (!$(this).hasClass('selected')) {$(this).find(">:first-child").addClass('circle-off').addClass('circle-on');}
}, function () {
    if (!$(this).hasClass('selected')) {$(this).find(">:first-child").removeClass('circle-on');}
});

