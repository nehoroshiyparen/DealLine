import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import './calendar.scss'
import { useState } from "react";
import { useDiscussionEditContext } from "../../context+provider/discussionEditContext";

const Calendar = () => {

    const {
        selectedTask,
        selectedTaskDeadline,
        setSelectedTaskDeadline,
        updateField,
    } = useDiscussionEditContext()

    const handleDateChange = (date: Date | null) => {
        if (date instanceof Date && !isNaN(date.getTime())) {
            setSelectedTaskDeadline(date);
            updateField('deadline', selectedTaskDeadline, selectedTask?.id, 'task')
        } else {
            console.error("Выбрана невалидная дата!");
        }
    };

    return (
        <div className="calendar">
            <DatePicker
                selected={selectedTaskDeadline}
                dateFormat='dd/MM/yyyy'
                onChange={(date) => handleDateChange(date as Date | null)} 
        />

        </div>
    )
}

export default Calendar