const baseurl= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdowns=document.querySelectorAll('.dropdown select')
let btn=document.querySelector('.btn')
const fromCurr=document.querySelector('.From select')
const toCurr=document.querySelector('.To select')
const msg=document.querySelector('.msg')

for( let select of  dropdowns){
    for( let currCode in countryList){
        let newOption=document.createElement('option')
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="From"&& currCode==='USD'){
            newOption.selected='selected'
        }
        if(select.name==="To"&& currCode==='INR'){
            newOption.selected='selected'
        }
        select.append(newOption)

    }
    select.addEventListener(('change'),(eve)=>{
        updateFlag(eve.target)
    })
}

const updateFlag=(element)=>{
     let currCode=element.value
     let countryCode=countryList[currCode]
     newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
     let img=element.parentElement.querySelector("img")
     img.src=newSrc;
}

btn.addEventListener('click', async (eve) => {
    eve.preventDefault();
    let amount = parseFloat(document.querySelector(".amount input").value); 
    let amtVal = amount;
    if (isNaN(amtVal) || amtVal < 1) { 
        amtVal = 1;
        amount = 1; 
    }

    const URL = `${baseurl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    console.log(rate);
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
});