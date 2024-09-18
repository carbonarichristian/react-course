import { useState } from "react";

const messages = [
  'Step 1: Learn React',
  'Step 2: Apply for jobs',
  'Step 3: Invest your new income',
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function NextStep() {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  }

  function PreviousStep() {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }

  return (
    <div>
      <button className="close" onClick={() => setIsOpen(!isOpen)}>
        &times;
      </button>
      { isOpen &&
        <div className="steps">
          <div className="numbers">
            <div className= { currentStep === 1 ? 'active':'' }>1</div>
            <div className= { currentStep === 2 ? 'active':'' }>2</div>
            <div className= { currentStep === 3 ? 'active':'' }>3</div>
          </div>
          <div className="message">
            {messages[currentStep - 1]}
          </div>
          <div className="buttons">
            <button style={{ backgroundColor: '#7950f2' }} onClick={ PreviousStep }>
                <span>Previous</span>
            </button>
            <button style={{ backgroundColor: '#7950f2' }} onClick={ NextStep }>
              <span>Next</span>
            </button>
          </div>
        </div>
      }
    </div>
  );
}
