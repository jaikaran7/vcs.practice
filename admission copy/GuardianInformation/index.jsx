import React, { useState } from 'react';
import './style.scss';
import { Stepper, FormField, Select, FormRow, Button } from '../components';

const GuardianInformation = ({ 
  initialValues = {}, 
  onNext, 
  onPrevious, 
  onSaveDraft 
}) => {
  const [formData, setFormData] = useState({
    fathersName: initialValues.fathersName || '',
    fathersPhone: initialValues.fathersPhone || '',
    fathersOccupation: initialValues.fathersOccupation || '',
    fathersEmail: initialValues.fathersEmail || '',
    mothersName: initialValues.mothersName || '',
    mothersPhone: initialValues.mothersPhone || '',
    mothersOccupation: initialValues.mothersOccupation || '',
    mothersEmail: initialValues.mothersEmail || '',
    parentsAnnualIncome: initialValues.parentsAnnualIncome || '',
    emergencyName: initialValues.emergencyName || '',
    emergencyPhone: initialValues.emergencyPhone || '',
    emergencyRelationship: initialValues.emergencyRelationship || ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
  };

  const validateGuardian = (values) => {
    const errors = {};

    if (!values.fathersName?.trim()) {
      errors.fathersName = 'Father\'s name is required';
    }

    if (!values.fathersPhone?.trim()) {
      errors.fathersPhone = 'Father\'s phone is required';
    } else if (!validatePhone(values.fathersPhone)) {
      errors.fathersPhone = 'Please enter a valid phone number (7-15 digits)';
    }

    if (!values.mothersName?.trim()) {
      errors.mothersName = 'Mother\'s name is required';
    }

    if (values.fathersEmail && !validateEmail(values.fathersEmail)) {
      errors.fathersEmail = 'Please enter a valid email address';
    }

    if (values.mothersPhone && !validatePhone(values.mothersPhone)) {
      errors.mothersPhone = 'Please enter a valid phone number (7-15 digits)';
    }

    if (values.mothersEmail && !validateEmail(values.mothersEmail)) {
      errors.mothersEmail = 'Please enter a valid email address';
    }

    if (!values.parentsAnnualIncome?.trim()) {
      errors.parentsAnnualIncome = 'Parents annual income is required';
    }

    if (values.emergencyPhone && !validatePhone(values.emergencyPhone)) {
      errors.emergencyPhone = 'Please enter a valid phone number (7-15 digits)';
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleNext = () => {
    const validationErrors = validateGuardian(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
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
    if (onSaveDraft) {
      onSaveDraft(formData);
    }
  };

  return (
    <div className="guardian">
      <div className="guardian__header">
        <h1>Student Admission Application</h1>
      </div>

      <Stepper currentStep={3} />

      <div className="guardian__card">
        <div className="guardian__card-header">
          <div className="guardian__card-title">
            <span className="guardian__card-icon">👥</span>
            <h2>Guardian Information</h2>
          </div>
        </div>
        
        <div className="guardian__content">
          {/* Father's Information Section */}
          <div className="guardian__section">
            <h3 className="guardian__section-title">Father's Information</h3>
            <div className="guardian__form-grid">
              <FormRow columns={2}>
                <FormField
                  id="fathersName"
                  name="fathersName"
                  label="Father's Name"
                  value={formData.fathersName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter father's name"
                  required
                  error={errors.fathersName}
                  touched={touched.fathersName}
                />
                <FormField
                  id="fathersOccupation"
                  name="fathersOccupation"
                  label="Father's Occupation"
                  value={formData.fathersOccupation}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter occupation"
                />
              </FormRow>
              <FormRow columns={2}>
                <FormField
                  id="fathersPhone"
                  name="fathersPhone"
                  type="tel"
                  label="Father's Phone"
                  value={formData.fathersPhone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter phone number"
                  required
                  error={errors.fathersPhone}
                  touched={touched.fathersPhone}
                />
                <FormField
                  id="fathersEmail"
                  name="fathersEmail"
                  type="email"
                  label="Father's Email"
                  value={formData.fathersEmail}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter email address"
                  error={errors.fathersEmail}
                  touched={touched.fathersEmail}
                />
              </FormRow>
            </div>
          </div>

          {/* Mother's Information Section */}
          <div className="guardian__section">
            <h3 className="guardian__section-title">Mother's Information</h3>
            <div className="guardian__form-grid">
              <FormRow columns={2}>
                <FormField
                  id="mothersName"
                  name="mothersName"
                  label="Mother's Name"
                  value={formData.mothersName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter mother's name"
                  required
                  error={errors.mothersName}
                  touched={touched.mothersName}
                />
                <FormField
                  id="mothersOccupation"
                  name="mothersOccupation"
                  label="Mother's Occupation"
                  value={formData.mothersOccupation}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter occupation"
                />
              </FormRow>
              <FormRow columns={2}>
                <FormField
                  id="mothersPhone"
                  name="mothersPhone"
                  type="tel"
                  label="Mother's Phone"
                  value={formData.mothersPhone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter phone number"
                  error={errors.mothersPhone}
                  touched={touched.mothersPhone}
                />
                <FormField
                  id="mothersEmail"
                  name="mothersEmail"
                  type="email"
                  label="Mother's Email"
                  value={formData.mothersEmail}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter email address"
                  error={errors.mothersEmail}
                  touched={touched.mothersEmail}
                />
              </FormRow>
            </div>
          </div>

          {/* Parents Annual Income Section */}
          <div className="guardian__section">
            <h3 className="guardian__section-title">Parents Annual Income</h3>
            <div className="guardian__form-grid">
              <FormRow columns={1}>
                <Select
                  id="parentsAnnualIncome"
                  name="parentsAnnualIncome"
                  label="Parents Annual Income (in lakhs)"
                  value={formData.parentsAnnualIncome}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  options={[
                    { value: '', label: 'Select income range' },
                    { value: '<1', label: '< 1 lakh' },
                    { value: '1-2', label: '1-2 lakhs' },
                    { value: '2-3', label: '2-3 lakhs' },
                    { value: '3-5', label: '3-5 lakhs' },
                    { value: '5-7', label: '5-7 lakhs' },
                    { value: '7-9', label: '7-9 lakhs' },
                    { value: '9>', label: '> 9 lakhs' }
                  ]}
                  error={errors.parentsAnnualIncome}
                  touched={touched.parentsAnnualIncome}
                />
              </FormRow>
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="guardian__section">
            <h3 className="guardian__section-title">Emergency Contact</h3>
            <div className="guardian__form-grid">
              <FormRow columns={2}>
                <FormField
                  id="emergencyName"
                  name="emergencyName"
                  label="Emergency Contact Name"
                  value={formData.emergencyName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter emergency contact name"
                />
                <FormField
                  id="emergencyPhone"
                  name="emergencyPhone"
                  type="tel"
                  label="Emergency Contact Phone"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter phone number"
                  error={errors.emergencyPhone}
                  touched={touched.emergencyPhone}
                />
              </FormRow>
              <FormRow columns={2}>
                <FormField
                  id="emergencyRelationship"
                  name="emergencyRelationship"
                  label="Relationship to Student"
                  value={formData.emergencyRelationship}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter relationship"
                />
                <div></div> {/* Empty div for grid alignment */}
              </FormRow>
            </div>
          </div>
        </div>

        <div className="guardian__actions">
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

export default GuardianInformation;
