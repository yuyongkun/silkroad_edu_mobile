(function () {
    window.PicViewer = function (data, index) {
        data = data || [];
        index = index || 0;
        var temp = '<div id="picViewer"></ul>\
                        <div class="pic-wrap">';
        var mType;
        if (typeof data == 'string') {
            mType = 'mp4';
            // <video controlslist="nodownload" controls loop autoplay src="' + data + '"></video>
            temp += '<div class="close-pic">×</div>\
            <div class="pic-content">';
            temp += '<video id="my-video" class="video-js" controls preload="auto" width="960" height="540" poster="m.jpg" data-setup="{}">\
                        <source src="' + data + '" type="video/mp4">\
                        <p class="vjs-no-js"> To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a> </p>\
                    </video>';

        } else {
            temp += '<div class="pic-pre"></div>\
            <div class="pic-next"></div>\
            <div class="close-pic">×</div>\
            <div class="pic-content">';
            for (var i = 0, len = data.length; i < len; i++) {
                if (i == index) {
                    temp += '<div class="pic-item pic-num-' + i + ' pic-cur"><img src="' + data[i] + '"></div>'
                } else {
                    temp += '<div class="pic-item pic-num-' + i + '" style="opacity: 0;display:none"><img src="' + data[i] + '"></div>'
                }
            }
        }

        temp += '</div></div></div>';
        var $picViewer = $('#picViewer');
        if ($picViewer.length <= 0) {
            $('body').append(temp);
            $picViewer = $('#picViewer');
        }

        document.body.style.overflow = 'hidden';
        if (mType == 'mp4') {
            var myPlayer = videojs('my-video');
            $('.vjs-big-play-button')[0].style.display = "none";
            videojs("my-video").ready(function () {
                var myPlayer = this;
                myPlayer.play();
            });
        } else {
            var $picContent = $('.pic-content');
            $picContent.css({
                'line-height': $picContent.height() + 'px'
            });
            var $picCur = $picContent.find('.pic-cur');
            $picCur.show(function () {
                $picCur.addClass('animate').css('opacity', 1);
            });

            //上一张，下一张
            var count = $picContent.find('.pic-item').length - 1;
            var handler = function (_type) {
                $picCur = $picContent.find('.pic-cur');

                if ($picCur.length > 0) {
                    var num = $picCur[0].className.match(/\d/g).join('');
                    var $pic = $picContent.find('.pic-num-' + num);
                    $pic.hide().css('opacity', 0).removeClass('pic-cur').removeClass('animate');

                    if (_type == 'next') {
                        if (num == count) {
                            num = 0;
                        } else {
                            num++;
                        }
                    } else if (_type == 'pre') {
                        if (num == 0) {
                            num = count;
                        } else {
                            num--;
                        }
                    }
                    $pic = $picContent.find('.pic-num-' + num);
                    cImg = $pic.find('img')[0];
                    $pic.show(function () {
                        $pic.addClass('animate').css('opacity', 1).addClass('pic-cur');
                    });
                }
            };
            //图片缩放
            var cImg = $picCur.find('img')[0];
            var scaleMax = 1;
            var zoomOpt = function (type) {
                if (type === 'enlarge') {
                    scaleMax += 0.05;
                    if (scaleMax >= 4) {
                        scaleMax = 4;
                    }
                    cImg.style.transform = "scale(" + scaleMax + "," + scaleMax + ")";
                } else if (type === 'narrow') {
                    scaleMax -= 0.05;
                    if (scaleMax <= 0.1) {
                        scaleMax = 0.1;
                    }
                    cImg.style.transform = "scale(" + scaleMax + "," + scaleMax + ")";
                }

            };
            $(document).unbind('keypress').bind('keypress', function () {
                handler('next');
            });
            $('.pic-wrap').unbind('wheel mousewheel DOMMouseScroll').bind('wheel mousewheel DOMMouseScroll', function (event) {
                if (mType === 'mp4') return;
                var e = event.originalEvent;
                event.preventDefault();
                if (e.deltaY) {
                    delta = e.deltaY > 0 ? 1 : -1;
                } else if (e.wheelDelta) {
                    delta = -e.wheelDelta / 120;
                } else if (e.detail) {
                    delta = e.detail > 0 ? 1 : -1;
                }
                if (delta >= 1) {
                    zoomOpt('narrow');
                } else {
                    zoomOpt('enlarge');
                }
            });
            $('.pic-next').unbind('click').bind('click', function () {
                handler('next');
            });
            $('.pic-pre').unbind('click').bind('click', function () {
                handler('pre');
            });
        }

        $('.close-pic').unbind('click').bind('click', function () {
            document.body.style.overflow = '';
            $picViewer.remove();
            myPlayer&&myPlayer.dispose();
        });
    }
})();