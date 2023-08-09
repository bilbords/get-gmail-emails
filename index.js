// ==UserScript==
// @name         Get emails and usernames
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Copy all emails and usernames on cookie in the clipboard
// @match        *://*.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        GM_addStyle
// ==/UserScript==

if (document.documentElement.hasAttribute('dir') && !document.documentElement.hasAttribute('class')) {
    var zNode = document.createElement('div')
    zNode.innerHTML = `<button id="btn" class="LinkButton">Get emails</button>`
    zNode.setAttribute('id', 'myContainer')
    document.body.appendChild(zNode)
}

const usernameClass = 'znj3je'
const emailClass = 'Wdz6e'

const getInfoButton = document.getElementById('btn')

getInfoButton.addEventListener('click', getAllData, false)

async function getAllData() {
    const usernames = document.getElementsByClassName(usernameClass)
    const emails = document.getElementsByClassName(emailClass)
    let text = ''
    for (let i = 0; i < usernames.length; i++) {
        text += usernames[i].innerText + ' | '
        text += emails[i].innerText + '\n'
    }
    await navigator.clipboard.writeText(text)
        .then(() => {
        console.log('Data succesfully wrote in the clipboard!')
    })
        .catch(err => {
        console.log('Something went wrong', err);
    });
}

GM_addStyle(`

 #myContainer {
  z-index: 999;
  position: absolute;
  top: 40px;
  right: 25px;
}

.LinkButton {
  background-color: white;
  border: 2px solid #008cba;
  border-radius: 5px;
  color: black;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.LinkButton:hover {
  background-color: #008cba;
  color: white;
}

`)
