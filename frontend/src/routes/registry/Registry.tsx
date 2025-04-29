import { useEffect, useState, useCallback } from "react";
import "./Registry.css";
import axios from "axios";
// import robot from "../../assets/RobotAtMechanexus.png";
import AddChip from "./AddChip";
import { ChipData } from "../../utils/interfaces";
import ChipTable from "./ChipTable";

function Home() {
  const [data, setData] = useState<ChipData[] | null>(null),
    [isLoading, setIsLoading] = useState<boolean>(true);

  console.log(data);
  console.log(isLoading);

  const setDataCallback = useCallback((data: ChipData[] | null) => {
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

  function onDeleteChip(chip_id: number) {
    axios
      .delete(`/api/delete/${chip_id}`)
      .then((response) => {
        console.log(response.data);
        fetchDataAndReload();
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  }

  return (
    <>
      <div>
        <div className="registry-wrapper">
          <div className="registry">
            <h1>Registry</h1>
            <AddChip onAddSuccess={fetchDataAndReload} />
            {data && <ChipTable data={data} onDeleteChip={onDeleteChip} />}
            {/* <img className="robot" src={robot} alt="Robot" /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
