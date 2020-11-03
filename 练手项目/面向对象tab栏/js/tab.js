var that;
class Tab {
  constructor(id) {
    //获取元素
    that = this;
    this.main = document.querySelector(id);
    this.add = this.main.querySelector(".tabadd");
    //li的父元素
    this.ul = this.main.querySelector(".firstnav ul:first-child");
    //section的父元素
    this.fsection = this.main.querySelector(".tabscon");
    this.init();
  }
  //动态更新获取所有li和section元素
  updateNode() {
    this.lis = this.main.querySelectorAll("li");
    this.sections = this.main.querySelectorAll("section");
    this.remove = this.main.querySelectorAll(".icon-guanbi");
    this.spans = this.main.querySelectorAll(".firstnav li span:first-child");
  }
  init() {
    this.updateNode();
    //init 初始化操作让相关元素绑定事件
    this.add.onclick = this.addTab;
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i;
      this.lis[i].onclick = this.toggleTab;
      this.remove[i].onclick = this.removeTab;
      this.spans[i].ondblclick = this.editTab;
      this.sections[i].ondblclick = this.editTab;
    }
  }
  //1.切换功能
  toggleTab() {
    that.clearClass();
    this.className = "liactive";
    that.sections[this.index].className = "conactive";
  }

  //2.添加功能
  addTab() {
    that.clearClass();
    //创建li元素和section元素
    var random = Math.random();
    var li =
      '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
    var section = '<section class="conactive">测试' + random + "</section>";
    //把这两个元素追加到对应的父元素中
    that.ul.insertAdjacentHTML("beforeend", li);
    that.fsection.insertAdjacentHTML("beforeend", section);
    that.init();
  }

  //3.删除功能
  removeTab(e) {
    //阻止冒泡，防止出发li的点击切换事件
    e.stopPropagation();
    var index = this.parentNode.index;
    console.log(index);
    that.lis[index].remove();
    that.sections[index].remove();
    that.init();
    //当删除的不是选中状态的li时，原来的选中状态不变
    if (document.querySelector(".liactive")) return;
    //当删除了选中状态的li时，让其前一个li处于选定状态
    index--;
    that.lis[index] && that.lis[index].click();
  }

  //4.修改功能
  editTab() {
    var str = this.innerHTML;
    //双击禁止选定文字
    window.getSelection
      ? window.getSelection().removeAllRanges()
      : document.selection.empty();
    this.innerHTML = '<input tpye="text">';
    var input = this.children[0];
    input.value = str;
    input.select(); //文本框中的文字处于选定状态
    //当文本框失去焦点，就将文本框中的值还原给span
    input.onblur = function () {
      this.parentNode.innerHTML = this.value;
    };
    //按下回车也可以将文本框中的值给span
    input.onkeyup = function (e) {
      if (e.keyCode === 13) {
        //手动调用表单失去焦点事件，不需要鼠标操作
        this.blur();
      }
    };
  }

  //清除样式
  clearClass() {
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].className = "";
      this.sections[i].className = "";
    }
  }
}

new Tab("#tab");
