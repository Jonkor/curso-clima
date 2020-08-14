const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();

const viewsPath= path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(path.join(__dirname,'../public')));

app.get('',(req,res)=>{
  res.render('index',{
    title: 'Weather app',
    name: 'Juan'
  })
})

app.get('/about', (req,res)=>{
  res.render('about',{
    title: 'Sobre mi',
    name: 'Juan'
  })
})

app.get('/help', (req,res)=>{
  res.render('help', {
    title: 'Ayuda',
    name: 'Laura'
  })
})

app.get('/weather', (req,res)=>{
  if(!req.query.address){
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} ={})=>{
    if(error){
      return res.send({error})
    }
    forecast(latitude, longitude, (error,forecastData)=>{
      if(error){
        return res.send({error})
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })

  // res.send({
  //   forecast: [],
  //   location: [],
  //   address: req.query.address
  // })


})

app.get('/products', (req, res)=>{
  if(!req.query.search){
    return res.send({
      error: 'You must provide a search term'
    })
  }

  console.log(req.query);
  res.send({
    products: []
  })
})



app.get('/help/*', (req,res)=>{
  res.render('404', {
    title: '404',
    name: 'Juan',
    errorMessage: 'Articulo de Ayuda no encontrada'
  });
});

app.get('*', (req,res)=>{
  res.render('404', {
    title: '404',
    name: 'Juan',
    errorMessage: 'Pagina no encontrada'
  });
});

app.listen(3000, ()=>{
  console.log('Escuchando por el puerto 3000')
})
