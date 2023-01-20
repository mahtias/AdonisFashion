function cred(){
    document.querySelector(".difmobile").style.display = "none";
    document.querySelector("#frm2").style.display = "none";
    document.querySelector("#frm1").style.display = "block";
    document.querySelector("#frm3").style.display = "none";
}
function momo(){
    document.querySelector(".difmobile").style.display = "block";
    document.querySelector("#frm2").style.display = "block";
    document.querySelector("#frm3").style.display = "none";
    document.querySelector("#frm1").style.display = "none";
}
function liv(){
    document.querySelector(".difmobile").style.display = "none";
    document.querySelector("#frm2").style.display = "none";
    document.querySelector("#frm3").style.display = "block";
    document.querySelector("#frm1").style.display = "none";
}

if (document.getElementById("btnradio1").checked = true){
    document.querySelector(".orange").style.opacity = "0";
    document.querySelector(".moov").style.opacity = "0";
    document.querySelector(".mtn").style.opacity = "1";
}else if (document.getElementById("btnradio2").checked = true){
    document.querySelector(".mtn").style.opacity = "0";
    document.querySelector(".orange").style.opacity = "0";
    document.querySelector(".moov").style.opacity = "1";
    
}else {
    document.querySelector(".mtn").style.display = "none";
    document.querySelector(".moov").style.display = "none";
    document.querySelector(".orange").style.display = "block";
}
