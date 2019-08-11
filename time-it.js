function displayTime() {
  let date = new Date();
  let time = date.toLocaleTimeString();
  document.querySelector('.clock').textContent = time;
}

function getClock() {
    if (activeTabTracker == "stopwatch-tab") {
        return document.querySelector('#stopwatch').innerText;
    }
}

function selectTab(evt) {
    console.log(evt.currentTarget);

    if (!evt.currentTarget.classList.contains(' active')) {

        if (activeTabTracker != null) {
            let activeTab = document.getElementById(activeTabTracker);
            activeTab.className = activeTab.className.replace(" active", "");
        }

        activeTabTracker = evt.currentTarget.id;
        evt.currentTarget.className += " active";
        if (activeTabTracker == 'timer-tab') {
            document.querySelector('#timer').style.display = 'flex';
            document.querySelector('#stopwatch').style.display = 'none';
        }
        else {
            document.querySelector('#timer').style.display = 'none';
            document.querySelector('#stopwatch').style.display = 'flex';
        }
    }

}

function setUpStopwatchTimer() {
    let timeDigits = [document.querySelector('.hr'), document.querySelector('.min'), document.querySelector('.seconds')]
    let stopDigits = [document.querySelector('.stop-min'), document.querySelector('.stop-sec'), document.querySelector('.stop-mill-sec')]

    let i, j;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 2; j++) {
            let spanEle = document.createElement('span');
            spanEle.setAttribute('contentEditable', 'true');
            spanEle.innerHTML = '0';
            timeDigits[i].appendChild(spanEle);
            spanEle = document.createElement('span');
            spanEle.innerHTML = '0';
            stopDigits[i].appendChild(spanEle);
        }
    }
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function submitToAPI(e) {
    e.preventDefault();
    let URL = "https://d1px6aztmi.execute-api.us-east-1.amazonaws.com/production/contact-us";

    let Namere = /[A-Za-z]{1}[A-Za-z]/;
    if (!Namere.test($("#name-input").val())) {
        alert ("Name can not less than 2 char");
        return;
    }
    let mobilere = /[0-9]{10}/;
    if (!mobilere.test($("#phone-input").val())) {
        alert ("Please enter valid mobile number");
        return;
    }
    if ($("#email-input").val()=="") {
        alert ("Please enter your email id");
        return;
    }

    let reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
    if (!reeamil.test($("#email-input").val())) {
        alert ("Please enter valid email address");
        return;
    }

    let name = $("#name-input").val();
    let phone = $("#phone-input").val();
    let email = $("#email-input").val();
    let desc = $("#description-input").val();
    let data = {
        name : name,
        phone : phone,
        email : email,
        desc : desc
    };

    $.ajax({
        type: "POST",
        url : "https://d1px6aztmi.execute-api.us-east-1.amazonaws.com/production/contact-us",
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),


        success: function () {
            // clear form and show a success message
            alert("Email sent!");
            document.getElementById("contact-form").reset();
            location.reload();
        },
        error: function () {
            // show an error message
            alert("Unsuccessful email submission.");
        }});
}

function keyReleased(evt) {
    if (document.querySelector('.form-popup').style.display != 'block') {
        evt.preventDefault();
        if (start && activeTabTracker == 'timer-tab' && evt.keyCode >= 48 && evt.keyCode <= 57) {
            evt.target.textContent = String.fromCharCode(evt.keyCode);
        }
        else if (evt.keyCode == 32) {
            startStopBtn.click();
        } else
        if (evt.keyCode == 13) {
            restartLapBtn.click();
        }
    }
}

function returnHHMMSS(time) {
    let mil_sec_num = parseInt(time, 10);
    let minutes = Math.floor(mil_sec_num / 60000);
    let seconds = Math.floor((mil_sec_num - (minutes * 60000)) / 1000);
    let mil_sec = mil_sec_num - (minutes * 60000) - (seconds * 1000);
    let values = [minutes, seconds, Math.floor(mil_sec/10)];

    var i, j;
    for (i = 0; i < 3; i++) {
      if (values[i]   < 10) {values[i]   = "0"+values[i];}
      else {values[i] = values[i].toString(10)}
    }

    return values[0]+':'+values[1]+'.'+values[2];
  }

function stopwatchStart(HHMMSS) {
  let hmsEle = document.querySelector('#stopwatch').querySelector('.' + HHMMSS);
  let onesPlace = parseInt(hmsEle.getElementsByTagName('span')[1].innerText, 10);
  let tensPlace = parseInt(hmsEle.getElementsByTagName('span')[0].innerText, 10);
  let tensLimit = HHMMSS == 'stop-mill-sec' ? 9 : 5;
  if (onesPlace == 9) {
      hmsEle.getElementsByTagName('span')[1].innerText = 0;
      if (tensPlace == tensLimit) {
          if (HHMMSS == 'hr')
              return;
          let leftSpan = HHMMSS == 'stop-mill-sec' ? 'stop-sec' : 'stop-min';
          stopwatchStart(leftSpan);
          hmsEle.getElementsByTagName('span')[0].innerText = 0;
      } else
          hmsEle.getElementsByTagName('span')[0].innerText = tensPlace + 1;
   
  } else
      hmsEle.getElementsByTagName('span')[1].innerText = onesPlace + 1;
}

function startStop() {
  if (start) {
    document.querySelector('#start-stop-btn').textContent = 'stop';
    document.querySelector('#restart-lap-btn').textContent = 'lap';
    if (getClock() == '00\n:\n00\n.\n00') {
      startTime = new Date();
      stopwatchRow = addTimeRow();
    }
    else {
      rowUpdateRunner = setInterval( function() {
        stopwatchRow.cells[1].innerHTML = document.querySelector('#stopwatch').textContent;
      }, 0);
    }
    if (activeTabTracker == 'stopwatch-tab')
      runningTimer = setInterval( function() {stopwatchStart('stop-mill-sec')}, 10);
  }
  else {
    document.querySelector('#start-stop-btn').textContent = 'start';
    document.querySelector('#restart-lap-btn').textContent = 'restart';
    clearInterval(runningTimer);
    clearInterval(rowUpdateRunner);
  }
  start = !start;
}

function restart() {
  let timeDigits = [document.querySelector('.stop-min'), document.querySelector('.stop-sec'), document.querySelector('.stop-mill-sec')]
  if (activeTabTracker == "stopwatch-tab" && document.querySelector('#restart-lap-btn').innerHTML == 'lap') {
    addTimeRow(stopwatchRow);
  }
  else {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 2; j++) {
            timeDigits[i].getElementsByTagName('span')[j].innerText = 0;
        }
    }
  }
}

function addTimeRow(currTimingRow) {
  if (activeTabTracker == "stopwatch-tab") {
    let table = document.querySelector('#stopwatch-table');
    
    let idx = currTimingRow == null? 0 : currTimingRow.rowIndex + 1;
    let rowName = currTimingRow == null? 'stopwatch' : 'lap';
    let count = table.rows.length;

    let row = table.insertRow(idx);
    row.className = rowName + '-row';

    let cell0 = row.insertCell(0);
    cell0.innerHTML = rowName + count;

    let cell1 = row.insertCell(1);
    if (currTimingRow == null){
      rowUpdateRunner = setInterval( function() {
        cell1.innerHTML = document.querySelector('#stopwatch').textContent;
      }, 0);
    } else {
      let timeElapsed = new Date() - startTime;
      cell1.innerHTML = returnHHMMSS(timeElapsed);
      startTime = new Date();
    }
    let cell2 = row.insertCell(2);
    cell2.className = 'delete-btn';
    cell2.innerHTML = "X";
    return row;
  }
}


let runningTimer;
let stopwatchRow;
let rowUpdateRunner;
let activeTabTracker;
let startTime;
let start = true;

displayTime();
const runningClock = setInterval(displayTime, 1000);
setUpStopwatchTimer();

let startStopBtn = document.querySelector('#start-stop-btn');
startStopBtn.addEventListener("click", startStop);

let restartLapBtn = document.querySelector('#restart-lap-btn');
restartLapBtn.addEventListener("click", restart);

let tabs = document.querySelectorAll('.tab-btn');
for (var i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', selectTab);
}

window.addEventListener('keydown', keyReleased);

document.addEventListener('click',function(e){
  if(e.target && e.target.className == 'delete-btn'){
      document.querySelector('#stopwatch-table').deleteRow(i);
   }
});

document.querySelector('.cancel').addEventListener("click", closeForm);
document.querySelector('.open-button').addEventListener("click", openForm);
document.querySelector('.send-email').addEventListener("click", submitToAPI);


