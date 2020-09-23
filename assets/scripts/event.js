

$('div.classify-descItem').find('a').bind('click', function () {
    let a = this;
    let name = $(a).find('span').html();
    _hmt.push(['_trackEvent', '博客', 'click', name]);
});