function nextTime(t){
    let now=new Date(),[h,m]=t.split(":").map(Number);
    let e=new Date(now.getFullYear(),now.getMonth(),now.getDate(),h,m);
    if(e<=now) e.setDate(e.getDate()+1);
    return e;
}

function render(){
    let tb=document.getElementById("list"); 
    tb.innerHTML="";
    for(let [name,times] of Object.entries(events)){
        let soonest=times.map(nextTime).sort((a,b)=>a-b)[0];
        let diff=soonest-new Date();
        let totalSeconds=Math.floor(diff/1000);

        let h=Math.floor(totalSeconds/3600);
        let m=Math.floor((totalSeconds%3600)/60);
        let s=totalSeconds%60;

        tb.innerHTML+=`<tr>
            <td>${name}</td>
            <td>${soonest.toLocaleTimeString()}</td>
            <td class="countdown" data-time="${totalSeconds}">
                ${h} ชม. ${m} นาที ${s} วิ
            </td>
        </tr>`;
    }
}

function startCountdown() {
    setInterval(() => {
        document.querySelectorAll('.countdown').forEach(el => {
            let timeLeft = parseInt(el.getAttribute('data-time'), 10);
            if (timeLeft > 0) {
                timeLeft--;
                el.setAttribute('data-time', timeLeft);

                let h = Math.floor(timeLeft / 3600);
                let m = Math.floor((timeLeft % 3600) / 60);
                let s = timeLeft % 60;

                el.innerHTML = `${h} ชม. ${m} นาที ${s} วิ`;

                if (timeLeft <= 300) { 
                    el.classList.add('red');
                    if (!el.querySelector('.bell')) {
                        el.innerHTML += ' <span class="bell">🔔</span>';
                        playBell();
                    }
                }
            } else {
                el.textContent = "เริ่มแล้ว";
            }
        });
    }, 1000);
}

function playBell(){
    const audio = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
    audio.volume = 0.3;
    audio.play();
}

render();
startCountdown();