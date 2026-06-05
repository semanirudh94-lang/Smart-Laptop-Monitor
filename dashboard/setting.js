console.log("loaded successfully")
document.getElementById("savebutton").addEventListener("click",()=>{
  console.log("save butto clicked");
    localStorage.setItem(
        "autoRefresh",
document.getElementById("autoRefresh").checked
    );
    localStorage.setItem("darkMode",
document.getElementById("darkMode").checked
    );
    localStorage.setItem("interval",
document.getElementById("interval").value
    );
    alert("Setting Saved");
  
});