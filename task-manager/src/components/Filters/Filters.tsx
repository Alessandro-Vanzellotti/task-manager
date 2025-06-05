import { Dispatch, SetStateAction } from "react";
import { progressEnum } from "../../enums";
import { Search } from "../Search/Search";
import { TaskType } from "../../types";
import './Filters.scss';

type Props = {
    taskFilter: string;
    setTaskFilter: Dispatch<SetStateAction<string>>;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    taskList: TaskType[];
}

export const Filters: React.FC<Props> = ({ setTaskFilter, search, setSearch, taskList, taskFilter }) => {
  
    const getProgressClass = () => {
        switch (taskFilter) {
            case progressEnum.all: return 'progress-all';
            case progressEnum.pending: return 'progress-pending';
            case progressEnum.inProgress: return 'progress-inProgress';
            case progressEnum.done: return 'progress-done';
        }
    }

    const getProgressCount = (progress: string): string => {
        let counter = 0;

        taskList.forEach((task: TaskType) => {
        if(task.progress === progress) counter++;
        });
        return counter.toString();
    }

    return (
        <section className={`filters ${getProgressClass()}`} >
          <Search search={search} setSearch={setSearch} />
          <p className={'filters__tag'} onClick={() => setTaskFilter('All')}>{`All (${taskList.length})`}</p>
          <p className={'filters__tag'} onClick={() => setTaskFilter('Pending')}>{`Pending (${getProgressCount('Pending')})`}</p>
          <p className={'filters__tag'} onClick={() => setTaskFilter('In progress')}>{`In progress (${getProgressCount('In progress')})`}</p>
          <p className={'filters__tag'} onClick={() => setTaskFilter('Done')}>{`Done (${getProgressCount('Done')})`}</p>
        </section>
    );
};