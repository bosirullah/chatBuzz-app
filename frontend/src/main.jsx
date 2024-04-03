// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import necessary components

import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import ChatProvider from "../Context/ChatProvider";
import { ChakraProvider } from "@chakra-ui/react";
import "./main.css";

const App = () => {
    return (
        <BrowserRouter>
            <ChatProvider>
                <ChakraProvider>
                    <div className="main">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/chats" element={<ChatPage />} />
                            {/* Add more routes as needed */}
                        </Routes>
                    </div>
                </ChakraProvider>
            </ChatProvider>
        </BrowserRouter>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
