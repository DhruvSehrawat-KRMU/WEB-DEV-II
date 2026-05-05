window.onload = showEvents;

// add event
function addEvent() {
    let title = document.getElementById("eventTitle").value;
    let date = document.getElementById("eventDate").value;
    let category = document.getElementById("category").value;
    let description = document.getElementById("description").value;

    if (!title || !date || !description) {
        alert("Fill all fields");
        return;
    }

    // get old data or empty array
    let events = JSON.parse(localStorage.getItem("events")) || [];

    // create new event
    let event = {
        id: Date.now(),
        title: title,
        date: date,
        category: category,
        description: description
    };

    events.push(event);

    // save again
    localStorage.setItem("events", JSON.stringify(events));

    clearInputs();
    showEvents();
}

// show events
function showEvents() {
    let eventList = document.getElementById("eventList");
    let events = JSON.parse(localStorage.getItem("events")) || [];

    eventList.innerHTML = "";

    if (events.length === 0) {
        eventList.innerHTML = "No events yet";
        return;
    }

    for (let i = 0; i < events.length; i++) {
        let e = events[i];

        eventList.innerHTML += `
            <div class="event-item">
                <h3>${e.title}</h3>
                <p>Date: ${e.date}</p>
                <p>Category: ${e.category}</p>
                <p>${e.description}</p>
                <button onclick="deleteEvent(${e.id})">Delete</button>
            </div>
        `;
    }
}

// delete one event
function deleteEvent(id) {
    let events = JSON.parse(localStorage.getItem("events")) || [];

    events = events.filter(e => e.id !== id);

    localStorage.setItem("events", JSON.stringify(events));
    showEvents();
}

// clear all
function clearEvents() {
    localStorage.removeItem("events");
    showEvents();
}

// clear inputs
function clearInputs() {
    document.getElementById("eventTitle").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";
}