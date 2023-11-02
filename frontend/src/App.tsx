import { useEffect, useState, useCallback } from "react";
import "./App.css";
import axios from "axios";
import robot from "./assets/RobotAtMechanexus.png";

interface ApiResponse {
  chip: string;
}

function App() {
  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const setDataCallback = useCallback((data: ApiResponse | null) => {
    setData(data);
  }, []);

  useEffect(() => {
    axios
      .get("/api")
      .then((response) => {
        setDataCallback(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [setDataCallback]);

  return (
    <>
      <h1>Robomechanexus</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p>Robot mechatronics workshop</p>
      <div className="chip-of-the-day">
        {loading ? (
          <p>Loading...</p>
        ) : (
          data && (
            <div>
              <h2>Chip of the day:</h2>
              <p>{data.chip}</p>
            </div>
          )
        )}
      </div>
      <img src={robot} alt="Robot" />
    </>
  );
}

export default App;
