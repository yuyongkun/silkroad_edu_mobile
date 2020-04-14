(function () {
    var Common = {
        scrollTop: function () {
            return document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
        },
        initSwiper: function () {
            var swiperContainers = [].slice.call(document.querySelectorAll('.swiper-container'));
            for (var i = 0; i < swiperContainers.length; i++) {
                var swiperContainer = swiperContainers[i];

                var slidesPerView = +swiperContainer.getAttribute('slidesPerView');
                var slidesPerGroup = +swiperContainer.getAttribute('slidesPerGroup');
                var spaceBetween = +swiperContainer.getAttribute('spaceBetween');
                var autoplay = swiperContainer.getAttribute('autoplay');
                var loop = swiperContainer.getAttribute('loop');

                var id = 'swiper-container-' + parseInt(Math.random() * 10000);
                swiperContainer.setAttribute('id', id);
                var swiperSelector = '#' + id; //swiper插件初始化的目标对象
                var $swiperContainer = $(swiperSelector); //swiper-container对象
                if (autoplay && autoplay.toString() == 'false') {
                    autoplay = false;
                } else {
                    autoplay = autoplay || 3000;
                }
                var swiperOption = {
                    autoplay: autoplay, //可选选项，自动滑动
                    loop: true,
                    simulateTouch: false,
                    prevButton: swiperSelector + ' .swiper-button-next',
                    nextButton: swiperSelector + ' .swiper-button-prev',
                    pagination: swiperSelector + ' .swiper-pagination',
                };
                if (loop) {
                    Object.assign(swiperOption, {
                        loop: loop
                    })
                }
                if (slidesPerView) {
                    Object.assign(swiperOption, {
                        slidesPerView: slidesPerView
                    })
                }
                if (slidesPerGroup) {
                    Object.assign(swiperOption, {
                        slidesPerGroup: slidesPerGroup
                    })
                }
                if (spaceBetween) {
                    Object.assign(swiperOption, {
                        spaceBetween: spaceBetween
                    })
                }
                var swiper = new Swiper(swiperSelector, swiperOption);
                var $swiperSlide = $swiperContainer.find('.swiper-slide'); //swiper-slide对象
                // 鼠标移入
                $swiperSlide.mouseenter(function () {
                    // 鼠标引入暂停swiper滑动
                    swiper.stopAutoplay();
                })
                // 鼠标移出
                $swiperSlide.mouseleave(function () {
                    // 鼠标离开开启swiper滑动
                    swiper.startAutoplay();
                })
            }
        },
        initBd: function () {
            var _hmt = _hmt || [];
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?f408873de1c2f4a3b941340fcdd597a0";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        },
        headerMenu: function () {
            var $headerMask = $('#header-mask');
            var $headerTp = $('#header-tp');
            var $headerMenu = $headerTp.find('.header-menu');
            var $headerMenuList = $headerTp.find('.header-menu-list');
            $headerMenu.bind('click', function () {
                if ($headerMask[0].style.display === 'none' || $headerMask.css('display') === 'none') {
                    $headerMask.show();
                    $headerMenuList.show();
                    $headerMenu.addClass('header-menu-active');
                } else {
                    //二级导航显示的话，先隐藏二级导航，再显示menu导航
                    if ($headernavFirstCourse.find('.header-nav-course:visible').length > 0) {
                        $headerNavCourse.hide();
                        $headerMenuList.show();
                        $headerMenu.addClass('header-menu-active');
                    } else {
                        $headerMask.hide();
                        $headerMenuList.hide();
                        $headerMenu.removeClass('header-menu-active');
                    }


                }


            });
            var headerMenuFirstLength = $headerMenuList.find('.header-menu-first').length - 1;
            $headerMenuList.find('.header-menu-first').bind('click', function () {
                if ($(this).index() == 0 || $(this).index() == headerMenuFirstLength) return;
                if ($(this).hasClass('arrow-right')) {
                    $(this).removeClass('arrow-right').addClass('arrow-down');
                    $(this).find('.header-menu-secondlist').show();
                } else {
                    $(this).removeClass('arrow-down').addClass('arrow-right');
                    $(this).find('.header-menu-secondlist').hide();
                }

            });

            // 二级导航 
            var $headernavFirstCourse = $('#header-nav-first-course');
            var $headerNavCourse = $headernavFirstCourse.find('.header-nav-course');
            $headernavFirstCourse.bind('click', function () {
                $headerNavCourse.toggle();
                $headerMask.toggle();
                $headerMenuList.hide();
                $headernavFirstCourse.find('.header-menu-secondlist').hide();
            })
            $headerNavCourse.find('.header-menu-first').bind('click', function (e) {
                e.stopPropagation();
                $(this).parent().find('.header-menu-secondlist').hide();
                $(this).find('.header-menu-secondlist').toggle();
            })
            // mask
            $headerMask.unbind('click').bind('click', function () {
                $headerMenuList.hide();
                if ($headerMask[0].style.display === 'none' || $headerMask.css('display') === 'none') {
                    $headerMask.show();
                } else {
                    $headerMask.hide();
                }
                $headerNavCourse.hide();
                $headerMenu.removeClass('header-menu-active');
            })

        },
        tabHandler: function () {
            $('.section-nav-tab .section-nav-item').bind('click', function () {
                var $this = $(this);
                var $parent = $this.parent();
                var index = $this.index();
                $this.addClass('section-nav-active').siblings('.section-nav-item').removeClass('section-nav-active');
                $parent.next('.section-tab-list').find('.section-tab-col').css('display', 'none').eq(index).css('display', 'flex');
            })
        },
        deleteChart: function () {
            if (location.origin.indexOf('localhost') > -1) {
                var deleteTimmer = setInterval(function () {
                    if ($('#doyoo_f_chat').length > 0) {
                        $('#doyoo_f_chat ,#doyoo_panel').remove();
                        clearInterval(deleteTimmer)
                    }
                }, 10)
            }
        },
        global: function () {
            // 初始化swiper插件
            this.initSwiper();

            // 百度统计
            this.initBd();

            // menu菜单
            this.headerMenu();

            // tab切换
            this.tabHandler();

            // 删除第三方聊天
            // this.deleteChart();

        },
    }
    Common.global();
    window.Common = Common;
})()