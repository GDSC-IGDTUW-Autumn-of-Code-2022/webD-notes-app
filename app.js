



//DOM selectors
showNotes();
let addbtn = document.getElementById('addBtn');
let addtext = document.getElementById('addTxt');
let searchTxt = document.getElementById('searchTxt');

//Event listeners
addbtn.addEventListener('click', addaNote);
searchTxt.addEventListener('input', searchtext);

//Functions
//let notesArray=[];
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesArray = [];
    }
    else {
        notesArray = JSON.parse(notes);
    }
    let html = '';
    notesArray.forEach(function (element, index) {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
                    </div>
                </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesArray.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section to add notes.`;
    }
    notesElm.style.color = "rgb(115, 115, 115)";
    notesElm.style.fontSize = "20px"
}

function addaNote() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesArray = [];
    }
    else {
        notesArray = JSON.parse(notes);
    }
    if (addtext.value !== "") {
        notesArray.push(addtext.value);
        localStorage.setItem("notes", JSON.stringify(notesArray));
        addtext.value = "";
    }
    else {
        alert("Notes cannot be empty");
    }
    showNotes();
}

function deleteNote(index) {
    //   console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
function searchtext() {

    let inputVal = searchTxt.value;
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })a
}


// theme change function 

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
        document.getElementById('slider').checked = false;
    } else {
        setTheme('theme-light');
        document.getElementById('slider').checked = true;
    }
})();
