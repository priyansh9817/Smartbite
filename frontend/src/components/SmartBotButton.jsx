import React, { useState } from "react";
import SmartBotChat from "./SmartBotChat";
import "../../src/smartbot.css";

export default function SmartBotButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="smartbot-fab" onClick={() => setOpen(true)}>
        🤖
      </div>

      {open && (
        <div className="smartbot-modal">
          <div className="smartbot-header">
            <h4>Smart Food Bot</h4>
            <button className="close-btn" onClick={() => setOpen(false)}>×</button>
          </div>

          <SmartBotChat onClose={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
