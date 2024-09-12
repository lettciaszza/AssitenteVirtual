window.onload = () => {
    const submitButton = document.getElementById('submit');
    const promptInput = document.getElementById('prompt');
    const responseParagraph = document.getElementById('response');


    async function sendPostRequest(prompt) {
        const response = await fetch('http://localhost:3000/prompt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: prompt })
        });
        const data = await response.text();
        return data; 
    }
    
    submitButton.addEventListener('click', async () => {
        const prompt = promptInput.value;
        if (prompt) {
            const response = await sendPostRequest(prompt);
            console.log(response)
            responseParagraph.textContent = response || 'No response from server';
        } else {
            responseParagraph.textContent = 'Please enter a prompt';
        }
    });
};
