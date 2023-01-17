const reader = require("xlsx");
const replace = require("replace-in-file");
const glob = require("glob");
var fs = require("fs");

// TODO: Change here to change sheet name
const sheetname = "LOGISTIC";
// TODO: Change path to excel file to translate here
const filePath = "./test-keywork.xlsx";

// Reading our test file
const file = reader.readFile(filePath);

let data = [];

const sheet = file.Sheets[sheetname];

const temp = reader.utils.sheet_to_json(sheet);
temp.forEach((res) => {
  data.push(res);
});

// TODO: change here to translate real data
const paths = [
  "../logistic/components/**/*.{tsx,js,ts,jsx}",
  "../logistic/containers/**/*.{tsx,js,ts,jsx}",
  "../logistic/pages/**/*.{tsx,js,ts,jsx}",
  "../logistic/providers/**/*.{tsx,js,ts,jsx}",
];

// TODO: create a folder name test-replace to test in repo change here to test
const testPaths = [
  // "../logistic/test-replace/**/*",
  "./test-key.js",
];
const ignore = ["../logistic/components/constants.{tsx,js,ts,jsx}"];

const options = {
  // TODO: Comment test and uncomment path to translate real data
  files: testPaths,
  // files: paths,
  ignore,
  countMatches: true,
  from: [],
  to: [],
};

(async () => {
  let abc = [];
  let singleWord = []
  let withoutKeyWord = []
  try {
    data.forEach((res) => {
      if (!res.ORIGINAL || res.AUTO == "x") {
        return;
      }
      var wordCount = res.ORIGINAL.match(/(\w+)/g).length;
      if (wordCount == 1) {
        singleWord.push(res)
        return
      }
      abc.push(res);
    });

    console.log(singleWord)
    abc.sort(function (a, b) {
      // ASC  -> a.length - b.length
      // DESC -> b.length - a.length
      return String(b.ORIGINAL).length - String(a.ORIGINAL).length;
    });
    abc.forEach((res) => {
      res.ORIGINAL.trim();
      res.ORIGINAL = escapeRegExp(res.ORIGINAL);
      var txt = new RegExp("(.*)(" + res.ORIGINAL + ")(.*)", "gm");
      options.from.push(txt);
      // If missing keyword will translate to fix me
      if (res.KEYWORD == "" || res.KEYWORD == undefined) {
        withoutKeyWord.push(res.ORIGINAL)
        res.KEYWORD = "Fix me";
      }
      options.to.push(`$1t(${res.KEYWORD})$3`);
    });
    const results = await replace(options);
  } catch (err) {
    console.error("Error occurred:", err);
  }
})();

function escapeRegExp(text) {
  return String(text).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// const containsVneseAt = [];
// let at = {};

// (async () => {
//   let needReadPaths = [];
//   options.files.map((value) => {
//     let paths = glob.sync(value);
//     needReadPaths.push(paths);
//   });

//   needReadPaths.map((paths) => {
//     paths.map((path) => {
//       let data = fs.readFileSync(path, {
//         encoding: "utf8",
//         flag: "r",
//       });
//       var allLines = data.split("\n");
//       let regex =
//         /[àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]/g;
//       for (var i = 0; i < allLines.length; i++) {
//         if (allLines[i].match(regex)) {
//           at = {
//             Path: path,
//             AtRow: i + 1,
//           };
//           containsVneseAt.push(at);
//         }
//       }
//     });
//   });

//   console.log(containsVneseAt);
//   if (containsVneseAt.length > 0) {
//     const ws = reader.utils.json_to_sheet(containsVneseAt);
//     reader.utils.book_append_sheet(file, ws, sheetname + "_detectVnese");
//     reader.writeFile(file, filePath);
//   }
// })();
