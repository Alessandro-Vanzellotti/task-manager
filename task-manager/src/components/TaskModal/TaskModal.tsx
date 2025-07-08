import { IoMdAdd } from 'react-icons/io';
import './TaskModal.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormInput, TaskType } from '../../types';
import { priorityLevelsEnum, progressEnum } from '../../enums';
import { Dispatch, SetStateAction, useState } from 'react';
import { DetailsModal } from '../DetailsModal/DetailsModal';
import { TaskEditingForm } from '../TaskEditingForm/TaskEditingForm';

type Props = {
  modal: boolean;
  toggleModal: () => void;
  task: TaskType;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export const TaskModal: React.FC<Props> = ({modal, toggleModal, task, isEditing, setIsEditing }) => {

    if(modal) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
      setIsEditing(false);
    }



  return (

    <div className={"task-modal"}>
        <div className={'task-modal__overlay'} onClick={toggleModal}></div>
            {isEditing ?
                <TaskEditingForm modal={modal} toggleModal={toggleModal} task={task} isEditing={isEditing} setIsEditing={setIsEditing} /> :
                <DetailsModal modal={modal} toggleModal={toggleModal} task={task} isEditing={isEditing} setIsEditing={setIsEditing} />}
        </div>
  );
};