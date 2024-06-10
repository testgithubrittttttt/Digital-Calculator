/* Reset CSS */
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

body {
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    color: #fff;
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
    margin: 0;
    overflow: hidden;
    animation: backgroundAnimation 15s ease infinite;
}

@keyframes backgroundAnimation {
    0% {
        background: linear-gradient(135deg, #1e3c72, #2a5298);
    }
    50% {
        background: linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b);
    }
    100% {
        background: linear-gradient(135deg, #1e3c72, #2a5298);
    }
}

.header {
    display: flex;
    justify-content: space-between;
    width: 350px;
    margin-bottom: 10px;
}

.container {
    width: 350px;
    max-height: 80vh;
    overflow-y: auto;
    background: #ffffff33;
    border-radius: 10px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    padding: 10px;
}

input {
    padding: 20px 10px;
    width: 100%;
    border: none;
    font-size: 1.5em;
    background-color: #00000080;
    color: #fff;
    text-align: right;
    margin-bottom: 10px;
    border-radius: 5px;
}

table {
    border-collapse: collapse;
    width: 100%;
}

td {
    font-size: 1.2em;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    transition: 0.3s;
    border-radius: 5px;
}

td:hover {
    transform: scale(1.1);
    transition: transform 0.2s;
}

.vari {
    background-color: #ff8c00;
    color: #fff;
}

.vari:hover {
    background-color: #ff6500;
}

.equalbtn {
    background: #50c878;
    color: #fff;
    font-weight: bold;
}

.equalbtn:hover {
    background: #47a86b;
}

/* Advanced Mode */
.advanced-row {
    display: none;
}

.container.advanced .advanced-row {
    display: table-row;
}

/* History Section */
.history {
    background: #00000080;
    color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    max-height: 150px;
    overflow-y: auto;
}

.history h3 {
    margin-bottom: 5px;
}

.history ul {
    list-style: none;
    padding: 0;
}

.history li {
    margin: 5px 0;
}

/* Voice Input Button */
.voice-input {
    background: #50c878;
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 10px;
}

.voice-input:hover {
    background: #47a86b;
}

/* Export and Clear History Buttons */
.export-history, .clear-history {
    background: #ff8c00;
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
}

.export-history:hover, .clear-history:hover {
    background: #ff6500;
}

/* Converter Button */
.converter {
    background: #00aced;
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 10px;
}

.converter:hover {
    background: #0084b4;
}

/* Customize Button */
.customize {
    background: #9b59b6;
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
}

.customize:hover {
    background: #8e44ad;
}

/* Responsive Design */
@media (max-width: 600px) {
    .container {
        width: 90%;
    }
    .header {
        width: 90%;
    }
    td {
        padding: 10px;
        font-size: 1em;
    }
    input {
        font-size: 1.2em;
    }
}

/* Button Animation */
td.active {
    background-color: #fff;
    color: #333;
    transition: background-color 0.2s, color 0.2s;
}

/* Input Focus Animation */
input:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    transition: box-shadow 0.3s ease-in-out;
}

/* Dark Theme */
body.dark {
    background: linear-gradient(135deg, #0d0d0d, #434343);
    color: #fff;
}

.container.dark {
    background: #33333388;
}

/* Light Theme */
body.light {
    background: linear-gradient(135deg, #ffffff, #e6e6e6);
    color: #000;
}

.container.light {
    background: #f9f9f9;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Toggle Theme Button */
.toggle-theme, .toggle-mode {
    background: #50c878;
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
}

.toggle-theme:hover, .toggle-mode:hover {
    background: #47a86b;
}

/* Accessibility Focus */
td:focus {
    outline: 2px solid #50c878;
}

/* Button Feedback */
td:active {
    transform: scale(0.9);
    transition: transform 0.1s;
}

/* Modal Styles */
.modal {
    display: none;
    position: fixed;
    z-index: 1;
    padding-top: 60px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
}

.modal .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    border-radius: 10px;
}

.modal .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.modal .close:hover,
.modal .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
