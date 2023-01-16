function rgbaToHex(rgba) {
    let parts = rgba.substring(rgba.indexOf("(")).split(","),
      r = parseInt(parts[0].substring(1), 10),
      g = parseInt(parts[1], 10),
      b = parseInt(parts[2], 10),
      a = parseFloat(parts[3]).toFixed(2);
  
    // Return a hexadecimal value for the RGBA color
    return '#' +
      (
        (1 << 24) +
        (r << 16) +
        (g << 8) +
        b
      ).toString(16).slice(1) 
    //   +
    //   Math.round(parseFloat(a) * 255).toString(16).padStart(2, '0');
  }
  
  

function rgbOrrgbaToHex(color) {
    // Check if the color is in the rgba format
    if (color.includes('rgba')) {
        return rgbaToHex(color)
    } else {
      // If the color is in the rgb format, convert it to the hex format
      let values = color.match(/\d+/g);
      let r = parseInt(values[0]).toString(16).padStart(2, '0');
      let g = parseInt(values[1]).toString(16).padStart(2, '0');
      let b = parseInt(values[2]).toString(16).padStart(2, '0');
      return '#' + r + g + b;
    }
  }
  

var clickedEl;

var menu = document.createElement("div");
menu.id = "menu";
menu.innerHTML = `
<div id="menu-form">
    <button type="button" id="close-button" class="menu-button">X</button>
    <label for="text-input">Text:</label>
    <textarea id="text-input" ></textarea>
    <div style="display:flex">
    <div>
    <label for="color-input">Color:</label>
    <input type="color" id="color-input" aria-label="color" />
    </div>
    <div>
    <label for="bg-input">Background-color:</label>
    <input type="color" id="bg-input" aria-label="backgroundColor" />
    </div>
    </div>
    <label>Padding</label>
    <div style="display:flex">
    <div>
        <div>
            <label for="left-padding">Left</label>
            <input type="number" id="left-padding" aria-label="paddingLeft" />
        </div>
        <div>
            <label for="right-padding">right</label>
            <input type="number" id="right-padding" aria-label="paddingRight" />
        </div>
        </div>
        <div>
        <div>
            <label for="top-padding">top</label>
            <input type="number" id="top-padding" aria-label="paddingTop" />
        </div>
        <div>
            <label for="bottom-padding">bottom</label>
            <input type="number" id="bottom-padding" aria-label="paddingBottom" />
        </div>
        </div>
    </div>
    <label>Margin</label>
    <div style="display:flex">
        <div>
        <div>
        <label for="left-margin">Left</label>
        <input type="number" id="left-margin" aria-label="marginLeft" />
    </div>
    <div>
        <label for="right-margin">right</label>
        <input type="number" id="right-margin" aria-label="marginRight" />
    </div>
        </div>
        <div>
        <div>
            <label for="top-margin">top</label>
            <input type="number" id="top-margin" aria-label="marginTop" />
            </div>
            <div>
                <label for="bottom-margin">bottom</label>
                <input type="number" id="bottom-margin" aria-label="marginBottom" />
                </div>
            </div>
            </div>
  </div>
`;

function applyChange(e,type,unit){
    let elt = e.target
    let value = elt.value
    if(type == "text"){
        clickedEl.innerHTML = elt.value
    }else if(type === "style"){
        clickedEl.style[elt.ariaLabel] = elt.value + unit
    }
}


menu.classList.add("menu");

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "enable") {
    disableAllElements()
    document.addEventListener("click", handleMenu);
  } else if (message.type === "disable") {
    enableAllElements()
    menu.style.display = "none";
    document.removeEventListener("click", handleMenu);
  }
});

document.body.appendChild(menu);

document.getElementById('text-input').addEventListener('input', function(e) {
    applyChange(e,'text',"");
  });
  
  document.getElementById('color-input').addEventListener('input', function(e) {
    applyChange(e,"style", "");
  });
  
  document.getElementById('bg-input').addEventListener('input', function(e) {
    applyChange(e,"style", "");
  });
  
  document.getElementById('left-padding').addEventListener('input', function(e) {
    applyChange(e,"style", 'px');
  });
  
  document.getElementById('right-padding').addEventListener('input', function(e) {
    applyChange(e,"style", 'px');
  });
  
  document.getElementById('top-padding').addEventListener('input', function(e) {
    applyChange(e,"style", 'px');
  });
  
  document.getElementById('bottom-padding').addEventListener('input', function(e) {
    applyChange(e,"style", 'px');
  });
  document.getElementById('left-margin').addEventListener('input', function(e) {
    applyChange(e,"style", 'px');
  });
  document.getElementById('right-margin').addEventListener('input', function(e) {
    applyChange(e,"style", 'px');
  });
  document.getElementById('top-margin').addEventListener('input', function(e) {
    applyChange(e,"style", 'px');
  });
  document.getElementById('bottom-margin').addEventListener('input', function(e) {
    applyChange(e,"style", 'px');
  });
  function disableAllElements() {
    var allElements = document.querySelectorAll("*");
    allElements.forEach(function(element) {
        element.disabled = true;
    });
}

function enableAllElements() {
    var allElements = document.querySelectorAll("*");
    allElements.forEach(function(element) {
        element.disabled = false;
    });
}


function handleMenu(event) {
  event.preventDefault()
    if (
      event.target !== menu &&
      !menu.contains(event.target) &&
      event.target.tagName !== "FORM"
    ) {
      clickedEl = event.target;
      menu.style.display = "block";
  
      document.getElementById("text-input").value = event.target.innerHTML;
      document.getElementById("color-input").value = rgbOrrgbaToHex(
        window.getComputedStyle(clickedEl).color
      );
      console.log(rgbOrrgbaToHex(window.getComputedStyle(clickedEl).backgroundColor))
      document.getElementById("bg-input").value = rgbOrrgbaToHex(
        window.getComputedStyle(clickedEl).backgroundColor
      );
      document.getElementById("left-padding").value =
      parseFloat(window.getComputedStyle(clickedEl).paddingLeft);
      document.getElementById("right-padding").value =
        parseFloat(window.getComputedStyle(clickedEl).paddingRight);
      document.getElementById("top-padding").value =
        parseFloat(window.getComputedStyle(clickedEl).paddingTop);
      document.getElementById("bottom-padding").value =
        parseFloat(window.getComputedStyle(clickedEl).paddingBottom);
      document.getElementById("left-margin").value =
        parseFloat(window.getComputedStyle(clickedEl).marginLeft);
      document.getElementById("right-margin").value =
        parseFloat(window.getComputedStyle(clickedEl).marginRight);
      document.getElementById("top-margin").value =
        parseFloat(window.getComputedStyle(clickedEl).marginTop);
      document.getElementById("bottom-margin").value =
        parseFloat(window.getComputedStyle(clickedEl).marginBottom);
  
      // Position the menu below the clicked element
      var rect = clickedEl.getBoundingClientRect();
      menu.style.top = rect.top + window.pageYOffset + rect.height + "px";
      menu.style.left = rect.left + window.pageXOffset + "px";
    }
  }
  

document
  .getElementById("close-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    menu.style.display = "none";
  });
