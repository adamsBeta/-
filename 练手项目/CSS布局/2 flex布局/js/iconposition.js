// 副导航栏
window.onload = function () {
  var list = document.getElementsByClassName("subnav-entry-icon");
  for (i = 0; i < list.length; i++) {
    var index = i * 28;
    list[i].style.backgroundPosition = "0 -" + index + "px";
  }
};
