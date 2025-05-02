import React, { useState, useEffect } from "react";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  // For Daily Learning - List of 5 random words and meanings
  const [dailyWords, setDailyWords] = useState([]);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem("lastFetchDate");

    if (storedDate !== today) {
      fetchRandomWords().then(randomWords => {
        localStorage.setItem("lastFetchDate", today);
        localStorage.setItem("dailyWords", JSON.stringify(randomWords));
        setDailyWords(randomWords);
      });
    } else {
      const storedWords = JSON.parse(localStorage.getItem("dailyWords"));
      setDailyWords(storedWords);
    }
  }, []);

  // Fetch 5 random words from a random word API
  const fetchRandomWords = async () => {
    try {
      const words = [];
      for (let i = 0; i < 5; i++) {
        const response = await fetch("https://random-word-api.herokuapp.com/word");
        const data = await response.json();
        words.push(data[0]);
      }

      // Fetch definitions for each random word in parallel
      const wordsWithDefinitions = await Promise.all(
        words.map(async (word) => {
          const defResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
          const defData = await defResponse.json();
          return {
            word,
            meaning: defData[0]?.meanings[0]?.definitions[0]?.definition || "No definition found.",
          };
        })
      );

      return wordsWithDefinitions;
    } catch (err) {
      console.error("Error fetching random words:", err);
      return [];
    }
  };

  const fetchDefinition = async () => {
    if (!word.trim()) return;
    setLoading(true);  // Set loading state to true when fetching starts
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) {
        throw new Error("Word not found.");
      }
      const data = await response.json();
      setDefinition(data[0]);
      setError(null);
    } catch (err) {
      setDefinition(null);
      setError(err.message);
    } finally {
      setLoading(false);  // Set loading state to false when fetching is complete
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Enter a word..."
          value={word}
          onChange={(e) => setWord(e.target.value)}
          style={{
            padding: "0.6rem",
            width: "70%",
            maxWidth: "300px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "1rem",
          }}
        />
        <button
          onClick={fetchDefinition}
          style={{
            padding: "0.6rem 1rem",
            marginLeft: "0.5rem",
            backgroundColor: "#4a90e2",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {loading ? "Loading..." : "Search"} {/* Show loading text when fetching */}
        </button>
      </div>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {definition && (
        <div>
          <h2 style={{ color: "#333", textAlign: "center", textTransform: "capitalize" }}>
            {definition.word}
          </h2>
          {definition.meanings.map((meaning, index) => (
            <div key={index} style={{ marginTop: "1rem" }}>
              <h4 style={{ marginBottom: "0.5rem", color: "#4a90e2" }}>{meaning.partOfSpeech}</h4>
              <ul style={{ paddingLeft: "1.2rem", color: "#555" }}>
                {meaning.definitions.map((def, idx) => (
                  <li key={idx} style={{ marginBottom: "0.5rem" }}>
                    {def.definition}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Daily Learning Section */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          backgroundColor: "#eef2f5",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        }}
      >
        <h3 style={{ textAlign: "center", color: "#333" }}>Daily Learning</h3>
        <div style={{ textAlign: "center" }}>
          {dailyWords.length > 0 ? (
            dailyWords.map((dailyWord, index) => (
              <div key={index} style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
                <strong style={{ color: "#4a90e2" }}>{dailyWord.word}</strong>
                <p style={{ marginTop: "0.5rem", color: "#555" }}>{dailyWord.meaning}</p>
              </div>
            ))
          ) : (
            <p>Loading daily words...</p>
          )}
        </div>
      </div>
    </div>
  );
};
//ok ok ok a

export default Dictionary;





