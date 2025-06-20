import { MdOutlineEdit } from 'react-icons/md';
import { TaskType } from '../../types';
import './DetailsModal.scss';

type Props = {
  modal: boolean;
  toggleModal: () => void;
  task: TaskType;
  handleTaskEditing: () => void;
};

export const DetailsModal: React.FC<Props> = ({modal, toggleModal, task, handleTaskEditing }) => {

    if(modal) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }

  return (

    <div className={"details-modal"}>
        <div className={'details-modal__overlay'} onClick={toggleModal}></div>
        <div className={'details-modal__content'}>
            <header className={"details-modal__header"}>
            <h2 className={"details-modal__title"}>{task.title}</h2>
            <div className={"details-modal__buttons"}>
                      <button
                        className={"details-modal__edit-button button"}
                        onClick={() => handleTaskEditing()}
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
          
        </div>
  );
};