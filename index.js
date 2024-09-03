window.addEventListener("load", () => {
    loadNotes();
    handleNotes();
});

let notesData = [];

// Load notes from localStorage
const loadNotes = () => {
    const savedNotes = localStorage.getItem("notesData");
    if (savedNotes) {
        notesData.push(...JSON.parse(savedNotes));
    }
};

// Save notes to localStorage
const saveNotes = () => {
    localStorage.setItem("notesData", JSON.stringify(notesData));
};


const handleNotes = () => {
    const notes = document.getElementById("notes");
    let str = "";

    if (notesData.length > 0) {
        notesData.forEach((item) => {
            str += `
            <div class="notes">
                <div class="about_notes">
                    <div class="status">
                        ${item.category}
                    </div>
                    <div class="actions">
                        <input type="checkbox" name="" id="checkbox">
                        <button  onClick="handleEdit(${item.id})">
                        
                        <i class="fa-regular fa-pen-to-square"></i>
                    
                        <button onClick="handleDelete(${item.id})">
                         <i class="fa-solid fa-trash" ></i>
                        </button>
                    </div>
                </div>
                <div class="title">
                    ${item.title}
                </div>
                <div class="desc">
                    ${item.desc}
                </div>
                <div class="date">
                    ${item.date}
                </div>
            </div>`;
        });
    }

    if (notes) {
        notes.innerHTML = str;
    }

    
    // const deleteItem = document.getElementById("delete");
    // deleteItem.addEventListener("click",(e)=>{
    //     handleDelete()
    // })


};

const form = document.getElementById("form");
const input = document.querySelectorAll(".input");
const form2 = document.getElementById("form2");

let obj = {};

const handleChange = (e) => {
    obj[e.target.id] = e.target.value;
};

input.forEach((item) => {
    item.addEventListener("change", (e) => { handleChange(e) });
});

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // const savedNotes = localStorage.getItem("notesData");
        // const arr = JSON.parse(savedNotes);
        obj.id = notesData.length;
        notesData.push(obj);
        saveNotes(); // Save notesData to localStorage
        handleNotes();
        // Clear the form inputs after adding
        input.forEach((input) => {
            input.value = "";
        });
        obj = {}; // Clear the temporary object
        window.location.href = "./index.html"
    });
}



const handleDelete = (id) =>{
    // console.log(id)
    //  localStorage.removeItem("id");
     const updatedArray = notesData.filter((item)=> item.id !== id);
     notesData=[...updatedArray];
     saveNotes();
    // Re-render the notes
    handleNotes();
}



const handleEdit = (id) => {
    // Store the note ID in localStorage for later use
    localStorage.setItem("editNoteId", id);
    // Redirect to the editing page
    window.location.href = "./form2.html";
};
document.addEventListener("DOMContentLoaded", () => {
    const notesData = JSON.parse(localStorage.getItem("notesData")) || [];
    const editNoteId = localStorage.getItem("editNoteId");

    if (editNoteId) {
        const note = notesData.find(note => note.id === parseInt(editNoteId));

        if (note) {
            document.getElementById('category').value = note.category;
            document.getElementById('title').value = note.title;
            document.getElementById('desc').value = note.desc;
            document.getElementById('date').value = note.date;
        }
    }
});


const editForm = document.getElementById('form2');

if(editForm){
editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const notesData = JSON.parse(localStorage.getItem("notesData")) || [];
    const editNoteId = localStorage.getItem("editNoteId");

    if (editNoteId) {
        const noteIndex = notesData.findIndex(note => note.id === parseInt(editNoteId));
        
        if (noteIndex > -1) {
            notesData[noteIndex] = {
                id: parseInt(editNoteId),
                category: document.getElementById('category').value,
                title: document.getElementById('title').value,
                desc: document.getElementById('desc').value,
                date: notesData[noteIndex].date // keep the original date
            };
            localStorage.setItem("notesData", JSON.stringify(notesData));
            // Clear the ID from localStorage and redirect to the main page
            localStorage.removeItem("editNoteId");
            window.location.href = "./index.html";
        }
    }
});
}





