import React from 'react';
import './style.scss';

const Stepper = ({ currentStep = 1, totalSteps = 6 }) => {
  const steps = [
    {
      id: 1,
      title: 'Student Information',
      icon: '👤',
      status: currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : 'pending'
    },
    {
      id: 2,
      title: 'Academic Information',
      icon: '🎓',
      status: currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : 'pending'
    },
    {
      id: 3,
      title: 'Guardian Information',
      icon: '👥',
      status: currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : 'pending'
    },
    {
      id: 4,
      title: 'Address Information',
      icon: '📍',
      status: currentStep === 4 ? 'active' : currentStep > 4 ? 'completed' : 'pending'
    },
    {
      id: 5,
      title: 'Fee & Documents',
      icon: '📄',
      status: currentStep === 5 ? 'active' : currentStep > 5 ? 'completed' : 'pending'
    },
    {
      id: 6,
      title: 'Review & Submit',
      icon: '✅',
      status: currentStep === 6 ? 'active' : 'pending'
    }
  ];

  return (
    <div className="stepper">
      <div className="stepper__steps">
        {steps.map((step, index) => {
          const isLastStep = index === steps.length - 1;
          const nextStep = steps[index + 1];
          const shouldShowConnector = !isLastStep;
          const connectorStatus = nextStep ? 
            (step.status === 'completed' && nextStep.status !== 'pending' ? 'completed' : 'pending') : 
            'pending';

          return (
            <div 
              key={step.id} 
              className={`stepper__step stepper__step--${step.status}`}
            >
              <div className="stepper__step-icon">
                {step.status === 'completed' ? '✓' : step.icon}
              </div>
              <span className="stepper__step-title">{step.title}</span>
              {shouldShowConnector && (
                <div className={`stepper__connector stepper__connector--${connectorStatus}`}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
