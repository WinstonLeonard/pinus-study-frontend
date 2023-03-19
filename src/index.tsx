import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import { QuestionPage } from "./components";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import ReplyTextEditor from "./components/editor/ReplyTextEditor";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const container = document.getElementById("root")!;
const root = createRoot(container);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "*",
        element: <App />,
    },
    {
        path: "/thread/:threadId",
        element: <QuestionPage />
    }, 
    {
        path: "/replytest",
        element: <ReplyTextEditor />
    }
]);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
