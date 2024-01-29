import React from "react";
import '../assets/history.css';

const History = ({historyItems}) => {
    return(
        <div className="history-container">
      <h2>History</h2>
      <div className="history-cards">
        {historyItems.map((item, index) => (
          <div key={index} className="history-card">
            <h3>{item.title}</h3>
            <p>{item.date}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;