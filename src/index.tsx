import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import App from "./App";
import { QuestionPage } from "./components";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ModulePage from "./pages/ModulePage";
import SubscribersPage from "./pages/SubscribersPage";
import ReviewsPage from "./pages/ReviewsPage";
import ProfilePage from "./pages/ProfilePage";
import { PersistGate } from "redux-persist/integration/react";
import SearchModulesPage from "./pages/SearchModulesPage";
import SpecificReviewPage from "./pages/SpecificReviewPage";

const container = document.getElementById("root")!;
const root = createRoot(container);

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path:"/search/:keyword",
        element: <SearchModulesPage />
    },
    {
        path: "*",
        element: <App />,
    },
    {
        path: "/module/:mod",
        element: <ModulePage />,
    },
    {
        path: "/subscribers/:mod",
        element: <SubscribersPage />
    },
    {
        path: "/reviews/:mod",
        element: <ReviewsPage />,
    },
    {
        path: "/reviews/:mod/:userId",
        element: <SpecificReviewPage />
    },
    {
        path: "/thread/:threadId",
        element: <QuestionPage />
    },
    {
        path: "/profile/:userId",
        element: <ProfilePage />
    },
]);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
