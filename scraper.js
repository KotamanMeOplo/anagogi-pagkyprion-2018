var page = require('webpage').create();
var grades = [];
var inhtml = '';
var curPage = 0;
var pages = 308;

var getDataFromNextPage = function() {
  page.evaluate(function() {
    document.getElementsByClassName('dxWeb_pNext_DevEx')[0].parentElement.click();
  });
  
  window.setTimeout(function() {
    if(curPage < pages - 1) {
      var txt = page.plainText;
      var nums = txt.match(/\[\d{1,3}\]: \d{1,2}\.\d{3}/g);
      for(var i = 0; i < nums.length; i ++){
        grades.push(nums[i]);
      }
      inhtml += txt;
      curPage ++;
      console.log(curPage);
      getDataFromNextPage();
    } else {
      console.log(grades.length);
      var fs = require('fs');

      var path = 'output.txt';
      var path2 = 'html.txt';
      var content = grades.join('\n');
      fs.write(path, content, 'w');
      fs.write(path2, inhtml, 'w');
      phantom.exit();
    }
  }, 1000);
}

page.open('https://eservices.moec.gov.cy/ypexams/pagkypries/2018/vathmologies', function(status) {
  var txt = page.plainText;
  var nums = txt.match(/\[\d{1,3}\]: \d{1,2}\.\d{3}/g);
  for(var i = 0; i < nums.length; i ++){
    grades.push(nums[i]);
  }
  inhtml += txt;
  getDataFromNextPage();
});