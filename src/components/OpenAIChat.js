import React, { useState } from "react";
import axios from "axios";
import "./OpenAIChat.css"; // Styling file for the chatbot

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false); // Control visibility of chatbot

  const toggleChatbotVisibility = () => {
    setIsChatbotVisible(!isChatbotVisible); // Toggle visibility state
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return; // Prevent empty input

    const userMessage = { sender: "User", text: userInput };
    setChatMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // OpenAI API call
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003", // You can use GPT-4 if available
          prompt: userInput,
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer YOUR_API_KEY`, // Replace YOUR_API_KEY with your actual OpenAI API key
          },
        }
      );

      const botReply = response.data.choices[0].text.trim();
      const botMessage = { sender: "Bot", text: botReply };

      setChatMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error with OpenAI API:", error);
      const errorReply = {
        sender: "Bot",
        text: "There was an issue connecting to the server. Please try again later.",
      };
      setChatMessages((prevMessages) => [...prevMessages, errorReply]);
    }

    setUserInput(""); // Clear input field
  };

  return (
    <div>
      {/* Floating button in the bottom-right corner */}
      <button className="toggle-chatbot-button" onClick={toggleChatbotVisibility}>
        {isChatbotVisible ? "Hide Chatbot" : "Chat"}
      </button>

      {/* Chatbot interface */}
      {isChatbotVisible && (
        <div className="chatbot-container">
          <div className="chat-window">
            {chatMessages.map((message, index) => (
              <div key={index} className={`message-row ${message.sender}`}>
                <div className={`message-bubble ${message.sender}`}>
                  <strong>{message.sender}:</strong> {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="input-box"
              placeholder="Ask me anything..."
            />
            <button className="send-button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
