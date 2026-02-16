import { useEffect, useState, useCallback } from "react";
import "./Registry.css";
import axios from "axios";
// import robot from "../../assets/RobotAtMechanexus.png";
import AddChip from "./AddChip";
import { ChipData, ModalState } from "../../utils/interfaces";
import ChipTable from "./ChipTable";
import Modal from "../../components/Modal";

function Registry() {
  const [data, setData] = useState<ChipData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalState, setModalState] = useState<ModalState>("default");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedChip, setSelectedChip] = useState<ChipData | null>(null);

  console.log(data);
  console.log(isLoading);

  const setDataCallback = useCallback((data: ChipData[] | null) => {
    setData(data);
    console.log("Registry data", data);
  }, []);

  useEffect(() => {
    axios
      .get("/api/chips")
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
      .get("/api/chips")
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
    setModalState("loading");
    axios
      .delete(`/api/chips/${chip_id}`)
      .then((response) => {
        console.log(response.data);
        setModalState("success");
        fetchDataAndReload();
      })
      .catch((error) => {
        setModalState("error");
        console.error("Error deleting data:", error);
      });
  }
  const handleDeleteIconClick = useCallback((chip: ChipData) => {
    setSelectedChip(chip);
    setIsModalOpen(true);
  }, []);
  return (
    <>
      <div>
        <div className="registry-wrapper">
          <div className="registry">
            <h1>Registry</h1>
            {data && modalState ? (
              <>
                <AddChip onAddSuccess={fetchDataAndReload} />
                {data.length > 0 && (
                  <ChipTable
                    data={data}
                    onDeleteIconClick={handleDeleteIconClick}
                  />
                )}
                {isModalOpen && selectedChip && (
                  <Modal
                    title="Delete chip"
                    onClose={() => {
                      setIsModalOpen(false);
                      setModalState("default");
                    }}
                    primaryAction={{
                      text: "Confirm",
                      onClick: () => onDeleteChip(selectedChip.chip_id),
                    }}
                    state={modalState}
                  >
                    <p>
                      Are you sure that you want to delete chip{" "}
                      {selectedChip.chip_name}?
                    </p>
                    <p>Deletion is irreversible.</p>
                  </Modal>
                )}
              </>
            ) : isLoading ? (
              <p className="no-data">Loading...</p>
            ) : (
              <p className="no-data">
                No connection to registry, contact support.
              </p>
            )}
            {/* <img className="robot" src={robot} alt="Robot" /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Registry;
