// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { ipcRenderer } = require('electron')

let main = document.querySelector("main")
let passwords = [
  [ "mdp1", "ab_CD;12:34" ],
  [ "mdp2", "+sTr0Ng-P4ssW0rD*" ],
  [ "mdp3", "çAn[y0u]F!nDme?" ]
]

window.onload = () => {
  let mainContent = ``

  passwords.forEach((value, index) => {
    if (index !== 0) {
      mainContent += `<div class="br">&nbsp;</div>`
    }

    let labelStr = value[0]
    let inputStr = value[1]

    mainContent += `
      <div class="group">
        <label>${labelStr}</label>
        <div id="group-${index}" class="group-input">
          <input type="text" value="${inputStr}" id="group-${index}-input" readonly>
          <button id="group-${index}-button">Copy</button>
        </div>
      </div>
    `

    main.innerHTML = mainContent
  })

  passwords.forEach((value, index) => {
    let copyButton = document.querySelector(`#group-${index}-button`)

    copyButton.addEventListener('click', function(event) {
      let copyInput = document.querySelector(`#group-${index}-input`)
      
      copyInput.focus()
      copyInput.select()

      try {
        document.execCommand('copy')
      } catch (err) {
        console.log('Oops, unable to copy')
      }
    })
  })
}

ipcRenderer.send('itemsAdded', passwords.length)
