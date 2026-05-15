import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { loader as homeLoader } from "./pages/Home.tsx"
import NoteDetails, { action as noteAction, loader as noteLoader } from "./components/NoteDetails.tsx"
import CreateNote, { action as createNoteAction } from "./components/CreateNote.tsx";
import { action as profileConfigAction } from "./pages/ProfileConfig.tsx";
import AuthProvider from "./context/AuthContext.tsx";
import ProtectedRoutes from "./ProtectedRoutes.tsx";
import Home from "./pages/Home.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import ProfileConfig from "./pages/ProfileConfig.tsx";
import './index.css';

const router = createBrowserRouter([
  { path: "/signin", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/", element: <ProtectedRoutes />, 
    children: [
      { path: "/", 
        element: <Home />,
        loader: homeLoader,
        children: [
          {
            path: "/notes/:id",
            element: <NoteDetails/>,
            loader: noteLoader,
            action: noteAction,
          },
          {
            path: "notes/new",
            element: <CreateNote />,
            action: createNoteAction
          }
        ]
      },
      { path: "/profile", 
        element: <ProfileConfig />, 
        action: profileConfigAction
      }
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)