import { useEffect, useState, useCallback } from "react";
import "./Home.css";
import axios from "axios";

interface ApiResponse {
  chipid: number;
  chipname: string;
  chipuse: string;
}

function Home() {
  const [data, setData] = useState<ApiResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const setDataCallback = useCallback((data: ApiResponse[] | null) => {
    setData(data);
    console.log("data", data);
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
      <div className="home-wrapper">
        <div className="home-title">
          <h1>Robomechanexus</h1>
          <p>Robot mechatronics workshop</p>
        </div>
      </div>
      <div className="home-wrapper">
        <div className="chip-of-the-day">
          {loading ? (
            <p>Loading...</p>
          ) : (
            data && (
              <div>
                <h2>Chip of the day:</h2>
                <p>Name: {data[2].chipname}</p>
                <p>Use: {data[2].chipuse}</p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
