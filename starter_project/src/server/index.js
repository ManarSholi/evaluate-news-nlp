var path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const Sentiment = require('sentiment');
const nlp = require('compromise');

// Initialize the sentiment analyzer
const sentiment = new Sentiment();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

console.log(__dirname);

const PORT = 8081;

const apiKey = process.env.API_KEY;

app.get('/', function (req, res) {
    res.send("This is the server API page, you may access its services via the client app.");
});

// POST Route

app.post('/analyze', async (req, res) => {
    const url = req.body.url;

    if (!url) {
        return res.status(400).json({error: "URL is required"});
    }

    axios.get(`https://api.diffbot.com/v3/article?token=${apiKey}&url=${url}`)
    .then(response => {
        const articleContent = response.data.objects[0].text;

        // Polarity analysis (positive/negative)
        const sentimentResult = sentiment.analyze(articleContent);
        const polarity = sentimentResult.score > 0 ? 'positive' : 'negative';

        // Subjectivity analysis (subjective/factual)
        const doc = nlp(articleContent);
        const subjectivity = doc.sentences().has('#Adjective') || doc.sentences().has('#Verb') ? 'subjective' : 'factual';

        // Extract a text snippet (first 100 characters)
        const snippet = articleContent.substring(0, 100);

        const result = {
            data: {
                'polarity': polarity,
                'subjectivity': subjectivity,
                'snippet': snippet,
                'articleContent': articleContent
            }
        };
        return result;
    })
    .then(sentimentResponse => {
        const polarity = sentimentResponse.data.polarity;  // 'positive' or 'negative'
        const subjectivity = sentimentResponse.data.subjectivity;  // 'subjective' or 'factual'
        const snippet = sentimentResponse.data.articleContent.substring(0, 100);  // Text snippet

        return res.json({
            'polarity': polarity,
            'subjectivity': subjectivity,
            'snippet': snippet
        });
    })
    .catch(error => {
        console.error(error);
    });
});

// Designates what port the app will listen to for incoming requests
app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});


