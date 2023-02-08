const reader = require("xlsx");
const replace = require("replace-in-file");
const glob = require("glob");
var fs = require("fs");

// TODO: Change here to change sheet name
const sheetname = "wms-app";
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
  // LOGISTIC
  // "../logistic/pages/logistic/area/reconcile.tsx",
  // "../logistic/pages/logistic/area/hub/**/limit.tsx",
  // `../logistic/pages/logistic/area/hub/**/reconcile/**/*.{tsx,js,ts,jsx}`,
  // "../logistic/pages/logistic/route/**/*.{tsx,js,ts,jsx}",
  // "../logistic/pages/logistic/area/hub/**/inbound/**/*.{tsx,js,ts,jsx}"
  // WMS
  // "../internal-wms/pages/wms/index.js",
  // "../internal-wms/pages/wms/**/overview/**/*.js",
  // "../internal-wms/pages/wms/**/orders/**/*.js",
  // "../internal-wms/pages/wms/**/pick/**/*.js",
  // "../internal-wms/pages/wms/**/ticket/**/*.js",
  // "../internal-wms/pages/wms/**/pack/**/*.js",
  // "../internal-wms/pages/wms/**/delivery/**/*.js",
  // "../internal-wms/pages/wms/**/qcapp/**/*.js",
  // "../internal-wms/components/component/employee/print.js",
  // "../internal-wms/components/component/employee/short-print.js",
  // "../internal-wms/components/pick-ticket/detail.js",
  // "../internal-wms/components/pack/pack-information.js",
  // "../internal-wms/components/component/confirm-delivery/index.js",
  // "../internal-wms/components/detail-handover.js",
  // "../internal-wms/components/print/confirm/handover-po.js",
  // "../internal-wms/components/component/print-do/index.js",
  // "../internal-wms/components/component/print-do/print-old-do.js",
  // "../internal-wms/components/component/print-do/footer.js"
];

// TODO: create a folder name test-replace to test in repo change here to test
const testPaths = [
  // "../logistic/test-replace/**/*",
  "./test-key.js",
];
// const ignore = ["../logistic/components/constants.{tsx,js,ts,jsx}"];

const options = {
  // TODO: Comment test and uncomment path to translate real data
  files: testPaths,
  // files: paths,
  countMatches: true,
  from: [],
  to: [],
};

// (async () => {
//   let abc = [];
//   let singleWord = [];
//   try {
//     data.forEach((res) => {
//       if (!res.ORIGINAL || res.AUTO == "x") {
//         return;
//       }
//       var wordCount = res.ORIGINAL.trim().split(/_| /).length;
//       if (wordCount == 1) {
//         singleWord.push(res);
//         return;
//       }
//       abc.push(res);
//     });

//     abc.sort(function (a, b) {
//       // ASC  -> a.length - b.length
//       // DESC -> b.length - a.length
//       return String(b.ORIGINAL).length - String(a.ORIGINAL).length;
//     });
//     abc.forEach((res) => {
//       res.ORIGINAL.trim();
//       res.ORIGINAL = escapeRegExp(res.ORIGINAL);
//       var txt = new RegExp("(.*)(" + res.ORIGINAL + ")(.*)", "gm");
//       options.from.push(txt);
//       // If missing keyword will translate to fix me
//       if (res.KEYWORD == "" || res.KEYWORD == undefined) {
//         res.KEYWORD = "Fix me";
//       }else {
//         res.KEYWORD = "\"" + res.KEYWORD + "\"";
//       }
//       options.to.push(`$1t(${res.KEYWORD})$3`);
//     });
//     const results = await replace(options);
//     console.log(results)
//   } catch (err) {
//     console.error("Error occurred:", err);
//   }
// })();

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
// })();

// var keywordSheetName = "wms-app";
// let keywordData = [];
// const keywordSheet = file.Sheets[keywordSheetName];
// const tempKeyWord = reader.utils.sheet_to_json(keywordSheet);
// tempKeyWord.forEach((res) => {
//   keywordData.push(res);
// });

// var hashMap = {};

// var hashMap = {};
// var vnTrans = {};
// var enTrans = {};

// keywordData.forEach((keyword) => {
//   if (!keyword) {
//     return;
//   }
//   console.log(keyword)
//   // if (keyword.ENGLISH == "" || keyword.ENGLISH == undefined){
//   //   return
//   // }

//   if (keyword.KEYWORD == "" || keyword.KEYWORD == undefined){
//     return
//   }

//   hashMap[keyword.KEYWORD] = keyword
// });

// for (const [key, keyword] of Object.entries(hashMap)) {

//   if (!keyword.VIETNAMESE || keyword.VIETNAMESE == ""){
//     vnTrans[key] = "Fix me"
//   } else {
//     vnTrans[key] = keyword.VIETNAMESE
//   }

//   if (!keyword.ENGLISH || keyword.ENGLISH == "") {
//     enTrans[key] = "Fix me"
//   } else {
//     enTrans[key] = keyword.ENGLISH
//   }
// }

// fs.writeFileSync("vi.json", JSON.stringify(vnTrans));
// fs.writeFileSync("en.json", JSON.stringify(enTrans));

// change key to format
let vnRaw = fs.readFileSync("./locales/vi/translation.json");
let enRaw = fs.readFileSync("./locales/en/translation.json");

let vn = JSON.parse(vnRaw);
let en = JSON.parse(enRaw);

let newVn = {};
let newEn = {};

let mapKey = [];

for (let [key, value] of Object.entries(en)) {
  key = key.normalize();
  key = key.toLowerCase();
  if (key.includes("{{value}}")) {
    key = key.replace(/\{\{value\}\}/g, "");
  }

  if (key.includes("{value1}")) {
    key = key.replace(/\{\{value1\}\}/g, "");
  }
  if (key.includes("{value2}")) {
    key = key.replace(/\{value2\}/g, "");
  }

  if (key.includes("{value}")) {
    key = key.replace(/\{value\}/g, "");
  }

  key = key.replace(/[^a-zA-Z0-9 _/]/g, "");
  key = key.trim();
  key = key.replace(/[ ]/g, "_");
  key = key.replace(/\_\_/g, "_");
  key = key.replace(/\_\_/g, "_");
  key = key.replace(/\//, "_")
  newEn[key] = value;
}

for (let [key, value] of Object.entries(vn)) {
  let oldKeyClone = `${key}`;
  key = key.normalize();
  key = key.toLowerCase();
  if (key.includes("{{value}}")) {
    key = key.replace(/\{\{value\}\}/g, "");
  }

  if (key.includes("{value1}")) {
    key = key.replace(/\{\{value1\}\}/g, "");
  }
  if (key.includes("{value2}")) {
    key = key.replace(/\{value2\}/g, "");
  }

  if (key.includes("{value}")) {
    key = key.replace(/\{value\}/g, "");
  }

  key = key.replace(/[^a-zA-Z0-9 _/]/g, "");
  key = key.trim();
  key = key.replace(/[ ]/g, "_");
  key = key.replace(/\_\_/g, "_");
  key = key.replace(/\_\_/g, "_");
  key = key.replace(/\//, "_")

  newVn[key] = value;

  let keyObj = { oldKey: oldKeyClone, newKey: key };
  mapKey.push(keyObj);
}

for (let [key, value] of Object.entries(newEn)) {
  if (!newVn[key]) {
    console.log("En:" + value);
  }
}

for (let [key, value] of Object.entries(newVn)) {
  if (!newEn[key]) {
    console.log("Vn" + key);
  }
}

fs.writeFileSync("vi.json", JSON.stringify(newVn));
fs.writeFileSync("en.json", JSON.stringify(newEn));

// Replace key word
mapKey.forEach((key) => {
  let oldKeyFormat = "t('" + key.oldKey + "')";
  oldKeyFormat = escapeRegExp(oldKeyFormat)
  let oldKeyRegex = new RegExp("(.*)(" + oldKeyFormat + ")(.*)", "gm");
  options.from.push(oldKeyRegex);
  let newKeyFormat = "'" + key.newKey + "'";
  options.to.push(`$1t(${newKeyFormat})$3`);
});


const results = replace.sync(options);
console.log(results);
