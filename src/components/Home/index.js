import React from "react";
import { Calendar } from "../index";
import "./Home.css";

const Index = (props) => {
    return (
        <div className="cal-home">
            <div className="cal-home-grid">
                <Calendar />
            </div>
        </div>
    );
};

export default Index;
