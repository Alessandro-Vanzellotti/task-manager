import './Modal.scss';

type Props = {
  modal: boolean;
  toggleModal: () => void;
};

export const Modal: React.FC<Props> = ({modal, toggleModal}) => {

    if(modal) {
    document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

  return (

    <div className={"modal"}>
        <div onClick={toggleModal} className={'overlay'}></div>
        <div className={'modal__content'}>
            <header className={"modal__header"}>
            <h2 className={"modal__title"}>title</h2>
          </header>
    
          <section className={"modal__description"}>
            <p className={"modal__description-text"}>description</p>
          </section>
          <footer className={"modal__footer"}>
            <p>{`Progress: `}</p>
            <p>{`Priority Level: `}</p>
          </footer>
        </div>
          
        </div>
  );
};