var shift = new transition({
    $index: $(".home"),
    backgroundContent: $("span.content"),
    $up:$("div.up"),
    $bottom: $("div.bottom")
})


$('a.down').click(function () {
    shift.nextPage(true);

         
});
$('a.up1').click(function () {
    shift.nextPage(false);

});


