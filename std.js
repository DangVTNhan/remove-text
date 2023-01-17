var fs = require("fs");

fs.readFile("./test-key.js", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }

  var original = "Thiết lập Phường/Xã";

  var txt = new RegExp("(.*)(" + original + ")(.*)", "gm");
  //   var result = data.match('/(.*)(Thiết lập Phường/Xã)(.*)/')
  var newResult = data.replaceAll(txt, "$1abcxyz$3");
  console.log(newResult);

  fs.writeFile("./test-key.js", newResult, "utf8", function (err) {
    if (err) return console.log(err);
  });
});

// var str1 = "Nhân 123123"
// var reg1 = new RegExp("\\b" +  "Nhân" + "\\b" , "g")
// console.log(reg1.test(str1))

// var str2 = "Mã 123"
// var reg2 = new RegExp("(.*)(" + str2 + ")(.*)", "g")
// console.log(reg2.test("Mã"))

// var str3 = "Mã"
// var reg3 = new RegExp(str3, "g")
// console.log(reg3.test(str3))

// function escapeRegExp(text) {
//     return String(text).replace(/[-[\]{}()*+?.,\\^$|#\s]ã/g, "\\$&");
//   }
