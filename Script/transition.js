(function (root, factory) {
        factory(root);
})(this, function (exports) {

    transition.prototype.option = {
        $index: '',
        $pages: '',
        $up: '',
        $bottom : '',
        pageCount: 0,
        currentNum: 0,
        isAnimating: false,
        endCurrtPage: false,
        endNextPage: false,
        loop: true,
        callback: null,
        backgroundContent: '',
        ColorAnimating: false
    };
    transition.prototype.init = function (option) {
        this.option.$index = option.$index;
        this.option.$pages = option.$index.children(".pt-page");
        this.option.$up = option.$up;
        this.option.$bottom = option.$bottom;
        this.option.pageCount = this.option.$pages.length;
        this.option.currentNum = option.currentNum ? option.currentNum : 0;
        this.option.callback = option.callback ? option.callback : null;
        this.option.loop = option.loop != undefined ? option.loop : true;
        this.option.backgroundContent = option.backgroundContent;
        this.option.$pages.each(function () {
            $curPage = $(this);
            console.log($curPage.attr('class'));
            $curPage.data("Orignalpage", $curPage.attr("class"));
           
        });
        this.option.$up.each(function () {
            $curUp = $(this);
            $curUp.data("Orignal", $curUp.attr("class"));
        });
        this.option.$bottom.each(function () {
            $curBottom = $(this);
            $curBottom.data("Orignal", $curBottom.attr("class"));
        });
        this.option.$pages.eq(this.option.currentNum).addClass("pt-page-current");
        this.option.$up.eq(this.option.currentNum).addClass("suggestcurrent");
        this.option.$bottom.eq(this.option.currentNum).addClass("suggestcurrent");
    };
    var previousColor = '';
    var Color = '';
    var ColorNum;
    transition.prototype.nextPage = function (down) {
        if (this.option.isAnimating == true) {
            return false;
        }
        else if (this.option.ColorAnimating == true) {
            return false;
        }
        this.option.isAnimating = true;
        this.option.ColorAnimating = true;
        var $currpage = this.option.$pages.eq(this.option.currentNum);
        var $currUp = this.option.$up.eq(this.option.currentNum);
        var $currBottom = this.option.$bottom.eq(this.option.currentNum);
        var $backColor = this.option.backgroundContent;
        if (this.option.currentNum < this.option.pageCount - 1 && down == true)
            ++this.option.currentNum;
        else if (this.option.currentNum >= this.option.pageCount - 1 && !down == true)
            this.option.currentNum = this.option.pageCount - 2;
        else if (this.option.currentNum >= this.option.pageCount - 1 && this.option.loop == true)
            this.option.currentNum = 0;
        else if (this.option.currentNum - 1 < 0 && !down == true)
            this.option.currentNum = this.option.pageCount - 1;
        else {
            --this.option.currentNum;
        }
        ColorNum = this.option.currentNum - 1;
        console.log(this.option.currentNum);
        var $nextpage = this.option.$pages.eq(this.option.currentNum).addClass("pt-page-current"),
            $nextUp = this.option.$up.eq(this.option.currentNum),
            $nextBottom = this.option.$bottom.eq(this.option.currentNum),
            onClass = '', outClass = '', backColor = '', outUpClass = '', onUpClass = '', outBottomClass = '',
            onBottomClass = '';

        switch (down) {
            case false:
                onClass = 'pt-page-moveFromTop';
                outClass = 'pt-page-moveToBottom';
                outUpClass = 'contentToBottom';
                outBottomClass = 'contentToBottomdelay';
                onUpClass = 'contentFromUp';
                onBottomClass = 'contentFromUpdelay';
                break;
            case true:
                onClass = 'pt-page-moveFromBottom';
                outClass = 'pt-page-moveToTop';
                outUpClass = 'contentToUp';
                outBottomClass = 'contentToUpdelay';
                onUpClass = 'contentFromBottom';
                onBottomClass = 'contentFromBottomdelay';
                break;
        }
        switch (ColorNum) {
            case -1:
                backColor = "content-colorOrignal";
                Color = "#5d5f5e";
                break;
            case 0:
                backColor = "content-colorBlue";
                Color = "#285be8";
                break;
            case 1:
                backColor = "content-colorPurple";
                Color = "#3c1e48";
                break;
            case 2:
                backColor = "content-colorBlack";
                Color = "#000";
                break;
            case 3:
                backColor = "content-colorDeepGreen";
                Color = "#141c24";
                break;
            case 4:
                backColor = "content-colorDeepCoff";
                Color = "#252525";
                break;
            case 5:
                backColor = "content-colorGrey";
                Color = "#4d4d4d";
                break;
            case 6:
                backColor = "content-colorGrey";
                Color = "#4d4d4d";
                break;
            case 7:
                backColor = "content-colorCoff";
                Color = "#231f1d";
                break;
        }
        var self = this;
        $currUp.addClass(outUpClass).on('webkitAnimationEnd', function () {
            $currUp.off('webkitAnimationEnd');
            $currUp.attr("class", $currBottom.data("Orignal"));
            });
        $currBottom.addClass(outBottomClass).on('webkitAnimationEnd', function () {
            $currBottom.off('webkitAnimationEnd');
            $currBottom.attr("class", $currBottom.data("Orignal"));
            $nextUp.addClass(onUpClass).on('webkitAnimationEnd', function () {
                $nextUp.attr("class", $nextUp.data("Orignal") + ' suggestcurrent');
            });
            $nextBottom.addClass(onBottomClass).on('webkitAnimationEnd', function () {
                $nextBottom.off('webkitAnimationEnd');
                $nextBottom.attr("class", $nextBottom.data("Orignal") + ' suggestcurrent');
            });
        });
        $backColor.removeClass(previousColor).addClass(backColor);
        previousColor = backColor;
        $currpage.addClass(outClass).on('webkitAnimationEnd', function () { 
            $currpage.off('webkitAnimationEnd');
            self.option.endCurrtPage = true;
            if (self.option.endNextPage) {
                self.onEndpages($currpage, $nextpage);
            }
        });
        $nextpage.addClass(onClass).on('webkitAnimationEnd', function () {
            $nextpage.off('webkitAnimationEnd');
            self.option.endNextPage = true;
            if (self.option.endCurrtPage) {
                self.onEndpages($currpage, $nextpage);
            }
        });
    };
    transition.prototype.resetPage = function (current, next) {
        current.attr('class', current.data('Orignalpage'));
        next.attr('class', next.data('Orignalpage') + ' pt-page-current');//!注意相连接之间要加空格！
        this.option.backgroundContent.css("background-color", Color);
        console.log(current.ClassName);
         };

    transition.prototype.onEndpages = function (current, next) {
        this.option.endCurrtPage = false;
        this.option.endNextPage = false;
        this.resetPage(current, next);
        this.option.isAnimating = false;
        this.option.ColorAnimating = false;
    };

    function transition(option) {
        this.init(option);
    }
    window.transition = transition;
});
