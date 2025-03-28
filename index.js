const inputFieldEl = document.getElementById("input-field")
const btnAddEl = document.getElementById("btn-add")


btnAddEl.addEventListener("click", function(){
    
    if (inputFieldEl.value !== ""){
        let inputValue = inputFieldEl.value
        console.log(inputValue)
    }
})

