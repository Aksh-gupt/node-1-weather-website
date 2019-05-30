const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//express to work
const pathjo = path.join(__dirname, '../public')
const pathrender = path.join(__dirname, '../templates/views')
const pathpartial = path.join(__dirname, '../templates/partials')

//engine is hbs and customise the location
app.set('view engine','hbs')
app.set('views',pathrender)
hbs.registerPartials(pathpartial)

//public path or static path
app.use(express.static(pathjo))

// app.get('',(req , res) => {
//     res.send('<h1>hello express</h1>')
// })

const str = "this is a string and i don't know what to write"

app.get('',(req,res) => {
    res.render('index',{
        title : "Weather",
        name : "akshat gupta"
    })
})

app.get('/home',(req, res) => {
    res.render('home',{
        str,
        title : "this is a home page",
        name : "akshat gupta"
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : "help page",
        name : "akshat gupta"
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : "About page",
        name : "akshat gupta"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error :"you must provide a search term"
        })
    }
    console.log(req.query)

    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error){
            //console.log(error);
            return res.send({
                error : error
            })
        }
        else{
            const mana = forecast(latitude, longitude,(error,data) => {
                if(error){
                    //console.log(error)
                    return res.send({
                        error : error
                    })
                }
                else{
                    //console.log(location + " has temperature " + temperature + " and humidity is " + humidity + " and possiblity of rain is " + rainprob)  
                    res.send([{
                        location : location
                    },{
                        forecast : data
                    },{
                        place : req.query.address
                    }])
                }
            })
        }
    })


    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error : "you must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})
app.get('/help/*',(req,res) => {
    res.render('404',{
        errMsg : "help article not found"
    })
})
app.get('*',(req,res) => {
    res.render('404',{
        errMsg : "my 404 page"
    })
})
app.listen(3000,() => {
    console.log('server is listen on port 3000')
})