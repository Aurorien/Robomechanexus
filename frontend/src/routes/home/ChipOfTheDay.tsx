import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import "./ChipOfTheDay.css";
import { ApiResponse } from "../../utils/interfaces";

function ChipOfTheDay() {
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
    <div className="chip-of-the-day">
      {loading ? (
        <p>Loading...</p>
      ) : (
        data && (
          <div>
            <h2>Chip of the day</h2>
            <div className="cotd-desc-ctn">
              <div className="cotd-desc-key-ctn">
                <div className="cotd-desc cotd-labels">
                  <p>Name:</p>
                </div>
                <div className="cotd-desc cotd-desc-text">
                  <p>{data[3].chip_name}</p>
                </div>
              </div>
              <div className="cotd-desc-key-ctn">
                <div className="cotd-desc cotd-labels">
                  <p>Use:</p>
                </div>
                <div className="cotd-desc cotd-desc-text">
                  <p>{data[3].chip_use}</p>
                </div>
              </div>
              <div className="cotd-desc-key-ctn">
                <div className="cotd-desc cotd-labels">
                  <p>Type:</p>
                </div>
                <div className="cotd-desc cotd-desc-text">
                  <p>{data[3].item_type_name}</p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default ChipOfTheDay;
