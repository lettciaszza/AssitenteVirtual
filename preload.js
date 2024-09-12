const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    sendPrompt: async (prompt) => ipcRenderer.invoke('send-prompt', prompt)
});
