document.getElementById('analyzeButton').addEventListener('click', analyzeSentiment);

function analyzeSentiment() {
    const inputText = document.getElementById('inputText').value;

    // Replace 'YOUR_TEXT_ANALYTICS_API_KEY' with your actual Text Analytics API key
    const apiKey = 'YOUR_TEXT_ANALYTICS_API_KEY';
    const endpoint = 'https://YOUR_REGION.api.cognitive.microsoft.com/text/analytics/v3.1/sentiment';

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': apiKey
        },
        body: JSON.stringify({
            documents: [{
                language: 'en',
                id: '1',
                text: inputText
            }]
        })
    })
    .then(response => response.json())
    .then(data => {
        const sentimentScore = data.documents[0].sentiment;
        const sentimentText = sentimentScore > 0.5 ? 'positive' : sentimentScore < 0.5 ? 'negative' : 'neutral';
        document.getElementById('result').innerText = `Sentiment: ${sentimentText}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
