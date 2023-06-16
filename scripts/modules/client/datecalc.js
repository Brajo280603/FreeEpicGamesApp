let changedate = document.querySelectorAll(".datelink");
let getdate = document.getElementById("nextStart");

let currStart = document.getElementById("currStart");
let currEnd = document.getElementById("currEnd");
let nextStart = document.getElementById("nextStart");
let nextEnd = document.getElementById("nextEnd");


let currentStartHead = document.getElementById("currentStartHead");
let NextStartHead = document.getElementById("NextStartHead");

// ----------------------------- Localize Date ----------------------
currStart = currStart.innerHTML;
currEnd = currEnd.innerHTML;
nextStart = nextStart.innerHTML;
nextEnd = nextEnd.innerHTML;

currStart = new Date(currStart);
currStart = currStart.toLocaleString();

currEnd = new Date(currEnd);
currEnd = currEnd.toLocaleString();

nextStart = new Date(nextStart);
nextStart = nextStart.toLocaleString();

nextEnd = new Date(nextEnd);
nextEnd = nextEnd.toLocaleString();


currentStartHead.innerHTML = `Starts From ${currStart} -- Ends On ${currEnd}`;
NextStartHead.innerHTML = `Starts From ${nextStart} -- Ends On ${nextEnd}`;










//-----------------------------------------------Timer-------------------------

setInterval(()=>{
    changedate.forEach(el=>{
        
        let date = new Date(getdate.innerHTML);
        
        let diff = calculateTimeDifference(date);
        // console.log(diff)
        let show = ""
        if(diff.days){
            show += diff.days+" days ";
        }
        if(diff.hours){
            show += diff.hours+" hours ";
        }
        if(diff.minutes){
            show += diff.minutes+" minutes ";
        }
        show+= diff.seconds+" seconds ";
        el.innerHTML = "Available in " + show;

    
    })
},1000)




function calculateTimeDifference(endDate) {
    var startDate = new Date(); // Current date and time
    var difference = endDate - startDate;
  
    var days = Math.floor(difference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }