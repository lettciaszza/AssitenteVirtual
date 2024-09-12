const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true, //permite o uso de Node.js
            contextIsolation: true //melhora a segurança
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => { //recriar a janela se o usuário a fechar
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.handle('send-prompt', async (event, prompt) => { //Recebe as mensagens do usuario
    const response = await sendPostRequest(prompt);
    return response;
});

async function sendPostRequest(prompt) {
    // const fetch = require('node-fetch');
    const response = await fetch('http://localhost:3000/prompt', { //comunicação com o back
        method: 'POST', //Envia um post para o servidor local, com a mensagem fornecida
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt })
    });
    const data = await response.text();
    console.log(data)
    return data.response; 
}
