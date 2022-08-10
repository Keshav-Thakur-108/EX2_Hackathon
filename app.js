const express = require("express");
const app = express();
const csv=require('csvtojson');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine", "ejs");

let dataArray;


const csvFilePath='./public/data/university_data.csv';

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    dataArray = jsonObj
})
let fees = undefined;
let rat = undefined ;
let loc = undefined ;
app.post('/',(req,res)=>{
    fee=req.query.fees;
    rat=req.query.rating;
    loc=req.query.location;


    let result=[];
    let siz=dataArray.length;
    rat=rat.toLowerCase();

    for(let i=0;i<siz;i++)
     {
        
        if(fee===undefined)
        {
            if(dataArray[i].rank <= rat && dataArray[i].state.toLowerCase() === loc)
            {
               
               result.push(dataArray[i]);
            }
        }
        else if(loc===undefined)
        {
            if(dataArray[i].fees <= fee && dataArray[i].rank <= rat )
            {
               
               result.push(dataArray[i]);
            }
        }
        else if(!rat)
        {
            if(dataArray[i].fees <= fee &&  dataArray[i].state.toLowerCase() === loc)
            {
               result.push(dataArray[i]);
            }
        }
        else
        {
            if(dataArray[i].fees <= fee && dataArray[i].rank <= rat && dataArray[i].state.toLowerCase() === loc)
            {
               
               result.push(dataArray[i]);
            }
        }
        
        
     }  
    res.send(result);

});

app.get('/', (req, res) => {
    res.render("index");

})

app.get('/data', (req, res) => {
    res.send(dataArray)
})


app.listen(3000, function (req, res) {
  console.log("The server is started");
});
