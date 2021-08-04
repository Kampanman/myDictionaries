// トップへ戻るボタン
var pageTopStyle =
  "position: fixed;"+
  "bottom: 15px;"+
  "right: 30px;"+
  "width: 50px;"+
  "height: 50px;";
var linkStyle =
  "border-radius: 50%;"+
  "background: #006e9f;"+
  "color: #fff;"+
  "line-height: 50px;"+
  "padding: 10px;"+
  "text-decoration: none;";

$('body').append(
  `<div id='page-top' style='${pageTopStyle}'><a href='#top' style='${linkStyle}'>↑TOP↑</a></div>`
);

$(function(){
  // TOPに戻るボタン
      var topBtn = $('#page-top');
      topBtn.hide();
   
      //スクロールが100に達したらボタン表示
      $(window).scroll(function () {
          var w = $(window).width();
          if ($(this).scrollTop() > 500) {
              topBtn.fadeIn();
          } else {
              topBtn.fadeOut();
          }
      });
   
      //スムーススクロールでページトップへ
      topBtn.click(function () {
          $('body,html').animate({
              scrollTop: 0
          }, 500);
          return false;
      });
  });