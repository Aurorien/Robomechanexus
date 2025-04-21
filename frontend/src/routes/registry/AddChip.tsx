import { useState } from "react";
import "./AddChip.css";
import CircuitTop from "../../assets/circuits/CircuitTop";
import CircuitMiddle from "../../assets/circuits/CircuitMiddle";
import CircuitBottom from "../../assets/circuits/CircuitBottom";

interface AddChipProps {
  onAddSuccess: () => void;
}

function AddChip({ onAddSuccess }: AddChipProps) {
  const [formData, setFormData] = useState({
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
        onAddSuccess();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const isSubmitDisabled = !(formData.name && formData.use && formData.type);

  return (
    <div className="add-chip-form-ctn">
      <form onSubmit={handleSubmit} aria-labelledby="form-title">
        <fieldset>
          <legend id="form-title">Add new chip</legend>
          <div className="add-chip-ctn">
            <div className="form-groups-ctn">
              <div className="add-chip-labels">
                <label htmlFor="name">Name:</label>
                <label htmlFor="use">Use:</label>
                <label htmlFor="type">Type:</label>
              </div>

              <div className="add-chip-inputs">
                <input
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  required
                  aria-required="true"
                  aria-invalid={!formData.name}
                />
                <input
                  id="use"
                  name="use"
                  onChange={handleChange}
                  value={formData.use}
                  required
                  aria-required="true"
                  aria-invalid={!formData.use}
                />
                <input
                  id="type"
                  name="type"
                  onChange={handleChange}
                  value={formData.type}
                  required
                  aria-required="true"
                  aria-invalid={!formData.type}
                />
              </div>
            </div>

            <div className="add-chip-circuits">
              <CircuitTop
                color={
                  formData.name ? "var(--circuit-on)" : "var(--circuit-off)"
                }
              />
              <CircuitMiddle
                color={
                  formData.use ? "var(--circuit-on)" : "var(--circuit-off)"
                }
              />
              <CircuitBottom
                color={
                  formData.type ? "var(--circuit-on)" : "var(--circuit-off)"
                }
              />
            </div>

            <div className="add-chip-form-button">
              <button
                type="submit"
                disabled={isSubmitDisabled}
                aria-disabled={isSubmitDisabled}
              >
                Add
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default AddChip;
