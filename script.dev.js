"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Page = function Page(name, link) {
  _classCallCheck(this, Page);

  this.name = name;
  this.link = link;
};

var sites = [new Page("Calculator", "/calculator"), new Page("browsers", "/dashboard")];
var index = 0;

function update() {
  console.log(index);

  try {
    $(".disp").text(sites[index].name);
  } catch (err) {
    $(".disp").text(sites[index].link);
  }

  $(".disp").attr("href", sites[index].link);
}

update();
$(".prev").on("click", function () {
  if (index == 0) {
    index = sites.length - 1;
  } else {
    index -= 1;
  }

  update();
});
$(".next").on("click", function () {
  index = (index + 1) % sites.length;
  update();
});