import React, { useState } from 'react';
import './style.scss';
import { Stepper, FormField, Select, FormRow, Button } from '../components';

const StudentInformation = ({ initialValues = {}, onNext, onSaveDraft }) => {
  const [formData, setFormData] = useState({
    fullName: initialValues.fullName || '',
    gender: initialValues.gender || '',
    dateOfBirth: initialValues.dateOfBirth || '',
    bloodGroup: initialValues.bloodGroup || '',
    religion: initialValues.religion || '',
    nationality: initialValues.nationality || 'India',
    previousSchool: initialValues.previousSchool || '',
    academicYear: initialValues.academicYear || '2024-25'
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

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
    
    // Validate the field
    validateField(name, formData[name]);
  };

  const validateField = (fieldName, value) => {
    let error = '';
    
    switch (fieldName) {
      case 'fullName':
        if (!value.trim()) {
          error = 'Full name is required';
        } else if (value.trim().length < 2) {
          error = 'Full name must be at least 2 characters';
        }
        break;
      case 'gender':
        if (!value) {
          error = 'Gender is required';
        }
        break;
      case 'dateOfBirth':
        if (!value) {
          error = 'Date of birth is required';
        } else {
          const today = new Date();
          const birthDate = new Date(value);
          const age = today.getFullYear() - birthDate.getFullYear();
          if (age < 3 || age > 18) {
            error = 'Age must be between 3 and 18 years';
          }
        }
        break;
      case 'religion':
        if (value && value.trim().length < 2) {
          error = 'Religion must be at least 2 characters';
        }
        break;
      case 'previousSchool':
        if (value && value.trim().length < 2) {
          error = 'Previous school name must be at least 2 characters';
        }
        break;
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
    
    return error === '';
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    // Required fields validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
      isValid = false;
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
      isValid = false;
    }
    
    // Additional validations
    if (formData.fullName.trim() && formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
      isValid = false;
    }
    
    if (formData.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 3 || age > 18) {
        newErrors.dateOfBirth = 'Age must be between 3 and 18 years';
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      console.log('Form Data:', formData);
      if (onNext) {
        onNext(formData);
      }
    } else {
      // Mark all fields as touched to show errors
      const allTouched = {};
      Object.keys(formData).forEach(key => {
        allTouched[key] = true;
      });
      setTouched(allTouched);
    }
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData);
    if (onSaveDraft) {
      onSaveDraft(formData);
    }
  };

  return (
    <div className="student-information">
      <div className="page-header">
        <h1>Student Admission Application</h1>
      </div>

      <Stepper currentStep={1} />

      <div className="form-card">
        <div className="card-header">
          <h2>Student Information</h2>
        </div>
        
        <div className="form-content">
          <FormRow columns={2}>
            <FormField
              id="fullName"
              name="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Enter full name"
              required
              error={errors.fullName}
              touched={touched.fullName}
            />

            <Select
              id="gender"
              name="gender"
              label="Gender"
              value={formData.gender}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              error={errors.gender}
              touched={touched.gender}
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'Other', label: 'Other' }
              ]}
            />

            <FormField
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              error={errors.dateOfBirth}
              touched={touched.dateOfBirth}
            />

            <Select
              id="bloodGroup"
              name="bloodGroup"
              label="Blood Group"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              options={[
                { value: 'A+', label: 'A+' },
                { value: 'A-', label: 'A-' },
                { value: 'B+', label: 'B+' },
                { value: 'B-', label: 'B-' },
                { value: 'O+', label: 'O+' },
                { value: 'O-', label: 'O-' },
                { value: 'AB+', label: 'AB+' },
                { value: 'AB-', label: 'AB-' }
              ]}
            />

            <FormField
              id="religion"
              name="religion"
              label="Religion"
              value={formData.religion}
              onChange={handleInputChange}
              placeholder="Enter religion"
            />

            <Select
              id="nationality"
              name="nationality"
              label="Nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              options={[
                { value: 'India', label: 'India' },
                { value: 'Other', label: 'Other' }
              ]}
            />

            <FormField
              id="previousSchool"
              name="previousSchool"
              label="Previous School"
              value={formData.previousSchool}
              onChange={handleInputChange}
              placeholder="Enter previous school name"
            />

            <Select
              id="academicYear"
              name="academicYear"
              label="Academic Year"
              value={formData.academicYear}
              onChange={handleInputChange}
              options={[
                { value: '2024-25', label: '2024-25' },
                { value: '2025-26', label: '2025-26' }
              ]}
            />
          </FormRow>
        </div>

        <div className="form-actions">
          <Button variant="secondary" disabled>
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

export default StudentInformation;
