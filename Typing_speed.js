const stopwatch = document.querySelector(".stopwatch");
const container = document.querySelector(".container");
const quotes = document.querySelector(".quotes");
const wrapper = document.querySelector(".stat-wrapper");
const correcttyped = document.querySelector(".correct");
const wpm = document.querySelector(".wpm");
const btn = document.querySelector(".btn");
const type = document.querySelector(".typee");
const about = document.querySelector(".about");

let watch, totype = [];

let time;
let i, correct;
btn.innerText = "Start!";

btn.addEventListener('click', function(){
  

    //start the timer
   
        i=0, correct = 0, time=60;
        console.log("here at 60");
        wpm.style.opacity = "0";
        correcttyped.style.opacity = "0";
        correcttyped.innerText ='';
        wpm.innerText = '';
        about.innerText = '';
            type.value='';
            btn.innerText = "Stop";
            type.disabled = false;

                //load the quotes to type in the screen from server
            getdatafromserver();  
            timer();
})



async function getdatafromserver(){

    const response = fetch("https://animechan.xyz/api/random");
    const data = await (await response).json();
    console.log(data);

    about.innerHTML = `
    Character: ${data.character}
    <br>
    Anime: ${data.anime}
    `;

    quotes.innerText = "";

    lengths = data.quote.length;
    if((lengths >= 100 && lengths <= 150)){

        totype.push(data.quote);
        
            totype[totype.length -1].split("").forEach(function(e){ //takes the last element from the totype array (which is a quote) and then through split and forEach put indiviual element in div insdie a <span> tag
                quotes.innerHTML += `<span>${e}</span>`;
            });

        // typing test

        type.style.opacity = "1";
    
    }else{
        getdatafromserver();
    }

}


    type.addEventListener('keyup', function(e){

           if(e.key.length == 1){ //only alphanumeric

            if(e.key == ((totype[totype.length - 1].slice(i,i+1))) ){
                document.querySelectorAll("span")[i].style.color = "white";  
                correct++;
                correcttyped.innerText = `Correct: ${correct}`;
            }else{
                document.querySelectorAll("span")[i].style.color = "red";
            }

            
            //check if all are typed
            if(i+1 == document.querySelectorAll("span").length){
                clearInterval(watch);
                finalresult();
            }else{

            document.querySelectorAll("span")[i+1].style.borderBottom = "1px solid yellow";
            i++;
            document.querySelectorAll("span")[i-1].style.borderBottom = "0px";
            }
        }

       
    })




function timer(){
     watch = setInterval(function(){
        stopwatch.innerText = `Time left: ${time}s`;
      

        if(time==0){
            clearInterval(watch);
            stopwatch.innerText = `Times up!!`;
            btn.innerText = "Start!";
            finalresult();
        }

        time--;

    },1000);
}


function finalresult(){
    wpm.style.opacity = "1";
    correcttyped.style.opacity = "1";
    if(time != 0){
    wpm.innerText = `WPM = ${((correct)/(time/60)).toPrecision(2)}`;
    }else{
        wpm.innerText = `WPM = ${correct}`;
    }
    type.value = '';
    type.disabled = true;
}