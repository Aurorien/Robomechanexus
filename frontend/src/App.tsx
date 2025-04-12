import Home from "./components/Home";
import Registry from "./components/Registry";
import NavBar from "./components/NavBar";

import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";

function Root() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: "/" },
        { element: <Registry />, path: "/registry" },
      ],
      element: <Root />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
