//Components
import UserForm from './Components/UserForm';
import ReviewForm from './Components/ReviewForm';
import Thanks from './Components/Thanks';
import Steps from './Components/Steps';

import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

//Hooks
import { useState } from 'react';
import {useForm} from "./Hooks/useForm";

//CSS

import './App.css'

type FormFields = {
  name: string,
  email: string,
  review: string,
  comment: string,
}

const formTemplate: FormFields = {
  name: "",
  email: "",
  review: "",
  comment: "",
};

function App() {

  const [data, setData] = useState(formTemplate);

  const updateFieldHandler = (key: string, value: string) => {

    setData ((prev) => {
      return {...prev, [key]: value};
    });

  }

  const formComponents = [
    <UserForm data={data} updateFieldHandler={updateFieldHandler} />,
    //<ReviewForm data={data} //updateFieldHandler={updateFieldHandler} />,
    //<Thanks data={data} />,
  ];

  const {currentStep, currentComponent, changeStep} = useForm(formComponents);
  return (
    <div className="app">
      <div className='header'>
        <h2>Deixe sua avaliação</h2>
        <p>
          Ficamos felizes com a sua compra, utilize o formulário abaixo para avaliar o produto
        </p>
      </div>
      <div className="form-container">
        <Steps currentStep = {currentStep}/>

        <form onSubmit={(e) => changeStep(currentStep+1, e)}>

          <div className='inputs-container'></div>
          {currentComponent}

          <div className='actions'>

            <button type="button" onClick={() => changeStep(currentStep-1)}><GrFormPrevious/><span>Voltar</span></button>

            <button type='submit'><span>Avançar</span><GrFormNext/></button>
          </div>
        </form>
      </div>
    </div>
  );

}

export default App
