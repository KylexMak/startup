import React from 'react';
import './instructions.css';

export function Instructions() {
  const cardContainer = document.querySelector('.card-container');
  recipe.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');

    let info = `
            <h2>${item.name}</h2>
            <h3>Ingredients</h3>
        `;
    let addIngredients = DisplayIngredients(item.materials);
    let addSteps = DisplaySteps(item.instructions);

    info += "\n<ul>\n";
    info += addIngredients;
    info += "</ul>\n";
    info += "<h3>Steps</h3>";
    info += "\n<ol>\n";
    info += addSteps;
    info += "</ol>";

    card.innerHTML = info;
    cardContainer.appendChild(card);
  });

  function DisplayIngredients(listOfIngredients) {
    let ret_string = '';
    let new_ingredients = listOfIngredients.split('\n');
    new_ingredients.forEach(ingredient => {
      ret_string += `<li>${ingredient}</li>\n`;
    });
    return ret_string;
  }
  function DisplaySteps(listOfSteps) {
    let ret_string = '';
    let new_steps = listOfSteps.split('\n');
    new_steps.forEach(step => {
      ret_string += `<li>${step}</li>\n`;
    });
    return ret_string;
  }

  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

  socket.onopen = (event) => {
    appendMsg('system', 'websocket', 'connected');
  };

  // Display messages we receive from our friends
  socket.onmessage = async (event) => {
    const text = await event.data.text();
    const chat = JSON.parse(text);
    appendMsg('friend', chat.name, chat.msg);
  };

  // If the webSocket is closed then disable the interface
  socket.onclose = (event) => {
    appendMsg('system', 'websocket', 'disconnected');
  };

  // Send a message over the webSocket
  function sendMessage() {
    const msgEl = document.querySelector('#comment');
    const msg = msgEl.value;
    if (!!msg) {
      appendMsg('me', 'me', msg);
      const name = Username.textContent;
      socket.send(`{"name":"${name}", "msg":"${msg}"}`);
      msgEl.value = '';
    }
  }

  // Create one long list of messages
  function appendMsg(cls, from, msg) {
    const chatText = document.querySelector('#chat-text');
    chatText.innerHTML =
      `<div><span class="${cls}">${from}</span>: ${msg}</div>` +
      chatText.innerHTML;
  }

  // Send message on enter keystroke
  const input = document.querySelector('#comment');
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  return (
    <body>
      <div className="card-container">
      </div>
      <div className="card">
        <h1>Comments</h1>
        <div className="comment-content">
          <label>Your Comment:</label>
          <input id="comment" type="text"></input>
          <button className="btn btn-outline-primary" onclick="sendMessage()">Send</button>
        </div>
      </div>
      <div className="card">
        <div className="chat-header">
          <h1>Chat Feed:</h1>
        </div>
        <div id="chat-text"></div>
      </div>
    </body>
  );
}