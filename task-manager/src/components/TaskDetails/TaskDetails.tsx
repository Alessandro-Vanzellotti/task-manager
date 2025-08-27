import { MdOutlineEdit } from 'react-icons/md';
import { TaskType } from '../../types';
import './TaskDetails.scss';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  modal: boolean;
  toggleModal: () => void;
  task: TaskType;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export const TaskDetails: React.FC<Props> = ({modal, toggleModal, task, setIsEditing  }) => {

    if(modal) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
      setIsEditing(false);
    }

  return (
    <>
        <div className={'details-modal__content'}>
            <header className={"details-modal__header"}>
              <h2 className={"details-modal__title"}>{task.title}</h2>
              <div className={"details-modal__buttons"}>
                <button
                  className={"details-modal__buttons-edit"}
                  onClick={() => setIsEditing(true)}
                >
                  <MdOutlineEdit />
                </button>
                </div>
          </header>
    
          <section className={"details-modal__description"}>
            <p className={"details-modal__description-text"}>{task.description}</p>
          </section>
          <footer className={"details-modal__footer"}>
            <p>{`Progress: ${task.progress}`}</p>
            <p>{`Priority Level: ${task.priorityLevel}`}</p>
          </footer>
          <button onClick={toggleModal}>CLOSE</button>
        </div>
      </>
  );
};