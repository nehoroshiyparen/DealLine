import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import './calendar.scss'
import { format } from 'date-fns'
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
            const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ssxxx');
            setSelectedTaskDeadline(date);
            updateField('deadline', formattedDate, selectedTask?.id!, 'task');
        } else {
            console.error("Выбрана невалидная дата!");
        }
    };

    return (
        <div className="calendar">
            <DatePicker
                selected={selectedTaskDeadline ? selectedTaskDeadline : null}
                dateFormat='dd/MM/yyyy'
                onChange={(date) => handleDateChange(date as Date | null)} 
        />

        </div>
    )
}

export default Calendar