import { SetStateAction, useEffect, useRef, useState } from "react";
import './defaultList.scss'
import { Discussion, Task, Topic } from "../../../../types";
import DefaultListElement from "./elements/defaultElement";

interface DefaultListProps {
    list: Discussion | Topic | null | undefined;
    state: Topic | Task | null;
    setState: React.Dispatch<SetStateAction<any>>;
}

const DefaultList = ({ list, state, setState }: DefaultListProps) => {
    const [isListOpen, setListOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredElements, setFilteredElements] = useState<Topic[] | Task[]>([]);
    const listRef = useRef<HTMLDivElement | null>(null);

    const openList = () => {
        setListOpen((prev) => !prev);
    }

    useEffect(() => {
        const list = listRef.current;
        if (!list) return;

        if (isListOpen) {
            list.style.height = '0px';
            list.style.height = '300px';
        } else {
            list.style.height = '0px';
        }
    }, [isListOpen]);

    useEffect(() => {
        if (!list) return;

        let renderedList: Topic[] | Task[] = [];

        if ('topics' in list) {
            renderedList = list.topics.filter((topic) =>
                topic.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        } else if ('tasks' in list) {
            renderedList = list.tasks.filter((task) =>
                task.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredElements(renderedList);
    }, [searchQuery, list]); 

    if (!list) return null;

    return (
        <div className='element-choosing--editing'>
            <div className='element-choosing--editing_top' onClick={openList}>
                <div className='choosed-element'>
                    {state ? state.title : 'topics' in list ? 'Выберите тему' : 'Выберите задачу'}
                </div>
                <div className='element-list--open' style={{ rotate: `${isListOpen ? '-90deg' : '0deg'}` }}></div>
            </div>
            <div className='element-list--editeble' ref={listRef}>
                <div className="search--element">
                    <input
                        className="search-input"
                        placeholder="Поиск по названию"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="element-list--scroll">
                    <div className="element-list--inside">
                        {'topics' in list
                            ? (searchQuery ? filteredElements : list.topics).map((topic, index) => (
                                <DefaultListElement element={topic} index={index + 1} setState={setState} key={topic.id} />
                            ))
                            : (searchQuery ? filteredElements : list.tasks).map((task, index) => (
                                <DefaultListElement element={task} index={index + 1} setState={setState} key={task.id} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DefaultList;
