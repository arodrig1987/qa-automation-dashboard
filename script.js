let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const pipelineId = document.getElementById('pipeline_id');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';
  
// Change background header image 

  let currentMonth = dt.toLocaleDateString('en-us', { month: 'long' });
  let currentHeader = document.getElementById('header');
  
  switch(currentMonth) {
    case 'January':
      currentHeader.style.backgroundImage = 'url("img/headerdashboardsample.jpeg")';
      break;
    case 'February':
      currentHeader.style.backgroundImage = 'url("img/headerbackground.jpg")';
      break;
    case 'March':
      currentHeader.style.backgroundImage = 'url("img/headerdashboardsample.jpeg")';
      break;
    case 'April':
      currentHeader.style.backgroundImage = 'url("img/headerbackground.jpg")';
      break;
    case 'May':
      currentHeader.style.backgroundImage = 'url("img/headerdashboardsample.jpeg")';
      break;
    case 'June':
      currentHeader.style.backgroundImage = 'url("img/headerbackground.jpg")';
      break;
    case 'July':
      currentHeader.style.backgroundImage = 'url("img/headerdashboardsample.jpeg")';
      break;
    case 'August':
      currentHeader.style.backgroundImage = 'url("img/headerbackground.jpg")';
      break;
    case 'September':
      currentHeader.style.backgroundImage = 'url("img/headerdashboardsample.jpeg")';
      break;
    case 'October':
      currentHeader.style.backgroundImage = 'url("img/headerbackground.jpg")';
      break;
    case 'November':
      currentHeader.style.backgroundImage = 'url("img/headerdashboardsample.jpeg")';
      break;
    case 'December':
      currentHeader.style.backgroundImage = 'url("img/headerbackground.jpg")';
      break;
    default:
      currentHeader.style.backgroundImage = 'url("img/headerbackground.jpg")';
      console.log('default is working');
  }

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }
}

function closeModal() {
  pipelineId.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  pipelineId.value = '';
  clicked = null;
  load();
}

function saveEvent() {
  if (pipelineId.value) {
    pipelineId.classList.remove('error');

    events.push({
      date: clicked,
      title: pipelineId.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    pipelineId.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();// JavaScript Document
