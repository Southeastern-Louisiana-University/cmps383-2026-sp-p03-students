import { useEffect, useState } from "react";
import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";
import "@/styles/App.css";
import { UncontrolledIncrementCountButton } from "@/components/IncrementCountButton";
import { UserLoggedInContext } from "@/context/UserLoggedInContext";
import { Link } from "react-router";

interface LocationDto {
  address: string;
  id: number;
  managerId: number | null;
  name: string;
  tableCount: number;
}

function App() {
  //const [count, setCount] = useState(0);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [locations, setLocations] = useState<LocationDto[]>([]);

  useEffect(() => {
    const locationApi = "/api/locations";
    fetch(locationApi)
      .then((response) => response.json() as Promise<LocationDto[]>)
      .then((data) => {
        console.log("locations", data);
        setLocations(data);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

  return (
    <>
      <UserLoggedInContext.Provider value={isLoggedIn}>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React is cool</h1>

        <Link to="/test">Go to test page!</Link>
        {locations.length > 0 ? (
          <ul>
            {locations.map((location) => (
              <li key={location.id}>
                <h2>{location.name}</h2>
                <p>{location.address}</p>
                <p>Tables: {location.tableCount}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No locations available.</p>
        )}
        <div>
          <button onClick={() => setIsLoggedIn((isLoggedIn) => !isLoggedIn)}>
            {isLoggedIn ? "Log out" : "Log in"}
          </button>
        </div>
        <div className="card">
          <UncontrolledIncrementCountButton />

          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </UserLoggedInContext.Provider>
    </>
  );
}

export default App;
