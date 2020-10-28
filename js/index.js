document.getElementsByTagName("html")[0].id = "";
let sidenav = document.getElementById("sidenav");
let pcScreen = window.matchMedia("(min-width: 768px)");
let navbarDots;
let movadexBarSidenav;


$(document).ready(function () {
        let _containerHeight = $(window).height() * 3;
        let $root = $('html, body');
        let _width, _height, _scrollHeight;
        let _movingElements = [];
        let _scrollPercent = 0;
        let pre = prefix();
        let _jsPrefix = pre.lowercase;
        if (_jsPrefix === 'moz') _jsPrefix = 'Moz';
        let listenerAttached;
        let topNav = $('.top-nav');


        topNav.append($('.navigation').clone());

        let animatedMouse = $(".mousey");
        movadexBarSidenav = $('.movadex-bar-sidenav');
        navbarDots = $(".navbar-dots");
        let navbarList = [$(".navbar-bottom"), navbarDots, $(".navbar-top"), $(".scroll-downs"), $('.closebtn'), $('.sidenav-icons'), $('.languages-sidenav'), movadexBarSidenav];
        let listSize = navbarList.length;
        let page1 = $('#page1'), page2 = $("#page2"), page3 = $("#page3"), page4 = $("#page4"), page5 = $("#page5");
        let content1 = page1.find(".content"), content2 = page2.find(".content"), content3 = page3.find(".content"),
            content4 = page4.find(".content"), content5 = page5.find(".content");


        let pages = [page1, page2, page3, page4, page5];
        let contents = [content1, content2, content3, content4, content5];

        let a1 = $('[href="#' + 'page1' + '"]'), a2 = $('[href="#' + 'page2' + '"]'), a3 = $('[href="#' + 'page3' + '"]'),
            a4 = $('[href="#' + 'page4' + '"]'), a5 = $('[href="#' + 'page5' + '"]');

        let ap1 = a1.parent(), ap2 = a2.parent(), ap3 = a3.parent(),
            ap4 = a4.parent(), ap5 = a5.parent();
        let ac1 = ap1.find(">:first-child"), ac2 = ap2.find(">:first-child"), ac3 = ap3.find(">:first-child"),
            ac4 = ap4.find(">:first-child"), ac5 = ap5.find(">:first-child");

        let alist = [[ac1, ap1], [ac2, ap2], [ac3, ap3], [ac4, ap4], [ac5, ap5]];

        let colors = ["#000", "#cac8bb", "#a3cec2", "#eaeaea", "#e1d2ce"];

        let telegramMob = $('.telegram-mob');
        let _positions = [
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
            for (let ii = 0; ii < 4; ii++) {
                for (let i = 0; i < _positions.length; i++) {

                    _positions[i].diff = {
                        percent: _positions[i].end.percent - _positions[i].start.percent,
                        x: _positions[i].end.x - _positions[i].start.x,
                        y: _positions[i].end.y - _positions[i].start.y,
                    };
                    let el = document.getElementsByClassName('leaf ' + _positions[i].name)[ii];
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


            if (pcScreen.matches) loadAllTheImages();

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
            let styles = window.getComputedStyle(document.documentElement, ''),
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
        for (let i = 0; i < listSize; i++) {
            let navBarItem = navbarList[i];
            navBarItem.addClass('dis-invert');
        }

        function checkColor() {
            {
                for (let i = 0; i < listSize; i++) {
                    let navBarItem = navbarList[i];


                    if (navBarItem.offset().top + 50 > page2.position().top) {
                        navBarItem.addClass('invert');
                    } else {
                        if (navBarItem.hasClass('invert')) navBarItem.removeClass('invert').addClass('dis-invert');
                    }
                }

            }
        }

        /********  NAVBAR COLOR CHANGE END ********/

        function loadAllTheImages() {
            $("img").each(function () {
                $(this).attr('src', $(this).attr('data-src'));
            });
        }

        /********  CODE INIT  ********/


        resize();
        initMovingElements();
        if (pcScreen.matches) {
            leafPositionLoop();
            loadAllTheImages();

        }


        window.addEventListener('resize', resize);

        /********  SECTIONS  ********/


        $(document).on('scroll touchmove touchend', onScreenChange);

        function onScreenChange() {

            if (pcScreen.matches) {
                leafPositionLoop();
            }

            checkColor();

            let offTop =  window.pageYOffset
            let NEXT = 1;
            let PREV = 0;


            for (let i = 0; i < pages.length; i++) {
                let page = pages[i];
                let content = contents[i];
                if (page.offset().top < offTop) {
                    if (!content.hasClass('fixed')) {
                        content.addClass('fixed');
                        sidenav.style.backgroundColor = colors[i];
                        changeNavItem(NEXT, i);
                        if (i === 1) page1.removeClass('leaf-background');
                        else if (i === 2) animatedMouse.addClass("hide");
                        else if (i === 4 && !pcScreen.matches) {
                            navbarDots.css('margin-bottom', '90px');
                            telegramMob.css('margin-bottom', '90px');
                        }
                    }
                } else if (content.hasClass('fixed')) {

                    content.removeClass('fixed');
                    sidenav.style.backgroundColor = colors[i - 1];

                    if (i === 1) page1.addClass('leaf-background');
                    else if (i === 2) animatedMouse.removeClass("hide");
                    else if (i === 4 && !pcScreen.matches) {
                        navbarDots.css('margin-bottom', '0');
                        telegramMob.css('margin-bottom', '0');
                    }

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
                let href = $.attr(this, 'href');
                try {
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
                catch (error) {
                }
            }
        );
        onScreenChange();


    }
);

let el = $('.navbar-left');
let fade = $('#darkness');
let text = $('.sidenav-text');
let langSide = $('.languages-sidenav');

let navOpened;


function openNav() {
    if (!navOpened) {
        navOpened = true;
        if (!pcScreen.matches) sidenav.style.width = "226px";
        else {
            let pad = vw(4);
            let wid = 170 + 16 + pad;
            sidenav.style.width = wid + "px";
        }
        sidenav.style.zIndex = '200';

        navbarDots.find(">:first-child").css('opacity', '0');
        movadexBarSidenav.css('opacity', '1');
        langSide.css('opacity', '1');

        text.css('margin-left', '-160px');
        fade.fadeTo(200, 1);
        fade.click(function () {
            closeNav()
        });
        setTimeout(function () {
            el.css('margin-left', '+=160px');
        }, 20);

    }


}

function closeNav() {
    if (navOpened) {
        navOpened = false;
        sidenav.style.width = "0";
        sidenav.style.zIndex = '90';

        navbarDots.find('>:first-child').css('opacity', '1');
        movadexBarSidenav.css('opacity', '0');
        langSide.css('opacity', '0');

        text.css('margin-left', '-200px');

        fade.fadeTo(200, 0, function () {
            $(this).hide();
        });
        el.css('margin-left', '-=160px');
    }


}

function vw(v) {
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (v * w) / 100;
}

