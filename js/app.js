console.log('welcome to notes taking app');
showNotes();

//If user adds a note, add it to local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function(){
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if(notes == null){     //if no notes available
        notesObj=[];       //empty array
    }
    else{
        notesObj = JSON.parse(notes);  // convert string to array
    }
    let myObj= {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    addTxt.value="";      // after adding note text area should be empty
    addTitle.value="";
    // console.log(notesObj);

    if((addTxt.value.length == 0) && (addTitle.value.length == 0)){
        alert("Please enter a note");
    }
    showNotes();
})

// function to show notes from local storage
function showNotes(){
    let notes = localStorage.getItem('notes');
    if(notes == null){     //if no notes available
        notesObj=[];       //empty array
    }
    else{
        notesObj = JSON.parse(notes);  // convert string to array
    }
    let html = "";

    if((addTxt.value.length != 0) && (addTitle.value.length != 0)){
    notesObj.forEach(function(element,index){
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        
        <div class="card-body">
          <h5 class="card-title"> ${element.title}</h5>
          <p class="card-text"> ${element.text}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete note </button>
        </div>
      </div>  `;
    });
    }

    let notesElm = document.getElementById('notes');
    if(notesObj.length !=0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = ` No notes available. Use "Add a note" section to add notes.`;
    }
}

//function to delete note
function deleteNote(index){
    // console.log('Deleting node', index);

    let notes = localStorage.getItem('notes');
    if(notes == null){     //if no notes available
        notesObj=[];       //empty array
    }
    else{
        notesObj = JSON.parse(notes);  // convert string to array
    }

    notesObj.splice(index,1);  //remove one element starting from index
    localStorage.setItem('notes', JSON.stringify(notesObj));  //update local storage after deleting note
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input' , function(){
    let inputVal = search.value.toLowerCase();
    // console.log('input event fired', inputVal);
    let noteCards= document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = 'block';      // show it
        }
        else{
            element.style.display = 'none';      //hide it
        }
        // console.log(cardTxt);
    })
    // let notFound = document.getElementById('notes');
    // notFound.innerText=" NOT FOUND";
})