import Home from "./routes/home/Home";
import Registry from "./routes/registry/Registry";
import NavBar from "./components/NavBar";

import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import Logo from "./components/Logo";

function Root() {
  return (
    <>
      <NavBar />
      <Logo />
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
