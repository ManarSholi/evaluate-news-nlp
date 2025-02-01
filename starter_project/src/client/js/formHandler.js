// Replace checkForName with a function that checks the URL
import { isValidURL } from './urlChecker'

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverPort = process.env.NODE_ENV === 'production' ? '8081' : '8080';
const serverURL = `http://localhost:8081`;

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;
    if (!formText) {
        alert("Please enter a valid URL!");
        return;
    }

    // fetch(`http://localhost:${serverPort}`);
    
    // Check if the URL is valid
    const urlResult = isValidURL(formText);
    if (urlResult) {
        // If the URL is valid, send it to the server using the serverURL constant above
        fetch(`${serverURL}/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({url: formText})
        })
        .then(res => res.json())
        .then((res) => {
            const polarity = res.polarity;
            const subjectivity = res.subjectivity;
            const snippet = res.snippet;
            document.getElementById('results').innerHTML = `<p>Polarity: ${polarity}</p><br/><p>Subjectivity: ${subjectivity}</p><br/><p>Snippet: ${snippet}</p>`;
        })
        .catch(error => console.error('Error: ', error));
    }
      
}

// Function to send data to the server

// Export the handleSubmit function
export { handleSubmit };

