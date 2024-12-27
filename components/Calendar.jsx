// An editable/custom calendar inorder to add events and reminders

import React, { useState } from "react";
import { PiArrowSquareLeftFill, PiArrowSquareRightFill } from "react-icons/pi";
import {
    format,
    startOfWeek,
    addDays,
    isSameDay,
    addMonths,
    subMonths,
    parse,
} from "date-fns";
/**
 * Calendar component that displays a monthly calendar with selectable dates and events.
 *
 * @component
 * @example
 * return (
 *   <Calendar />
 * )
 */

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState([]);

    /**
     * Renders the header of the calendar with navigation controls for previous and next month.
     *
     * @function
     * @returns {JSX.Element} The header component of the calendar.
     */
    const renderHeader = () => {
      const dateFormat = "MMMM yyyy";
  
      return (
        <>
          <h1 className="text-2xl dark:text-white font-bold sm:text-3xl text-center mb-5">
            Calendar of Events
          </h1>
          <div className="header border border-gray-200 dark:border-gray-700 flex justify-between items-center mb-4">
            <div className="icon cursor-pointer" onClick={prevMonth}>
              <span className="material-icons">
                <PiArrowSquareLeftFill className=" w-10 h-10 dark:text-white" />
              </span>
            </div>
            <div className="text-lg font-bold dark:text-white">
              <span>{format(currentMonth, dateFormat)}</span>
            </div>
            <div className="icon cursor-pointer" onClick={nextMonth}>
              <span className="material-icons">
                <PiArrowSquareRightFill className=" w-10 h-10 dark:text-white" />
              </span>
            </div>
          </div>
        </>
      );
    };

    /**
     * Renders the days of the week.
     *
     * @function
     * @returns {JSX.Element} The days of the week component.
     */
    const renderDays = () => {
      const days = [];
      const dateFormat = "EEEE";
      const startDate = startOfWeek(currentMonth);
  
      for (let i = 0; i < 7; i++) {
        days.push(
          <div className="col text-center font-medium dark:text-white" key={i}>
            {format(addDays(startDate, i), dateFormat)}
          </div>
        );
      }
  
      return <div className="days grid grid-cols-7 border border-gray-200 dark:border-gray-700 p-2">{days}</div>;
    };

    /**
     * Renders the cells of the calendar for the current month.
     *
     * @function
     * @returns {JSX.Element} The cells of the calendar component.
     */
    const renderCells = () => {
      const monthStart = startOfWeek(currentMonth);
      const monthEnd = addDays(monthStart, 42);
      const dateFormat = "d";
      const rows = [];
  
      let days = [];
      let day = monthStart;
      let formattedDate = "";
  
      while (day <= monthEnd) {
        for (let i = 0; i < 7; i++) {
          formattedDate = format(day, dateFormat);
          const cloneDay = day;
          days.push(
            <div
              className={`col p-2 border border-gray-200 dark:border-gray-700 text-center cursor-pointer ${
                !isSameDay(day, selectedDate) ? "bg-gray-100 dark:bg-gray-800" : "bg-blue-200 dark:bg-blue-600"
              }`}
              key={day}
              onClick={() => onDateClick(cloneDay)}
            >
              <span className="number dark:text-white">{formattedDate}</span>
              <div>{renderEvents(day)}</div>
            </div>
          );
          day = addDays(day, 1);
        }
        rows.push(
          <div className="row grid grid-cols-7 " key={day}>
            {days}
          </div>
        );
        days = [];
      }
      return <div className="body">{rows}</div>;
    };

    /**
     * Handles the click event on a date cell, allowing the user to add an event.
     *
     * @function
     * @param {Date} day - The date that was clicked.
     */
    const onDateClick = (day) => {
      setSelectedDate(day);
      const eventTitle = prompt("Enter event title:");
      if (eventTitle) {
        setEvents([...events, { date: day, title: eventTitle }]);
      }
    };

    /**
     * Renders the cells of the calendar for the current month.
     *
     * @function
     * @returns {JSX.Element} The cells of the calendar component.
     */
    const renderEvents = (day) => {
      return events
        .filter((event) => isSameDay(event.date, day))
        .map((event, index) => (
          <div key={index} className="event bg-blue-200 dark:bg-blue-600 p-1 rounded mt-1">
            {event.title}
          </div>
        ));
    };

    /**
     * Advances the calendar to the next month.
     *
     * @function
     */
    const nextMonth = () => {
      setCurrentMonth(addMonths(currentMonth, 1));
    };

    /**
     * Moves the calendar to the previous month.
     *
     * @function
     */
    const prevMonth = () => {
      setCurrentMonth(subMonths(currentMonth, 1));
    };
  
    return (
      <div className="calendar p-5 pt-24 bg-white dark:bg-gray-900 shadow-md rounded-lg">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    );
  };
  
  export default Calendar;
