import { MdOutlineEdit } from 'react-icons/md';
import { TaskType } from '../../types';
import './Modal.scss';

type Props = {
  modal: boolean;
  toggleModal: () => void;
  task: TaskType;
  handleTaskEditing: () => void;
};

export const Modal: React.FC<Props> = ({modal, toggleModal, task, handleTaskEditing }) => {

    if(modal) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }

  return (

    <div className={"modal"}>
        <div className={'overlay'} onClick={toggleModal}></div>
        <div className={'modal__content'}>
            <header className={"modal__header"}>
            <h2 className={"modal__title"}>{task.title}</h2>
            <div className={"task__buttons"}>
                      <button
                        className={"task__edit-button button"}
                        onClick={() => handleTaskEditing()}
                      >
                        <MdOutlineEdit />
                      </button>
                    </div>
          </header>
    
          <section className={"modal__description"}>
            <p className={"modal__description-text"}>{task.description}</p>
          </section>
          <footer className={"modal__footer"}>
            <p>{`Progress: ${task.progress}`}</p>
            <p>{`Priority Level: ${task.priorityLevel}`}</p>
          </footer>
          <button onClick={toggleModal}>CLOSE</button>
        </div>
          
        </div>
  );
};