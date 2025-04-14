import { useEffect, useState, useCallback } from "react";
import "./Registry.css";
import axios from "axios";
import robot from "../../assets/RobotAtMechanexus.png";
import AddChip from "./AddChip";
import { ApiResponse } from "../../utils/interfaces";
// import ChipTable from "./ChipTable";

function Home() {
  const [data, setData] = useState<ApiResponse[] | null>(null),
    [isLoading, setIsLoading] = useState<boolean>(true);

  const setDataCallback = useCallback((data: ApiResponse[] | null) => {
    setData(data);
    console.log("Registry data", data);
  }, []);

  useEffect(() => {
    axios
      .get("/api")
      .then((response) => {
        setDataCallback(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [setDataCallback]);

  function fetchDataAndReload() {
    axios
      .get("/api")
      .then((response) => {
        setDataCallback(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }

  return (
    <>
      <div>
        <div className="registry-wrapper">
          <div className="registry">
            <h1>Registry</h1>
            <AddChip onAddSuccess={fetchDataAndReload} />
            <h2 className="registry-h2">Registered chips</h2>
            {/* <ChipTable data={data} isLoading={isLoading}/> */}
            <img src={robot} alt="Robot" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
