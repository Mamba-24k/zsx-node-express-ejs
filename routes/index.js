let express = require('express');
let router = express.Router();
var app = express();
const $request = require("../utils/request");
const {baseApi, address} = require("../config/index");

const fs = require("fs")
const path = require('path');
const ejs = require("ejs");

// ---------------梅立基础上所加
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// ---------------梅立基础上所加

let template = fs.readFileSync(path.join(__dirname, "../", "views/index.ejs"), 'utf8')

function createStaticHtml() {
  console.log("执行了")
  $request.all(
    {
      type: 'get',
      url: `${baseApi}/ms/adminHomepage/public/getAccumulatedData/`,
    },
    {
      type: 'get',
      url: `${baseApi}/ws/tag/public/tree/`
    },
    {
      type: 'post',
      url: `${baseApi}/ws/index/public/queryIndexPurchaserList/`,
      params: {
        pageNum: 1,
        pageSize: 6
      }
    },
    {
      type: 'post',
      url: `${baseApi}/ts/officialwebsite/listTenderNoticeClassification/`,
      params: {
        pageNum: 1,
        pageSize: 6,
        regionCode: ""
      }
    }
  )
  .then(resArray => {
    let privateList = resArray[2].data.rows;
    let publicList = resArray[3].data.rows;
    let treeData = resArray[1].data.children[0].children

    let treeArray = [];
    for (let i = treeData.length -1; i > -1; i--) {
      treeArray.push(treeData[i])
    }
    let accumulatedData = resArray[0].data;
    // let str = ejs.render(template, {
    //   accumulatedData,
    //   treeArray,
    //   privateList,
    //   publicList,
    //   address
    // })
    // fs.writeFileSync('../public/home.html', str, 'utf-8')

  // ---------------梅立基础上所加
    router.get('/', function(req, res, next) {
      res.render('index', {
        title: "易建采node-ejs",   
        accumulatedData,
        treeArray,
        privateList,
        publicList,
        address });
    });        
  })
  // ---------------梅立基础上所加
  .catch(err => {
    console.log("出错了", err)
  })
}
createStaticHtml();

setInterval(() => {
  createStaticHtml();
}, 1800000);
/* GET home page. */
// router.get('/demo', function(req, res, next) {

// });

module.exports = router;

