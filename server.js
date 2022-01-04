const path = require("path");
const express = require("express");
const request = require('request');
const dotenv = require('dotenv')

dotenv.config()

const app = express(); 


app.use(express.static(path.join(__dirname, "build")))
app.use(express.static(path.join(__dirname, "static")))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.get('/recipes', (req, res) => {
  // Get json data from spoonacular containing recipes that meet the filters

  let page = req.query.page
  let allergies = req.query.allergies
  let query = req.query.query

  if (!page || !query) {
    res.status(400)
    res.send("Missing Query or Page")
  }
  
  let apiKey = process.env.API_KEY
  let url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=16&offset=${page}&apiKey=${apiKey}`

  if (allergies) {
    url += `&intolerances=${allergies}`
  }

  request(url, function (error, response, body) {
    let data = JSON.parse(body)

    res.send(data)
  }); 
  

})

app.listen(3000, () => {
  console.log("server started on port 3000");
});