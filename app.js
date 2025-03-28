const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

const API_KEY = "AIzaSyBdG9vFRT2wp1zU_2UAFZXEbF4Xe4Nw4Do"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${"AIzaSyBdG9vFRT2wp1zU_2UAFZXEbF4Xe4Nw4Do"}`;

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing  Medi...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening....";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are') || message.includes('explain') || message.includes('define')) {
        getAIResponse(message);  // 🔥 Gemini API is activated here!
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        speak("This is what I found on Wikipedia regarding " + message);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speak("Today's date is " + date);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        speak("Opening Calculator");
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("I found some information for " + message + " on Google");
    }
}

// 🔥 Function to get AI Response from Gemini
async function getAIResponse(query) {
    const requestBody = {
        contents: [{ parts: [{ text: query }] }]
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (data && data.candidates && data.candidates.length > 0) {
            const aiResponse = data.candidates[0].content.parts[0].text;
            speak(aiResponse);  // Speak out the AI response
        } else {
            speak("Sorry, I couldn't find an answer to that.");
        }
    } catch (error) {
        console.error("Error:", error);
        speak("There was an error connecting to the AI service.");
    }
}
