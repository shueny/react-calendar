import React from "react";
import "./Content.css";

const Index = (props) => {
    const { weeks, source, isCurrentMonth, date } = props;
    if (!source) return null;

    return (
        <div className="cal-content-container">
            <div className="cal-content-grid">
                <div className="cal-content-grid-weeks">
                    { weeks.map((v, i) => {
                        return (
                            <div key={ `week-${i}` } className="item">
                                { v.substring(0, 3) }
                            </div>
                        );
                    }) }
                </div>
                <div className="cal-content-grid-dates">
                    { source.map((el, i) => {
                        return (
                            <div
                                className={ `item${isCurrentMonth && date === el.value
                                        ? " active"
                                        : ""
                                    }${el.isCurrent === false ? " grey" : ""}` }
                                key={ `date-${i}` }>
                                { el.value }
                            </div>
                        );
                    }) }
                </div>
            </div>
        </div>
    );
};

export default Index;
