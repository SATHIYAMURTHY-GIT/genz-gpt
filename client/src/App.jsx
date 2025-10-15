import React, { useState, useRef, useEffect } from "react";
import { API_BASE } from "./config";

export default function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey — I'm GenZ GPT. Say something, and I'll respond with confidence." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("default");
  const [theme, setTheme] = useState("light");
  const [userColor, setUserColor] = useState("#10b981");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const bottomRef = useRef(null);
  const colorPickerRef = useRef(null);

  const colors = [
    "#10b981", "#06b6d4", "#f59e0b", "#ef4444",
    "#8b5cf6", "#ec4899", "#3b82f6", "#14b8a6"
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
        setShowColorPicker(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(API_BASE + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, mode }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: "bot", text: "Error: Could not reach server." }]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const isDark = theme === "dark";
  const bgColor = isDark ? "#0b0b0d" : "#f5f5f7";
  const panelColor = isDark ? "#0f1720" : "#ffffff";
  const textColor = isDark ? "#e6eef8" : "#1a1a1a";
  const accentColor = isDark ? "#1a2332" : "#e5e7eb";
  const botBgColor = isDark ? "#111827" : "#f0f0f0";

  return (
    <div style={{ 
      backgroundColor: bgColor, 
      color: textColor,
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      transition: "all 0.3s ease"
    }}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${accentColor}; border-radius: 3px; }
        @keyframes typing {
          0%, 60%, 100% { opacity: 0.3; }
          30% { opacity: 1; }
        }
      `}</style>

      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        backgroundColor: panelColor,
        borderBottom: `1px solid ${accentColor}`,
        gap: "12px"
      }}>
        <h1 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>🔥 Gen-Z GPT</h1>
        
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            style={{
              background: accentColor,
              border: "none",
              borderRadius: "8px",
              padding: "6px 10px",
              cursor: "pointer",
              color: textColor,
              fontSize: "16px",
              transition: "all 0.2s ease"
            }}
            onMouseOver={(e) => e.target.style.background = userColor}
            onMouseOut={(e) => e.target.style.background = accentColor}
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          <div style={{ position: "relative" }} ref={colorPickerRef}>
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                border: `2px solid ${userColor}`,
                background: userColor,
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseOut={(e) => e.target.style.transform = "scale(1)"}
            />
            
            {showColorPicker && (
              <div style={{
                position: "absolute",
                top: "45px",
                right: 0,
                background: panelColor,
                border: `1px solid ${accentColor}`,
                borderRadius: "12px",
                padding: "10px",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "8px",
                zIndex: 1000,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
              }}>
                {colors.map(color => (
                  <div
                    key={color}
                    onClick={() => {
                      setUserColor(color);
                      setShowColorPicker(false);
                    }}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: color,
                      border: color === userColor ? `2px solid ${textColor}` : "none",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      boxShadow: color === userColor ? `0 0 0 2px ${panelColor}, 0 0 0 4px ${textColor}` : "none"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                ))}
              </div>
            )}
          </div>

          <select 
            value={mode} 
            onChange={e => setMode(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              background: accentColor,
              color: textColor,
              border: `1px solid ${accentColor}`,
              fontSize: "13px",
              cursor: "pointer",
              fontFamily: "inherit"
            }}
          >
            <option value="default">Default</option>
            <option value="motivate">Motivator</option>
            <option value="savage">Savage</option>
          </select>
        </div>
      </header>

      <main style={{
        padding: "16px 20px",
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: panelColor
      }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              maxWidth: "85%",
              padding: "10px 14px",
              borderRadius: "16px",
              lineHeight: 1.5,
              fontSize: "14px",
              wordWrap: "break-word",
              alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
              background: m.sender === "user" ? userColor : botBgColor,
              color: m.sender === "user" ? "white" : textColor,
              borderBottomRightRadius: m.sender === "user" ? "4px" : "16px",
              borderBottomLeftRadius: m.sender === "bot" ? "4px" : "16px",
              border: m.sender === "bot" ? `1px solid ${accentColor}` : "none",
              boxShadow: m.sender === "user" ? `0 1px 2px rgba(0,0,0,0.1)` : "none"
            }}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div style={{
            alignSelf: "flex-start",
            display: "flex",
            gap: "4px",
            padding: "10px 14px"
          }}>
            {[0, 1, 2].map(i => (
              <div
                key={i}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#999",
                  animation: `typing 1.4s infinite`,
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0.3
                }}
              />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </main>

      <footer style={{
        display: "flex",
        gap: "10px",
        padding: "14px 16px",
        alignItems: "flex-end",
        background: panelColor,
        borderTop: `1px solid ${accentColor}`
      }}>
        <textarea
          placeholder="Type your rizz..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          style={{
            flex: 1,
            minHeight: "40px",
            maxHeight: "100px",
            resize: "none",
            padding: "10px 14px",
            borderRadius: "12px",
            background: bgColor,
            color: textColor,
            border: `1px solid ${accentColor}`,
            fontFamily: "inherit",
            fontSize: "14px",
            transition: "all 0.2s ease",
            outline: "none"
          }}
          onFocus={(e) => e.target.style.borderColor = userColor}
          onBlur={(e) => e.target.style.borderColor = accentColor}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            padding: "10px 16px",
            borderRadius: "10px",
            background: userColor,
            border: "none",
            color: "white",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "14px",
            transition: "all 0.2s ease",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: loading ? 0.5 : 1
          }}
          onMouseOver={(e) => !loading && (e.target.style.opacity = "0.9")}
          onMouseOut={(e) => !loading && (e.target.style.opacity = "1")}
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </footer>
    </div>
  );
}
