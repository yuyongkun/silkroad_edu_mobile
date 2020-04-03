(function () {
    function SwiperIe(param) {
        this.$container = param.container;
        this.onInit = param.onInit;
        this.init();
    }
    SwiperIe.prototype.moveToLeft = function () {
        $(this.$swiperSlide.get(this.preIdx)).animate({
            right: '100%'
        }, 500);
        $(this.$swiperSlide.get(this.idx)).css({
            right: '-100%'
        }).animate({
            right: '0'
        }, 500);
    }
    SwiperIe.prototype.moveToRight = function () {
        $(this.$swiperSlide.get(this.preIdx)).animate({
            right: '-100%'
        }, 500);
        $(this.$swiperSlide.get(this.idx)).css({
            right: '100%'
        }).animate({
            right: '0'
        }, 500);
    }
    SwiperIe.prototype.resetStatus = function () {
        var $swiperpaginationbullet = this.$swiperPagination.find('.swiper-pagination-bullet');
        $swiperpaginationbullet.removeClass('swiper-pagination-bullet-active');
        $swiperpaginationbullet.get(this.idx).className = 'swiper-pagination-bullet swiper-pagination-bullet-active';
    }
    SwiperIe.prototype.bindEvent = function () {
        var self = this;
        //点击分页导航
        this.$container.on('click', '.swiper-pagination-bullet', function () {
            self.preIdx = self.$swiperPagination.find('.swiper-pagination-bullet-active').index();
            self.idx = $(this).index();
            self.resetStatus();
            if (self.idx > self.preIdx) {//往左滚动
                self.moveToLeft();
            } else {//往右滚动
                self.moveToRight();
            }
        });
    }
    SwiperIe.prototype.init = function () {
        var self = this;
        this.$swiperSlide = this.$container.find('.swiper-slide');
        this.len = this.$swiperSlide.length;//图片个数
        this.$swiperPagination = this.$container.find('.swiper-pagination');
        this.$container.find('.swiper-slide img.swiper-lazy').each(function (i, objDom) {
            objDom.src = objDom.getAttribute('data-src');
            var paginationClassName = 'swiper-pagination-bullet';
            if (i === 0) {
                paginationClassName = 'swiper-pagination-bullet swiper-pagination-bullet-active';
            }
            self.$swiperPagination.append('<span class="' + paginationClassName + '"></span>');
        });
        this.bindEvent();
        this.onInit && this.onInit();
    }
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function ($) {
            return SwiperIe;
        })
    } else {
        window.SwiperIe = SwiperIe;
    }
})();