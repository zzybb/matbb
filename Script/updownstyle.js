addLoadEvent(updownstyle);
function updownstyle() {
    var h1 = $("hr.bold1"),
        h2 = $("hr.bold2"),
        h3 = $("hr.bold3"),
        h4 = $("hr.bold4"),
        a1 = $("a.up1"),
        a2 = $("a.down"),
        span1 = $("span.suggest"),
        spanInline = $("span.inline"),
        spana = $("span .suggest b");
    a1.mouseover(function () {
        h1.addClass("rotateup1");
        h2.addClass("rotateup2");
    });
    a1.mouseleave(function () {
        h1.removeClass("rotateup1");
        h2.removeClass("rotateup2");
    });
    a2.mouseover(function () {
        h3.addClass("rotateup2");
        h4.addClass("rotateup1");
    });
    a2.mouseleave(function () {
        h3.removeClass("rotateup2");
        h4.removeClass("rotateup1");
    });
    a1.click(function () {
        h1.toggleClass("rotate1");
        h2.toggleClass("rotate2");
    });
    a2.click(function () {
        h3.toggleClass("rotate2");
        h4.toggleClass("rotate1");
    });
    span1.mouseover(function () {
        spanInline.addClass("inline-rotate");
        spana.fadeIn(150);
    })
    span1.mouseleave(function () {
        spanInline.removeClass("inline-rotate");
        spana.fadeOut(150);
    })
}


