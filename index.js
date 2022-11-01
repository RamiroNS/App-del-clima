const result = document.querySelector('.app-container__resultado');
const form = document.querySelector('.app-container__get');
const nameCity = document.querySelector('.app-container__get__input1');
const nameCountry = document.querySelector('.app-container__get__input2');

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    if(nameCity.value ==='' || nameCountry.value ===''){
        showError('Debe rellenar los campos');
        return;
    }
    // console.log(nameCity.value);
    // console.log(nameCountry.value);
    callAPI(nameCity.value, nameCountry.value)
})





///////////////////// Funciones ////////////////////

function showError(message){
    console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;
    form.appendChild(alert);
    setTimeout(()=>{
        alert.remove();

    }, 2000)

    }

function callAPI(city, country){
    const apiID = '492f0eb261d8e67134693848a68d8233';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiID}`;

    fetch(url)
        .then(data=>{
            return data.json();
        })
        .then(dataJSON =>{
            if(dataJSON.cod ==='404'){
                showError('Ciudada no encontrada');
            }else{
                clearHTMLL();
                showWeather(dataJSON);
            }
            console.log(dataJSON);
        })
    }

function showWeather(data){
    const {name, main:{temp,temp_min,temp_max}, weather:[arr]} = data;

    const degreese = kelviil(temp);
    const max = kelviil(temp_max);
    const min = kelviil(temp_min);

    const content = document.createElement('div');
    content.classList.add('app-container__resultado')
    content.innerHTML = `
            <h5>Clima en ${name}</h5>
            <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="">
            <h2>${degreese}°C</h2>
            <p>Max ${max}°C</p>
            <p>Min ${min}°C</p>
    `
    result.appendChild(content);

    console.log(name);
    console.log(temp);
    console.log(temp_max);
    console.log(temp_min);
    console.log(arr.icon);
}

function kelviil(temp){
    return parseInt(temp - 273.15);
}

function clearHTMLL(){
    result.innerHTML=''
}






















