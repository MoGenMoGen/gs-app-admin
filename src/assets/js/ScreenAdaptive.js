function setHtmlFontSize() {
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
}
setHtmlFontSize();
$(window).on('resize', setHtmlFontSize);