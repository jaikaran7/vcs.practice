import React, { useState } from 'react';
import './style.scss';
import { Stepper, FormField, Select, FormRow, Button } from '../components';

const AcademicInformation = ({ initialValues = {}, onNext, onPrevious, onSaveDraft }) => {
  const [formData, setFormData] = useState({
    classAppliedFor: initialValues.classAppliedFor || '',
    sectionPreference: initialValues.sectionPreference || '',
    mediumOfInstruction: initialValues.mediumOfInstruction || '',
    previousClass: initialValues.previousClass || '',
    previousSchoolGrade: initialValues.previousSchoolGrade || '',
    transferCertificateNumber: initialValues.transferCertificateNumber || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    console.log('Academic Information Form Data:', formData);
    if (onNext) {
      onNext(formData);
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious(formData);
    }
  };

  const handleSaveDraft = () => {
    console.log('Saving academic draft:', formData);
    if (onSaveDraft) {
      onSaveDraft(formData);
    }
  };

  return (
    <div className="academic-information">
      <div className="page-header">
        <h1>Student Admission Application</h1>
      </div>

      <Stepper currentStep={2} />

      <div className="form-card">
        <div className="card-header">
          <div className="card-title">
            <span className="card-icon">🎓</span>
            <h2>Academic Information</h2>
          </div>
        </div>
        
        <div className="form-content">
          <FormRow columns={2}>
            <Select
              id="classAppliedFor"
              name="classAppliedFor"
              label="Class Applied For"
              value={formData.classAppliedFor}
              onChange={handleInputChange}
              required
              options={[
                { value: 'Nursery', label: 'Nursery' },
                { value: 'LKG', label: 'LKG' },
                { value: 'UKG', label: 'UKG' },
                { value: '1st', label: '1st' },
                { value: '2nd', label: '2nd' },
                { value: '3rd', label: '3rd' },
                { value: '4th', label: '4th' },
                { value: '5th', label: '5th' },
                { value: '6th', label: '6th' },
                { value: '7th', label: '7th' },
                { value: '8th', label: '8th' },
                { value: '9th', label: '9th' },
                { value: '10th', label: '10th' }
              ]}
            />

            <Select
              id="sectionPreference"
              name="sectionPreference"
              label="Section Preference"
              value={formData.sectionPreference}
              onChange={handleInputChange}
              options={[
                { value: 'Section A', label: 'Section A' },
                { value: 'Section B', label: 'Section B' },
                { value: 'Section C', label: 'Section C' }
              ]}
            />

            <Select
              id="mediumOfInstruction"
              name="mediumOfInstruction"
              label="Medium of Instruction"
              value={formData.mediumOfInstruction}
              onChange={handleInputChange}
              options={[
                { value: 'English', label: 'English' },
                { value: 'Hindi', label: 'Hindi' },
                { value: 'Telugu', label: 'Telugu' },
                { value: 'Tamil', label: 'Tamil' },
                { value: 'Kannada', label: 'Kannada' }
              ]}
            />

            <FormField
              id="previousClass"
              name="previousClass"
              label="Previous Class/Grade"
              value={formData.previousClass}
              onChange={handleInputChange}
              placeholder="Enter previous class/grade"
            />

            <FormField
              id="previousSchoolGrade"
              name="previousSchoolGrade"
              label="Previous School Final Grade/Percentage"
              value={formData.previousSchoolGrade}
              onChange={handleInputChange}
              placeholder="Enter grade or percentage"
            />

            <FormField
              id="transferCertificateNumber"
              name="transferCertificateNumber"
              label="Transfer Certificate Number"
              value={formData.transferCertificateNumber}
              onChange={handleInputChange}
              placeholder="Enter transfer certificate number"
            />
          </FormRow>
        </div>

        <div className="form-actions">
          <Button variant="outline" onClick={handlePrevious}>
            ← Previous
          </Button>
          <Button variant="outline" onClick={handleSaveDraft}>
            Save as Draft
          </Button>
          <Button variant="primary" onClick={handleNext}>
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AcademicInformation;
