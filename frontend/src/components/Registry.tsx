import { useEffect, useState, useCallback } from "react";
import "./Registry.css";
import axios from "axios";
import robot from "../assets/RobotAtMechanexus.png";

interface ApiResponse {
  chipid: number;
  chipname: string;
  chipuse: string;
  itemtypename: string;
}

function Home() {
  const [data, setData] = useState<ApiResponse[] | null>(null),
    [loading, setLoading] = useState<boolean>(true),
    [formData, setFormData] = useState({
      name: "",
      use: "",
      type: "",
    });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const jsonData = JSON.stringify(formData);

    console.log("jsonData", jsonData);

    fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        fetchDataAndReload();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const isSubmitDisabled = !(formData.name && formData.use && formData.type);

  const setDataCallback = useCallback((data: ApiResponse[] | null) => {
    setData(data);
    console.log("Registry data", data);
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

  function fetchDataAndReload() {
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
  }

  return (
    <>
      <h1>Registry</h1>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          data && (
            <div className="reg-list-wrapper">
              <div className="reg-list">
                <h2>Registered chips:</h2>
                <ol className="reg-ol">
                  {data.map((data) => (
                    <li key={data.chipid}>
                      <span className="reg-li-label">Name:</span> {data.chipname} <span><span className="reg-li-label">Use:</span> {data.chipuse}</span>
                      <span><span className="reg-li-label">Type:</span> {data.itemtypename}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )
        )}
      </div>
      <div>
        <div className="add-chip-wrapper">
          <h2 className="add-chip">Add chip</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input name="name" onChange={handleChange} value={formData.name} />
          </label>
          <label>
            Use:
            <input name="use" onChange={handleChange} value={formData.use} />
          </label>
          <label>
            Type:
            <input name="type" onChange={handleChange} value={formData.type} />
          </label>
          <button type="submit" disabled={isSubmitDisabled}>
            Add
          </button>
        </form>
      </div>
      <img src={robot} alt="Robot" />
    </>
  );
}

export default Home;
