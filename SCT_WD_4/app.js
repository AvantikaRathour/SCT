import React from "react";
import ReactDOM from "react-dom/client";
import MyBooks from "./MyBooks";
const AppLayout = () => {
    return (
        <div>
            <MyBooks />
        </div>
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />)