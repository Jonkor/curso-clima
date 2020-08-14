const weatherForm= document.querySelector('form');
const search = document.querySelector('input');
const mensajeUno= document.querySelector('#mensaje-1');
const mensajeDos = document.querySelector('#mensaje-2');


weatherForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  const location= search.value
  console.log(location)
  mensajeDos.textContent= 'Cargando';

  fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
      if(data.error){
        console.log(data.error)
        mensajeDos.textContent= data.error;
      }else{
        console.log(data.location);
        console.log(data.forecast);
        mensajeUno.textContent= data.location;
        mensajeDos.textContent= data.forecast;
      }


    })
  })
})
