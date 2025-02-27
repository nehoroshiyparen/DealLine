import { SetStateAction, useEffect, useRef, useState } from "react";
import './defaultList.scss'
import { Discussion, Task, Topic } from "../../../../types";
import DefaultListElement from "./elements/defaultElement";
import { useDiscussionEditContext } from "../../context+provider/discussionEditContext";

interface DefaultListProps {
    list: Discussion;
    type: 'topics' | 'tasks';
    state: Topic | Task | null;
    setState: React.Dispatch<SetStateAction<any>>;
}

const DefaultList = ({ list, state, setState, type }: DefaultListProps) => {
    const [elementsList, setElementsList] = useState<Topic[] | Task[]>([])
    const [isListOpen, setListOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredElements, setFilteredElements] = useState<Topic[] | Task[]>([]);
    const listRef = useRef<HTMLDivElement | null>(null);

    const {
        selectedTopic ,
        selectedTopicTitle,
        selectedTaskTitle,
    } = useDiscussionEditContext()

    const openList = () => {
        setListOpen((prev) => !prev);
    }

    const typeList = () => {
        if (list) {
            if (type === 'topics') {
                return list.topics
            } else if (type === 'tasks') {
                const topicId = selectedTopic?.id
                const listtt = (list.topics ?? []).find(topic => topic.id === topicId)?.tasks 
                return listtt
            }
        }
    }

    useEffect(() => {
        setElementsList(typeList() ?? [])
    }, [list, selectedTopic])

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
        if (!elementsList) return;

        let renderedList: Topic[] | Task[] = [];

        if (type === 'topics') {
            renderedList = elementsList.filter((topic) =>
                topic.title.toLowerCase().includes(searchQuery.toLowerCase())
            ) as Topic[]
        } else if (type === 'tasks') {
            renderedList = elementsList.filter((task) =>
                task.title.toLowerCase().includes(searchQuery.toLowerCase())
            ) as Task[]
        }

        setFilteredElements(renderedList);
    }, [searchQuery, list]); 

    if (!elementsList) return null;

    return (
        <div className='element-choosing--editing'>
            <div className='element-choosing--editing_top' onClick={openList}>
                <div className='choosed-element'>
                    {type === 'topics' ? state ? selectedTopicTitle : 'Выберите тему' : state ? selectedTaskTitle : 'Выберите задачу'}
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
                            ? (searchQuery ? filteredElements : elementsList).map((topic, index) => (
                                <DefaultListElement element={topic} index={index + 1} setState={setState} key={topic.id} />
                            ))
                            : (searchQuery ? filteredElements : elementsList).map((task, index) => (
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
