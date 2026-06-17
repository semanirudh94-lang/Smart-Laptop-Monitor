let StartTime = Date.now();


const darkMode =
localStorage.getItem("darkMode");
console.log("Dark Mode =",darkMode);

if(darkMode === "true"){
    document.body.classList.add("dark");
}

let cpuData = [];
let labels = [];

let ramData = [];
let ramlabels = [];

let batteryData = [];
let batteryLabel = [];

// create graph
const ctx = 
document.getElementById('cpuChart');

const cpuChart = new Chart(ctx, {
    type : 'line',

    data: {
        labels: labels,

        datasets: [{
            label : 'CPU Usage',
            data: cpuData,
            borderWidth: 2
        }]
    }
});



const ramctx = 
document.getElementById('ramChart');

const ramChart = new Chart(ramctx, {
    type : 'line',
       data: {
        labels : ramlabels,
        datasets: [{
            label : 'RAM Usage',
            data : ramData,
            borderWidth: 2
        }]
    }
});

const batteryctx  = 
document.getElementById('batteryChart');

const batteryChart = new Chart(batteryctx, {
    type : 'pie',
    data: {
        labels : ["Battery", "Remaining"],
        datasets : [{
            label : 'Battery',
            data : [0, 100],
        }]   
    },
    options: {
      animation: false
    }
});
console.log("Pie chart created")
// read function stats.json file
async function loadStats() {
    
    try {
        // fetch stats.json go and take file 
        const response = await fetch("../agents/stats.json");

        // convert json datat as a object
        const data = await response.json();
       
         

        //cpu chart

        cpuData.push(data.cpu);

        labels.push(
            new Date().toLocaleTimeString()
        );

        if(cpuData.length > 10){
            cpuData.shift();
            labels.shift();
        }

        cpuChart.update();

        // ram chart

        ramData.push(data.ram);

        ramlabels.push(
            new Date().toLocaleTimeString()
        );

        if(ramData.length >10){
            ramData.shift();
            ramlabels.shift();
        }

        ramChart.update();
  // battery chart
        batteryChart.data.datasets[0].data = [
            data.battery,
            100 - data.battery
        ];
        batteryChart.update();
       
        //CPU value update in cpu html card
        document.getElementById("cpu").innerText = data.cpu.toFixed(1)+ "%";

        //RAM update value
        document.getElementById("ram").innerText = data.ram + "%";

        //temperatur update
        document.getElementById("temp").innerText = data.temperature.toFixed(1) + "`C";

        // BAttery update
        document.getElementById("battery").innerText = data.battery + "%";

        // Internet status update
        document.getElementById("internet").innerText = data.internet;

        //System status update
        document.getElementById("status").innerText = data.status;

        // Progress Bars Update 
        // to make width dynamic ans cpu bar

        document.querySelector(".cpu-progress").style.width = data.cpu + "%";

        // ram bar
        document.querySelector(".ram-progress").style.width = data.ram + "%";

        // Temperature bar
        document.querySelector(".temp-progress").style.width = data.temperature + "%";

        // Battery bar
        document.querySelector(".battery-progress").style.width = data.battery + "%";


        // Live Alert Logic
        let alertText = "System Stable";
        let recommendation = "System Running Soothly";

        // if CPU is above 80
        if(data.cpu > 80){
            alertText = " High CPU Usage";
            recommendation = "Close heavy background apps";
        }

        // if RAM  is above 85
        else if(data.ram > 85){
            alertText = "RAM Usage High";
            recommendation = "COnsider freeing memory";
        }

        // If temperature is high
        else if(data.temperature > 75){
            alertText = "System Heating";
            recommendation = "Check system cooling";
        }

        // text update on alert box

        document.getElementById("alert").innerText = alertText;
        document.getElementById("recommendation").innerText = recommendation;
        let score = 100;
         if(data.cpu>80){
            score -= 20;
         }
         if(data.ram > 80){
            score -= 15;
         }
         if(data.temperature>75){
            score-=25;
         }
         if(data.battery <20){
            score -= 20;
         }

    if(score <0){
        score = 0;
    }
    document.getElementById("healthScore").innerText = score + "%";
    let healthStatus = "";
    if(score>=90){
        healthStatus = "Excellent";
    }
    else if(score >=70){
        healthStatus = "Good";
    }
    else if(score >=50){
        healthStatus = "Average";
    }
    else{
        healthStatus = "Ceitical";
    }
    document.getElementById("healthStatus").innerText = healthStatus;

    const healthCircle = document.getElementById("healthScore");
    if(score>=90){
        healthCircle.style.color = "lime";
    }
    else if(score>=70){
        healthCircle.style.color = "yellow";
    }
    else{
        healthCircle.style.color = "red";
    }
    }


    // If file doesnt read
    catch (error){
        console.log("stats.json doesn't read ");
    }
}


// Run function immediatelt after loading of page
loadStats();

// refresh dashboard after 2 second use the fuction setinterval 
const autoRefresh = 
localStorage.getItem("autoRefresh");
const interval =
localStorage.getItem("interval");
if(autoRefresh === "true")
{
    let time = 3000;
    if(interval === "1 sec") time = 1000;
    if(interval === "3 sec") time = 3000;
    if(interval === "5 sec") time = 5000;
    if(interval === "10 sec") time = 10000;
    setInterval(loadStats,time);
}
function updateUptime(){
    let elapsed = Math.floor(
        (Date.now() - StartTime) / 1000
    );
    let hours = 
    Math.floor(elapsed / 3600);
    let minute =
    Math.floor((elapsed % 3600)/60) ;
    let seconds = 
    elapsed % 60;

document.getElementById("uptime").innerText =
String(hours).padStart(2,'0')+":"+String(minute).padStart(2,'0')+":"+String(seconds).padStart(2,'0');
}
setInterval(updateUptime,1000);