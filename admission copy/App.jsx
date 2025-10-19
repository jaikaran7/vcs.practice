import React, { useState } from 'react';
import StudentInformation from './StudentInformation';
import AcademicInformation from './AcademicInformation';
import GuardianInformation from './GuardianInformation';
import AddressInformation from './AddressInformation';
import FeeAndDocuments from './FeeAndDocuments';
import ReviewAndSubmit from './ReviewAndSubmit';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    student: {},
    academic: {},
    guardian: {},
    address: {},
    feeDocs: {}
  });

  const handleNext = (stepData) => {
    // Update form data with current step data
    if (currentStep === 1) {
      setFormData(prev => ({ ...prev, student: stepData }));
    } else if (currentStep === 2) {
      setFormData(prev => ({ ...prev, academic: stepData }));
    } else if (currentStep === 3) {
      setFormData(prev => ({ ...prev, guardian: stepData }));
    } else if (currentStep === 4) {
      setFormData(prev => ({ ...prev, address: stepData }));
    } else if (currentStep === 5) {
      setFormData(prev => ({ ...prev, feeDocs: stepData }));
    }

    // Move to next step
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = (stepData) => {
    // Update form data with current step data
    if (currentStep === 2) {
      setFormData(prev => ({ ...prev, student: stepData }));
    } else if (currentStep === 3) {
      setFormData(prev => ({ ...prev, academic: stepData }));
    } else if (currentStep === 4) {
      setFormData(prev => ({ ...prev, guardian: stepData }));
    } else if (currentStep === 5) {
      setFormData(prev => ({ ...prev, address: stepData }));
    } else if (currentStep === 6) {
      setFormData(prev => ({ ...prev, feeDocs: stepData }));
    }

    // Move to previous step
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = (stepData) => {
    // Update form data with current step data
    if (currentStep === 1) {
      setFormData(prev => ({ ...prev, student: stepData }));
    } else if (currentStep === 2) {
      setFormData(prev => ({ ...prev, academic: stepData }));
    } else if (currentStep === 3) {
      setFormData(prev => ({ ...prev, guardian: stepData }));
    } else if (currentStep === 4) {
      setFormData(prev => ({ ...prev, address: stepData }));
    } else if (currentStep === 5) {
      setFormData(prev => ({ ...prev, feeDocs: stepData }));
    }

    console.log('Draft saved:', formData);
    alert('Draft saved successfully!');
  };

  const handleSubmit = () => {
    console.log('Final form data:', formData);
    alert('Application submitted successfully!');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StudentInformation
            initialValues={formData.student}
            onNext={handleNext}
            onSaveDraft={handleSaveDraft}
          />
        );
      case 2:
        return (
          <AcademicInformation
            initialValues={formData.academic}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSaveDraft={handleSaveDraft}
          />
        );
      case 3:
        return (
          <GuardianInformation
            initialValues={formData.guardian}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSaveDraft={handleSaveDraft}
          />
        );
      case 4:
        return (
          <AddressInformation
            initialValues={formData.address}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSaveDraft={handleSaveDraft}
          />
        );
      case 5:
        return (
          <FeeAndDocuments
            initialValues={formData.feeDocs}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSaveDraft={handleSaveDraft}
          />
        );
      case 6:
        return (
          <ReviewAndSubmit
            formData={formData}
            onPrevious={handlePrevious}
            onSaveDraft={handleSaveDraft}
            onSubmit={handleSubmit}
          />
        );
      default:
        return <StudentInformation onNext={handleNext} onSaveDraft={handleSaveDraft} />;
    }
  };

  return (
    <div className="app">
      {renderCurrentStep()}
    </div>
  );
};

export default App;
