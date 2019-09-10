$(document).ready(function () {
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        autoplay: 3000,
    });

    $("#agreement").click(function () {
        $("#agreementDialog").fadeIn();
    });

    $("#privacy").click(function () {
        $("#privacyDialog").fadeIn();
    });

    $(".dialog-close").click(function () {
        $(".dialog-shadow").fadeOut();
    });
});
