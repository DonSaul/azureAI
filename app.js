function analyzeFeedback() {
    const feedback = document.getElementById("feedback").value;
    if (!feedback) {
        alert("Please enter feedback before analyzing.");
        return;
    }

    const azureApiKey = "17a124870f814731b17ee373d9127f76";
    const endpoint = "https://eastus.api.cognitive.microsoft.com/text/analytics/v3.1/sentiment";

    const requestData = {
        documents: [
            {
                language: "en",
                id: "1",
                text: feedback
            }
        ]
    };

    $.ajax({
        type: "POST",
        url: endpoint,
        headers: {
            "Ocp-Apim-Subscription-Key": azureApiKey,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        data: JSON.stringify(requestData),
        success: function (data) {
            const sentimentScore = data.documents[0].sentiment;
            const sentiment = getSentimentLabel(sentimentScore);
            const resultElement = document.getElementById("result");
            resultElement.innerHTML = `Sentiment: ${sentiment} (${sentimentScore.toFixed(2)})`;
        },
        error: function (error) {
            console.error("Error analyzing feedback:", error);
            alert("An error occurred while analyzing feedback. Please try again later.");
        }
    });
}

function getSentimentLabel(sentimentScore) {
    if (sentimentScore >= 0.8) {
        return "Very Positive";
    } else if (sentimentScore >= 0.6) {
        return "Positive";
    } else if (sentimentScore >= 0.4) {
        return "Neutral";
    } else if (sentimentScore >= 0.2) {
        return "Negative";
    } else {
        return "Very Negative";
    }
}
