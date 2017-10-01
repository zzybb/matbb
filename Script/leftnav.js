addLoadEvent(leftnav);
function leftnav() {
    var element = $("a.leftnav"),
        elementhr = $("a.leftnav hr"),
        home = $("div.home"),
        navcontent = $("div.navcontent");
    element.mouseover(function () {                                                  //鼠标移入移出效果；
        elementhr.animate({ top: "-0.838em", marginTop: "0.513em" }, 200);
    });
    element.mouseleave(function () {
        elementhr.animate({
            top: "-0.438em",
            marginTop: "0.313em"
        }, 200);
    });                                                                    
    element.click(function () {
        home.toggleClass("pageleft");
        navcontent.toggleClass("pageright");
        elementhr.eq(1).toggleClass("hrrotate");
    });
}
