import { useState } from "react";
import { SyncLoader } from "react-spinners";
import "./App.css";

function App() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleGetAdvice(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAdvice("");

    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      if (!response.ok) {
        setError("HOUSTON!! I have failedd to fetch advice.. nooo..");
        return;
      }
      const data = await response.json();
      setAdvice(data.slip.advice);
    } catch (e) {
      setError("HOUSTON!! Something went wrong. Please try again...nooo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <form onSubmit={handleGetAdvice}>
        <button type="submit" disabled={loading}>
          Get Random Advice
        </button>
      </form>

      {loading && <SyncLoader color="green" size={15} />}

      {advice && <p className="result">"{advice}"</p>}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
