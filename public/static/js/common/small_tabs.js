/**
 * Created by marcin on 5/19/17.
 */

function sopenDownload(evt, sdownloadName){
    var i, stabcontent, stablinks;
    stabcontent = document.getElementsByClassName("stabcontent");

    for (i = 0; i < stabcontent.length; i++) {
        stabcontent[i].style.display = "none";
    }

    stablinks = document.getElementsByClassName("stablinks");
    for (i = 0; i < stablinks.length; i++) {
        stablinks[i].className = stablinks[i].className.replace("active", "");
    }

    document.getElementById(sdownloadName).style.display = "block";
    evt.currentTarget.className += "active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("sdefaultOpen").click();




