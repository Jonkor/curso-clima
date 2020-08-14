const request= require('request')

const forecast= (latitude, longitude, callback) =>{
  const url= 'http://api.weatherstack.com/current?access_key=d4dcce431fde0b9f31cda37e859d078b&&query='
  +encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=f'
  request({url, json:true},(error, {body})=>{
    if(error){
      callback('No hay Internet',undefined)
    }else if(body.error){
      callback('No se pudo encontrar el lugar. Intenta con otro',undefined)
    }else{
      callback(undefined, body.current.weather_descriptions[0]+", It its currently "
      +body.current.temperature+" out and it feels like "
      +body.current.feelslike+" in "+body.location.name)
    }
  })
}

module.exports=forecast
