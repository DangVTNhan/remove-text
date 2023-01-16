const reader = require("xlsx");
const replace = require("replace-in-file");

// TODO: Change here to change sheet name 
const sheetname = "Sheet1";
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
]

// TODO: create a folder name test-replace to test in repo change here to test
const testPaths = [
    // "../logistic/test-replace/**/*",
    "./test-key.js",
]
const ignore =[
"../logistic/components/constants.{tsx,js,ts,jsx}"
]

const options = {
  // TODO: Comment test and uncomment path to translate real data
  files: testPaths,
  // files: paths,
  ignore,
  from: [],
  to: [],
};


(async () => {
let abc = []
    try{
      data.forEach(res=> {
            if (res.AUTO == "x") {
              return;
            }
            if (!res.ORIGINAL){
                return
                }
            abc.push(res)
      })
      abc.sort(function(a, b){
        // ASC  -> a.length - b.length
        // DESC -> b.length - a.length
        return String(b.ORIGINAL).length - String(a.ORIGINAL).length;
      });
        abc.forEach((res) => {
          if (res.ORIGINAL == "Tỉnh/Thành phố:" || res.ORIGINAL == "Tỉnh/Thành") {
          console.log(res.ORIGINAL == "Tỉnh/Thành phố:",'original')
            
          }
            res.ORIGINAL.trim();
            res.ORIGINAL = escapeRegExp(res.ORIGINAL)
            var txt = new RegExp( "\\b" +res.ORIGINAL + "\\b", "g");
            options.from.push(txt);
            // If missing keyword will translate to fix me
            if (res.KEYWORD == "" || res.KEYWORD == undefined) {
              res.KEYWORD = "Fix me"
            }
            
            options.to.push(`t(${res.KEYWORD})`);
          });
        const results = await replace(options)
      }catch(err){
        console.error('Error occurred:', err);
    }
})();


function escapeRegExp(text) {
    return String(text).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }