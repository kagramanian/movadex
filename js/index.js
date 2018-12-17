// var __REPLAIN_ = '4c0db722-3dae-4b0f-b3e1-f8d862b96bf7';
//
// (function (u) {
//     var s = document.createElement('script');
//     s.type = 'text/javascript';
//     s.async = true;
//     s.src = u;
//     var x = document.getElementsByTagName('script')[0];
//     x.parentNode.insertBefore(s, x);
// })('https://widget.replain.cc/dist/client.js');


var _containerHeight = $(window).height() * 3;

var _width, _height, _scrollHeight;
var _movingElements = [];
var _scrollPercent = 0;
var pre = prefix();
var _jsPrefix = pre.lowercase;
if (_jsPrefix == 'moz') _jsPrefix = 'Moz';
var _cssPrefix = pre.css;
var pcScreen = window.matchMedia("(min-width: 768px)");
var listenerAttached;
var navBarCloned = false;

let screen = $(document);
let page2 = $("#page2"), page3 = $("#page3"), page4 = $("#page4");
let content2 = page2.find(".content"), content3 = page3.find(".content"), content4 = page4.find(".content");
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

/********  LEAF ANIMATION  ********/


function initMovingElements() {
    //4 is number of pages with leafs
    for (var ii = 0; ii < 4; ii++) {
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
    _positions = _positions.concat(_positions);
    _positions = _positions.concat(_positions);

}


function resize() {
    _width = window.innerWidth;
    _height = window.innerHeight;
    _containerHeight = window.innerHeight * 3;
    _scrollHeight = (_containerHeight - _height);
    animateNavbar();

}


function updateElements(iteration) {

    for (let i = iteration * 5; i < (iteration + 1) * 5; i++) {
        let p = _positions[i];
        if (p != null) {
            if (_movingElements[i] != null) {
                if (_scrollPercent <= p.start.percent) {
                    _movingElements[i].style[_jsPrefix + 'Transform'] = 'translate3d(' + (p.start.x * _width) + 'px, ' + (p.start.y * _containerHeight) + 'px, 0px)';
                } else if (_scrollPercent >= p.end.percent) {
                    _movingElements[i].style[_jsPrefix + 'Transform'] = 'translate3d(' + (p.end.x * _width) + 'px, ' + (p.end.y * _containerHeight) + 'px, 0px)';
                } else {
                    _movingElements[i].style[_jsPrefix + 'Transform'] = 'translate3d(' + (p.start.x * _width + (p.diff.x * (_scrollPercent - p.start.percent) / p.diff.percent * _width)) + 'px, ' +
                        (p.start.y * _containerHeight + (p.diff.y * (_scrollPercent - p.start.percent) / p.diff.percent * _containerHeight)) + 'px, 0px)';
                }
            }
            else {
                location.reload();
            }
        }
    }
}


function leafPositionLoop() {
    let _scrollOffset = window.pageYOffset || window.scrollTop;
    let iteration = Math.floor((_scrollOffset) / _scrollHeight);
    _scrollPercent = ((_scrollOffset) / _scrollHeight - iteration) || 0;
    if (iteration < 4) {
        updateElements(iteration);
    }
    //  requestAnimationFrame(leafPositionLoop);
}


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




function animateNavbar() {
    if (pcScreen.matches) {
        if (!listenerAttached) {
            listenerAttached = true;
            var topNav = $('.top-nav');


            if (!navBarCloned) {
                topNav.append($('.navigation').clone());
                navBarCloned = true;
            }


            $('.top-nav .navigation').hover(function () {
                topNav.addClass('is-not-hover').addClass('is-hover');
            }, function () {
                topNav.removeClass('is-hover');
            });


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
        }

        /********  NAVBAR CIRCLE ANIMATION END  ********/

    } else {
        if (listenerAttached) {
            listenerAttached = false;
            $('.top-nav .navigation').unbind("mouseenter mouseleave");
            $('.nav-button').unbind("mouseenter mouseleave");
            $('.top-nav').removeClass('is-hover')
        }
    }
}


/********  NAVBAR COLOR CHANGE  ********/

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

/********  NAVBAR COLOR CHANGE END ********/


/********  CODE INIT  ********/


resize();
initMovingElements();

if (pcScreen.matches) {


    leafPositionLoop();
}

window.addEventListener('resize', resize);
let navbarList = [$(".navbar-bottom"), $(".navbar-dots"), $(".navbar-top"), $(".mousey")];
let listSize = navbarList.length;

/********  FIX SECTIONS  ********/

var a1 = $('[href="#' + 'page1' + '"]'), a2 = $('[href="#' + 'page2' + '"]'), a3 = $('[href="#' + 'page3' + '"]'),
    a4 = $('[href="#' + 'page4' + '"]');

var ap1 = a1.parent(), ap2 = a2.parent(), ap3 = a3.parent(),
    ap4 = a4.parent();
var ac1 = ap1.find(">:first-child"), ac2 = ap2.find(">:first-child"), ac3 = ap3.find(">:first-child"),
    ac4 = ap4.find(">:first-child");


$(document).on('scroll touchmove touchend', onScreenChange);
function onScreenChange() {

    if (pcScreen.matches) {
        leafPositionLoop();
    }

    checkColor();

    var offTop = screen.scrollTop();

    if (page2.offset().top < offTop) {
        if (!content2.hasClass('fixed')) {
            ap1.removeClass('selected');
            ac1.removeClass('circle-on');

            ap2.addClass('selected');
            ac2.addClass('circle-off').addClass('circle-on');
            content2.addClass('fixed');
        }
        if (page3.offset().top < offTop) {
            if (!content3.hasClass('fixed')) {
                ap2.removeClass('selected');
                ac2.removeClass('circle-on');


                ap3.addClass('selected');
                ac3.addClass('circle-off').addClass('circle-on');

                content3.addClass('fixed');
            }
            if (page4.offset().top < offTop) {
                if (!content4.hasClass('fixed')) {
                    content4.addClass('fixed');

                    ap3.removeClass('selected');
                    ac3.removeClass('circle-on');


                    ap4.addClass('selected');
                    ac4.addClass('circle-off').addClass('circle-on');

                    $('#page1').removeClass('leaf-background');
                }


            } else if (content4.hasClass('fixed')) {
                content4.removeClass('fixed');
                ap3.addClass('selected');
                ac3.addClass('circle-off').addClass('circle-on');


                ap4.removeClass('selected');
                ac4.removeClass('circle-on');

                $('#page1').addClass('leaf-background');
            }
        } else if (content3.hasClass('fixed')) {
            content3.removeClass('fixed');

            ap2.addClass('selected');
            ac2.addClass('circle-off').addClass('circle-on');


            ap3.removeClass('selected');
            ac3.removeClass('circle-on');

        }

    }
    else if (content2.hasClass('fixed')) {
        ap2.addClass('selected');
        ac1.addClass('circle-off').addClass('circle-on');

        ap2.removeClass('selected');
        ac2.removeClass('circle-on');

        content2.removeClass('fixed')

    }


}
$(".mousey").click(function () {
    $(this).toggleClass("hide");
});
var $root = $('html, body');

// var path = window.location.pathname.substring(1);
//     console.log(path);

$('a[href^="#"]').click(function () {
        var href = $.attr(this, 'href');
        console.log(href);
        if (href === "#page1") {
            $('html, body').animate({
                scrollTop: 0
            }, 1000, function () {
                window.location.hash = href;
            });

            return false;
        } else {
            $root.animate({
                scrollTop: $(href).offset().top
            }, 1000, function () {
                window.location.hash = href;
            });

            return false;
        }
        onScreenChange()
    }
);


