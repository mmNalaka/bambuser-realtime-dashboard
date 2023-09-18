
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";



const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <DashboardPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <div>register</div>,
    },
    {
      path: "*",
      element: <p>Not Found</p>,
    }
  ]
);

function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

export default App;
