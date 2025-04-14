import ChipOfTheDay from "./ChipOfTheDay";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="home-wrapper">
        <div className="home-title">
          <h1>Robomechanexus</h1>
          <p>Robot mechatronics workshop</p>
        </div>
      </div>
      <div className="home-wrapper">
        <ChipOfTheDay />
      </div>
    </>
  );
}

export default Home;
