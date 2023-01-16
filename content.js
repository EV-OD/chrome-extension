
var prev_elt = null

let box = null;

function createEditable(elt){
  // Create the box element if it doesn't exist
  if (!box) {
    box = document.createElement("div");
    box.classList.add("editable-box");
    document.body.appendChild(box);
  }

  // Update the position of the box element using the clicked element's bounding rectangle
  updateBoxPosition(elt);

  // Make the clicked element contenteditable, if it's not already contenteditable and not the box element
  if (elt.getAttribute("contenteditable") !== "true" && elt !== box) {
    elt.setAttribute("contenteditable","true")
    elt.focus()
    elt.addEventListener("mousedown", (e) => {
      e.preventDefault();
    });
  }

  // Save a reference to the clicked element
  prev_elt = elt;
}
function updateBoxPosition(elt) {
    let rect = elt.getBoundingClientRect();
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    box.style.top = rect.top + scrollTop + "px";
    box.style.left = rect.left + scrollLeft + "px";
    box.style.width = rect.width + "px";
    box.style.height = rect.height + "px";
  }
  



  
  
  

function resetEditable(elt){
    if(elt){
        elt.removeAttribute("contenteditable")
    }
}


document.addEventListener("click",(e)=>{
    let elt = e.target
    resetEditable(prev_elt)
    createEditable(elt)
})

