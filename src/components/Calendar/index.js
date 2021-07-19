import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import "./Calendar.css";

const _MONTH_FORMAT = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const _WEEK_FORMAT = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const Index = (props) => {
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());
    const [week, setWeek] = useState(now.getDay());
    const [date, seDate] = useState(now.getDate());
    const [current, setCurrent] = useState(
        new Date(now.getFullYear(), now.getMonth(), 1)
    );
    const [currnetMonth, setCurrnetMonth] = useState(
        new Date(now.getFullYear(), now.getMonth(), 1).getMonth()
    );
    const [currnetMonthFirstDay, setCurrnetMonthFirstDay] = useState(
        new Date(now.getFullYear(), now.getMonth(), 1).getDate()
    );
    const [
        currnetMonthFirstDayOfWeek,
        setCurrnetMonthFirstDayOfWeek,
    ] = useState(new Date(now.getFullYear(), now.getMonth(), 1).getDay());
    const [currnetMonthLastDay, setCurrnetMonthLastDay] = useState(
        new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
    );
    const [currnetMonthLastDayOfWeek, setCurrnetMonthLastDayOfWeek] = useState(
        new Date(now.getFullYear(), now.getMonth() + 1, 0).getDay()
    );
    const [lastMonthLastDay, setLastMonthLastDay] = useState(
        new Date(now.getFullYear(), now.getMonth(), 0).getDate()
    );

    const [source, setSource] = useState([]);

    const [changeState, setChangeState] = useState("date");

    const fetchDates = async (dates, targetDate, isCurrent) => {
        // console.log("fetchDate:", dates, targetDate);
        let arr = [];
        for (let i = dates; i <= targetDate; i++) {
            // console.log(i, dates, targetDate);
            arr.push({ isCurrent, value: i });
        }
        return arr;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchData = async (init) => {
        let arrayDates = [];

        if (currnetMonthFirstDayOfWeek !== 0) {
            const resBefore = await fetchDates(
                lastMonthLastDay - currnetMonthFirstDayOfWeek + 1,
                lastMonthLastDay,
                false
            );
            console.log("resBefore:", resBefore);

            arrayDates = [...arrayDates, ...resBefore];
        }
        const resCurrent = await fetchDates(1, currnetMonthLastDay, true);

        arrayDates = [...arrayDates, ...resCurrent];

        if (currnetMonthLastDayOfWeek !== 6) {
            const resNext = await fetchDates(
                1,
                6 - currnetMonthLastDayOfWeek,
                false
            );

            arrayDates = [...arrayDates, ...resNext];
        }

        setSource([...arrayDates]);
    };

    useEffect(
        () => {
            fetchData();
        },
        [currnetMonth]
    );

    // let day = dayOfWeek(30, 8, 2010);

    const hanleChangeState = (value) => {
        console.log(value);
        setChangeState(value);

        if (value === "month") {
            setCurrnetMonth("");
        }
    };

    const handleChangeMonth = (value) => {
        const init = {
            newMonth: new Date(year, value, 1).getMonth(),
            newMonthFirstDay: new Date(year, value, 1).getDate(),
            newMonthFirstDayOfWeek: new Date(year, value, 1).getDay(),
            newMonthLastDay: new Date(year, value + 1, 0).getDate(),
            newMonthLastDayOfWeek: new Date(year, value + 1, 0).getDay(),
            newLastMonthLastDay: new Date(year, value, 0).getDate(),
        };

        setCurrent(new Date(year, value, 1));
        setCurrnetMonth(value);
        setCurrnetMonthFirstDay(new Date(year, value, 1).getDate());
        setCurrnetMonthFirstDayOfWeek(new Date(year, value, 1).getDay());
        setCurrnetMonthLastDay(new Date(year, value + 1, 0).getDate());
        setCurrnetMonthLastDayOfWeek(new Date(year, value + 1, 0).getDay());
        setLastMonthLastDay(new Date(year, value, 0).getDate());

        fetchData(init);
        setChangeState("date");
    };

    return (
        <div className="cal-calendar">
            <h1>CalendaR</h1>
            <div className="cal-calendar-grid">
                <Header
                    monthFormat={_MONTH_FORMAT}
                    month={currnetMonth}
                    year={year}
                    onChangeState={hanleChangeState}
                    onChangeMonth={handleChangeMonth}
                    current={current}
                    state={changeState}
                />
                {changeState === "date" && (
                    <Content
                        weeks={_WEEK_FORMAT}
                        lastDate={currnetMonthLastDay}
                        source={source}
                        isCurrentMonth={month === currnetMonth}
                        date={date}
                    />
                )}
                {changeState === "month" && (
                    <MonthElement
                        months={_MONTH_FORMAT}
                        onChange={handleChangeMonth}
                    />
                )}
            </div>
        </div>
    );
};

export default Index;

const MonthElement = (props) => {
    const { months, onChange } = props;
    return (
        <div className="cal-month-grid">
            {months.map((el, i) => {
                return (
                    <div
                        className="item item-clickable"
                        key={`month-${el}`}
                        onClick={() => onChange(i)}>
                        {el}
                    </div>
                );
            })}
        </div>
    );
};
