import "./App.css";
import gptlogo from "./assets/chatgpt.svg";
import addbtn from "./assets/add-30.png";
import msgicon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendbtn from "./assets/send.svg";
import usericon from "./assets/user-icon.png";
import gptimglogo from "./assets/chatgptLogo.svg";
import { useState } from "react";




// Import the function from openai.js
import { sendmsgtooenAI } from "./openai";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      user: "ChatGPT",
      text: "Hello, how can I assist you today?",
    },
  ]);
  const handleNewChat = () => {
  // Messages state को default value पर reset करें
  setMessages([
    {
      user: "ChatGPT",
      text: "Hello, how can I assist you today?",
    },
  ]);
};

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { user: "You", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      // Use sendmsgtooenAI to fetch the response
      const botResponse = await sendmsgtooenAI(input);

      setMessages((prev) => [
        ...prev,
        { user: "ChatGPT", text: botResponse },
      ]);
    } catch (error) {
      console.error("Error in handleSend:", error);
      setMessages((prev) => [
        ...prev,
        { user: "ChatGPT", text: "Error: Couldn't fetch the response!" },
      ]);
    }
  };

  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperside">
          <div className="uppersidetop">
            <img src={gptlogo} alt="Logo" className="logo" />
            <span className="brand">Chat GPT</span>
          </div>
          <button onClick={handleNewChat} className="midbtn">
            <img src={addbtn} className="addbtn" alt="new chat" />
            New Chat
          </button>
          <div className="uppersidebottom">
            <button className="query">
              <img src={msgicon} alt="Query" />
              What is Programming?
            </button>
            <button className="query">
              <img src={msgicon} alt="Query" />
              How to use an API?
            </button>
          </div>
        </div>
        <div className="lowerside">
          <div className="listitems">
            <img src={home} alt="" className="listitemsimg" />
            Home
          </div>
          <div className="listitems">
            <img src={saved} alt="" className="listitemsimg" />
            Saved
          </div>
          <div className="listitems">
            <img src={rocket} alt="" className="listitemsimg" />
            Upgrade to Pro
          </div>
        </div>
      </div>

      <div className="main">
        <div className="chats">
          {messages.map((message, index) => (
            <div key={index} className={`chat ${message.user === "You" ? "" : "bot"}`}>
              <img className="chatimg" src={message.user === "You" ? usericon : gptimglogo} alt="" />
              <p className="txt">{message.text}</p>
            </div>
          ))}
        </div>
        <div className="chatfooter">
          <div className="inp">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Send a message"
            />
            <button className="send" onClick={handleSend}>
              <img src={sendbtn} alt="send" className="btn-move" />
            </button>
          </div>
          <p>
            ChatGPT may produce inaccurate information about people, places, or
            facts. ChatGPT August 20 version.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
