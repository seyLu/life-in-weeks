let INITIAL_DATE=new Date(2e3,0,1),DATE_TODAY=new Date,isPageVisited=localStorage.getItem("isPageVisited",!1);let Canvas={init:()=>{var e=document.getElementById("canvas");for(let t=-1;t<=89;t++){var a=document.createElement("div"),r=(a.classList.add("flex"),document.createElement("div"));r.classList.add("mr-1","w-4","h-2","text-xs","text-right");t%5==0&&(r.innerText=t);a.append(r);for(let e=0;e<52;e++)if(-1===t){var d=document.createElement("div");d.classList.add("mb-0","w-[min(0.5rem,1.25vw)]","h-4","m-[1px]","text-xs","text-right");if(e%5==0){0===e&&(e+=1);d.innerText=e}a.append(d)}else{d=document.createElement("div");d.classList.add("box","w-[min(0.5rem,1.25vw)]","h-2","m-[1px]","border-solid","border","border-sky-500");d.dataset.week=1+52*t+e;a.append(d)}e.append(a)}}},DatePicker={init:(n,e)=>{dp=new AirDatepicker("#datepicker",{locale:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",clear:"Clear",dateFormat:"MM/dd/yyyy",timeFormat:"hh:mm aa",firstDay:0},dateFormat(e){return e.toLocaleString("en",{year:"numeric",day:"2-digit",month:"long"})},onSelect(e){var t,a,e=e.date;Math.abs((DATE_TODAY.getTime()-e.getTime())/1e3);e=e,t=DATE_TODAY.getUTCFullYear()-e.getUTCFullYear(),a=DATE_TODAY.getTime()>new Date(DATE_TODAY.getUTCFullYear(),e.getMonth(),e.getDate()).getTime()?0:1,a=new Date(DATE_TODAY.getUTCFullYear()-a,e.getMonth(),e.getDate()),e=Math.floor((DATE_TODAY.getTime()-a.getTime())/864e5);let r=52*t+Math.floor(e/7);var d,i=Array.from(n).filter(e=>parseInt(e.getAttribute("data-week"),10)<=r);for(d of n)i.includes(d)?d.classList.add("bg-red-600"):d.classList.remove("bg-red-600")}});let t=!1;e.onclick=()=>{if(!t){t=!0;dp.selectDate(INITIAL_DATE,{silent:!1})}}}},Loader={init:e=>{e.classList.remove("hidden");localStorage.setItem("isPageVisited",!0)},end:(e,t)=>{e.classList.add("hidden");for(var a of t)a.classList.remove("hidden")},show:e=>{for(var t of e)t.classList.remove("hidden")}};document.addEventListener("DOMContentLoaded",function(){let e=document.getElementById("loader"),t=document.querySelectorAll(".no-js");isPageVisited?Loader.show(t):Loader.init(e);Canvas.init();var a=document.querySelectorAll(".box"),r=document.getElementById("datepicker");DatePicker.init(a,r);isPageVisited||setTimeout(()=>{Loader.end(e,t)},3e3)});