console.log("message is showing")

const weatherInfo = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherInfo.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                // console.log(data.error)
                messageOne.textContent = data.error

            }
            else{
                // console.log(data[0].location)
                // console.log(data[1].forecast)
                messageOne.textContent = data[0].location
                messageTwo.textContent = data[1].forecast
            }
        })
    })
})
