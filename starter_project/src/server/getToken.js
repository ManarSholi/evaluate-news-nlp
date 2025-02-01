const axios = require('axios');

// function getToken(username, password) {
//     return axios.post('https://api.aylien.com/v1/oauth/token',
//         new URLSearchParams({
//             'grant_type': 'password'
//         }),
//         {
//             auth: {
//                 username: username,
//                 password: password
//             },
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         }
//     )
//     .then(response => {
//         const token = response.data.access_token;
//         const refreshToken = response.data.refresh_token;

//         return {token, refreshToken};
//     })
//     .catch(error => {
//         console.error('Error fetching token: ', error);
//         throw error;
//     });
// }

async function getToken(username, password) {
    try {
        const response = await axios.post("https://api.aylien.com/v1/oauth/token", {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: 'Basic ' + btoa(`${username}:${password}`),
                grant_type: "password",
            }
        });

        return response.data.access_token;
    } catch (error) {
        console.error("Error fetching token:", error.response ? error.response.data : error.message);
    }

}

module.exports = getToken;
