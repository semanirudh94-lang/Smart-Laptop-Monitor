// read function stats.json file
async function loadStats() {
    
    try {
        // fetch stats.json go and take file 
        const response = await fetch("../agents/stats.json");

        // convert json datat as a object
        const data = await response.json();

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

        // if CPU is above 80
        if(data.cpu > 80){
            alertText = " High CPU Usage";
        }

        // if RAM  is above 85
        else if(data.ram > 85){
            alertText = "RAM Usage High";
        }

        // If temperature is high
        else if(data.temperature > 75){
            alertText = "System Heating";
        }

        // text update on alert box

        document.getElementById("alert").innerText = alertText;
    }


    // If file doesnt read
    catch (error){
        console.log("stats.json doesn't read ");
    }
}


// Run function immediatelt after loading of page
loadStats();

// refresh dashboard after 2 second use the fuction setinterval 
setInterval(loadStats,2000);