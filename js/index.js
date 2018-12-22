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

document.getElementsByTagName("html")[0].id = "";
var sidenav = document.getElementById("sidenav");
var pcScreen = window.matchMedia("(min-width: 768px)");
var navbarDots;
$(document).ready(function () {

        var _containerHeight = $(window).height() * 3;
        var $root = $('html, body');
        var _width, _height, _scrollHeight;
        var _movingElements = [];
        var _scrollPercent = 0;
        var pre = prefix();
        var _jsPrefix = pre.lowercase;
        if (_jsPrefix == 'moz') _jsPrefix = 'Moz';
        var _cssPrefix = pre.css;
        var listenerAttached;
        let screen = $(document);

        var topNav = $('.top-nav');

        topNav.append($('.navigation').clone());

        var animatedMouse = $(".mousey");
        navbarDots = $(".navbar-dots");
        let navbarList = [$(".navbar-bottom"), navbarDots, $(".navbar-top"), $(".scroll-downs"), $('.closebtn'), $('.sidenav-icons'), $('.languages-sidenav'), $('.movadex-bar-sidenav')];
        let listSize = navbarList.length;
        let page1 = $('#page1'), page2 = $("#page2"), page3 = $("#page3"), page4 = $("#page4"), page5 = $("#page5");
        let content1 = page1.find(".content"), content2 = page2.find(".content"), content3 = page3.find(".content"),
            content4 = page4.find(".content"), content5 = page5.find(".content");


        let pages = [page1, page2, page3, page4, page5];
        let contents = [content1, content2, content3, content4, content5];

        var a1 = $('[href="#' + 'page1' + '"]'), a2 = $('[href="#' + 'page2' + '"]'), a3 = $('[href="#' + 'page3' + '"]'),
            a4 = $('[href="#' + 'page4' + '"]'), a5 = $('[href="#' + 'page5' + '"]');

        var ap1 = a1.parent(), ap2 = a2.parent(), ap3 = a3.parent(),
            ap4 = a4.parent(), ap5 = a5.parent();
        var ac1 = ap1.find(">:first-child"), ac2 = ap2.find(">:first-child"), ac3 = ap3.find(">:first-child"),
            ac4 = ap4.find(">:first-child"), ac5 = ap5.find(">:first-child");

        var alist = [[ac1, ap1], [ac2, ap2], [ac3, ap3], [ac4, ap4], [ac5, ap5]];

        var colors = ["#000", "#cac8bb", "#a3cec2", "#eaeaea", "#e1d2ce"];

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


                    // $('.top-nav .navigation').hover(function () {
                    //     topNav.addClass('is-not-hover').addClass('is-hover');
                    // }, function () {
                    //     topNav.removeClass('is-hover');
                    // });


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
                    //$('.top-nav .navigation').unbind("mouseenter mouseleave");
                    //$('.top-nav').removeClass('is-hover');

                    $('.nav-button').unbind("mouseenter mouseleave");
                }
            }
        }


        /********  NAVBAR COLOR CHANGE  ********/
        for (var i = 0; i < listSize; i++) {
            var navBarItem = navbarList[i];
                navBarItem.addClass('dis-invert');
        }

        function checkColor() {
            {
                for (var i = 0; i < listSize; i++) {
                    var navBarItem = navbarList[i];


                    if (navBarItem.offset().top + 50 > page2.position().top) {
                        navBarItem.addClass('invert');
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

        /********  SECTIONS  ********/


        $(document).on('scroll touchmove touchend', onScreenChange);

        function onScreenChange() {

            if (pcScreen.matches) {
                leafPositionLoop();
            }

            checkColor();

            // console.log(page3.position().top());
            var offTop = screen.scrollTop();
            var NEXT = 1;
            var PREV = 0;


            for (var i = 0; i < pages.length; i++) {
                var page = pages[i];
                var content = contents[i];
                if (page.offset().top < offTop) {
                    if (!content.hasClass('fixed')) {
                        content.addClass('fixed');
                        sidenav.style.backgroundColor = colors[i];
                        changeNavItem(NEXT, i);
                        if (i === 1) page1.removeClass('leaf-background');
                        else if (i === 2) animatedMouse.addClass("hide");
                        else if (i === 4 && !pcScreen.matches) navbarDots.css('margin-bottom', '90px');
                    }
                } else if (content.hasClass('fixed')) {

                    content.removeClass('fixed');
                    sidenav.style.backgroundColor = colors[i - 1];

                    if (i === 1) page1.addClass('leaf-background');
                    else if (i === 2) animatedMouse.removeClass("hide");
                    else if (i === 4 && !pcScreen.matches) navbarDots.css('margin-bottom', '0');

                    changeNavItem(PREV, i);
                    break;

                }

            }

            function changeNavItem(nextOrPrev, i) {
                if (nextOrPrev === NEXT) {
                    if (i !== 0) {
                        alist[i - 1][0].removeClass('circle-on');
                        alist[i - 1][1].removeClass('selected');
                    } else {
                        alist[0][0].removeClass('circle-on');
                        alist[0][1].removeClass('selected');
                    }
                    alist[i][0].addClass('circle-off').addClass('circle-on');
                    alist[i][1].addClass('selected');

                } else {
                    alist[i][0].removeClass('circle-on');
                    alist[i][1].removeClass('selected');
                    if (i !== 0) {
                        alist[i - 1][0].addClass('circle-off').addClass('circle-on');
                        alist[i - 1][1].addClass('selected');
                    } else {
                        alist[0][0].addClass('circle-off').addClass('circle-on');
                        alist[0][1].addClass('selected');
                    }
                }

            }
        }

        /********  NAVBAR SLIDING  ********/


        $('a[href^="#"]').click(function () {
                var href = $.attr(this, 'href');
                console.log(href);
                if (href === "#page1") {
                    $root.animate({
                        scrollTop: 0
                    }, 1000);
                    return false;
                } else {
                    $root.animate({
                        scrollTop: $(href).position().top + 1
                    }, 1000);
                    return false;
                }
            }
        );
        onScreenChange();


    }
);

var el = $('.navbar-left');
var fade = $('#darkness');
var text = $('.sidenav-text');
var navOpened;


function openNav() {
    if (!navOpened) {
        navOpened = true;
        if (!pcScreen.matches) sidenav.style.width = "226px";
        else {
            var pad = vw(4);
            var wid = 170 + 16 + pad;
            sidenav.style.width = wid + "px";
        }
        navbarDots.find(">:first-child").css('opacity', '0');
        sidenav.style.zIndex = '200';
        text.css('margin-left', '-170px');
        fade.fadeTo(200, 1);
        fade.click(function () {
            closeNav()
        });
        setTimeout(function () {
            el.css('margin-left', '+=170px');
        }, 20);

    }


}

function closeNav() {
    if (navOpened) {
        navOpened = false;
        sidenav.style.width = "0";
        sidenav.style.zIndex = '90';
        navbarDots.find('>:first-child').css('opacity', '1');
        text.css('margin-left', '-200px');

        fade.fadeTo(200, 0, function () {
            $(this).hide();
        });
        el.css('margin-left', '-=170px');
    }


}

function vh(v) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (v * h) / 100;
}

function vw(v) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (v * w) / 100;
}