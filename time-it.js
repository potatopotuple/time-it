function displayTime() {
  let date = new Date();
  let time = date.toLocaleTimeString();
  document.querySelector('.clock').textContent = time;
}

//use for timer
  // function returnHHMMSS(time) {
  //   let sec_num = parseInt(time/1000, 10); // don't forget the second param
  //   let hours   = Math.floor(sec_num / 3600);
  //   let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  //   let seconds = sec_num - (hours * 3600) - (minutes * 60);
  //   let values = [hours, minutes, seconds];

  //   var i, j;
  //   for (i = 0; i < 3; i++) {
  //     if (values[i]   < 10) {values[i]   = "0"+values[i];}
  //     else {values[i] = values[i].toString(10)}
  //   }

  //   return values[0]+':'+values[1]+':'+values[2];
  // }


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

//change to suit timer
// function stopwatchStart(HHMMSS) {
//       let hmsEle = document.querySelector('#stopwatch').querySelector('.' + HHMMSS);
//       let onesPlace = parseInt(hmsEle.getElementsByTagName('span')[1].innerText, 10);
//       let tensPlace = parseInt(hmsEle.getElementsByTagName('span')[0].innerText, 10);
//       if (onesPlace == 9) {
//           hmsEle.getElementsByTagName('span')[1].innerText = 0;
//           if (tensPlace == 5) {
//               if (HHMMSS == 'hr')
//                   return;
//               let leftSpan = HHMMSS == 'seconds' ? 'min' : 'hr';
//               stopwatchStart(leftSpan);
//               hmsEle.getElementsByTagName('span')[0].innerText = 0;
//           } else
//               hmsEle.getElementsByTagName('span')[0].innerText = tensPlace + 1;
       
//       } else
//           hmsEle.getElementsByTagName('span')[1].innerText = onesPlace + 1;
// }


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

//change to suit timer
// function startStop() {
//   if (start) {
//     document.querySelector('#start-stop-btn').textContent = 'stop';
//     document.querySelector('#restart-lap-btn').textContent = 'lap';
//     if (getClock() == '00\n:\n00\n:\n00') {
//       startTime = new Date();
//       stopwatchRow = addTimeRow();
//     }
//     else {
//       rowUpdateRunner = setInterval( function() {
//         stopwatchRow.cells[1].innerHTML = document.querySelector('#stopwatch').textContent;
//       }, 0);
//     }
//     if (activeTabTracker == 'stopwatch-tab')
//       runningTimer = setInterval( function() {stopwatchStart('seconds')}, 1000);
//   }
//   else {
//     document.querySelector('#start-stop-btn').textContent = 'start';
//     document.querySelector('#restart-lap-btn').textContent = 'restart';
//     clearInterval(runningTimer);
//     clearInterval(rowUpdateRunner);
//   }
//   start = !start;
// }

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

function getClock() {
  if (activeTabTracker == "stopwatch-tab") {
      return document.querySelector('#stopwatch').innerText;
  }
}

//change to fit timer
// function restart() {
//   let timeDigits = [document.querySelectorAll('.hr'), document.querySelectorAll('.min'), document.querySelectorAll('.seconds')]
//   let clock;
//   if (activeTabTracker == "timer-tab") {
//     clock = 0;
//   } else
//   if (activeTabTracker == "stopwatch-tab" && document.querySelector('#restart-lap-btn').innerHTML == 'restart') {
//       clock = 1;
//   } 
  
//   if (activeTabTracker == "stopwatch-tab" && document.querySelector('#restart-lap-btn').innerHTML == 'lap') {
//     addTimeRow(stopwatchRow);
//   }
//   else {
//     for (let i = 0; i < 3; i++) {
//         for (let j = 0; j < 2; j++) {
//             timeDigits[i][clock].getElementsByTagName('span')[j].innerText = 0;
//         }
//     }
//   }
// }


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

//
function addTimeRow(currTimingRow) {
  if (activeTabTracker == "stopwatch-tab") {
    let table = document.querySelector('#stopwatch-table');
    
    let idx = currTimingRow == null? 0 : currTimingRow.rowIndex + 1;
    let rowName = currTimingRow == null? 'stopwatch' : 'lap';
    let count = table.rows.length;
    //each row has own tdbody
    //select row's tdbody to add lap row to

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

function keyReleased(evt) {
  if (start && activeTabTracker == 'timer-tab' && evt.keyCode >= 48 && evt.keyCode <= 57) {
    //add thing to make sure user has selected span first before allowing change
    evt.preventDefault();
    evt.target.textContent = String.fromCharCode(evt.keyCode);
  }
  else if (evt.keyCode == 32) {
    evt.preventDefault();
    startStopBtn.click();
  } else
  if (evt.keyCode == 13) {
    evt.preventDefault();
    restartLapBtn.click();
  } else
    evt.preventDefault();
}

//
let stopwatchRow;
let rowUpdateRunner;
let activeTabTracker;
let startTime;
let start = true;

displayTime();
const runningClock = setInterval(displayTime, 1000);
setUpStopwatchTimer();

let startStopBtn = document.querySelector('#start-stop-btn');
//   startStopBtn.addEventListener("click", addTimeRow);
startStopBtn.addEventListener("click", startStop);

let restartLapBtn = document.querySelector('#restart-lap-btn');
restartLapBtn.addEventListener("click", restart);

let tabs = document.querySelectorAll('.tab-btn');
for (var i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', selectTab);
}

//   let container = document.querySelectorAll('.clock-timer');
//   for (var i = 0; i < container.length; i++) {
//     container[i].addEventListener('click', editTime);
//   }

window.addEventListener('keydown', keyReleased);

document.addEventListener('click',function(e){
  if(e.target && e.target.className == 'delete-btn'){
        e.target.innerHTML = 'O';
   }
});

//
let runningTimer;

//  function delRow(x){
//     document.getElementById("myList").deleteRow(x.parentElement.parentElement.rowIndex);
//      }
//      x is button
//      x.parentElement is td of button
//      x.parentElement.parentElement is tr to be deleted
