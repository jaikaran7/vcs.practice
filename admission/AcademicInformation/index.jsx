import React, { useState } from 'react';
import './style.scss';

const AcademicInformation = () => {
  const [formData, setFormData] = useState({
    classAppliedFor: 'LKG',
    sectionPreference: 'Section B',
    mediumOfInstruction: 'Hindi',
    previousClass: '',
    previousSchoolGrade: '',
    transferCertificateNumber: ''
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
  };

  return (
    <div className="academic-information">
      <div className="page-header">
        <h1>Student Admission Application</h1>
      </div>

      <div className="progress-bar">
        <div className="progress-steps">
          <div className="step completed">
            <div className="step-icon">👤</div>
            <span>Student Information</span>
          </div>
          <div className="step active">
            <div className="step-icon">🎓</div>
            <span>Academic Information</span>
          </div>
          <div className="step">
            <div className="step-icon">👥</div>
            <span>Guardian Information</span>
          </div>
          <div className="step">
            <div className="step-icon">📍</div>
            <span>Address Information</span>
          </div>
          <div className="step">
            <div className="step-icon">📄</div>
            <span>Fee & Documents</span>
          </div>
          <div className="step">
            <div className="step-icon">✅</div>
            <span>Review & Submit</span>
          </div>
        </div>
      </div>

      <div className="form-card">
        <div className="card-header">
          <div className="card-title">
            <span className="card-icon">🎓</span>
            <h2>Academic Information</h2>
          </div>
        </div>
        
        <div className="form-content">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="classAppliedFor">Class Applied For *</label>
              <select
                id="classAppliedFor"
                name="classAppliedFor"
                value={formData.classAppliedFor}
                onChange={handleInputChange}
                required
              >
                <option value="Nursery">Nursery</option>
                <option value="LKG">LKG</option>
                <option value="UKG">UKG</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
                <option value="5th">5th</option>
                <option value="6th">6th</option>
                <option value="7th">7th</option>
                <option value="8th">8th</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="sectionPreference">Section Preference</label>
              <select
                id="sectionPreference"
                name="sectionPreference"
                value={formData.sectionPreference}
                onChange={handleInputChange}
              >
                <option value="Section A">Section A</option>
                <option value="Section B">Section B</option>
                <option value="Section C">Section C</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="mediumOfInstruction">Medium of Instruction</label>
              <select
                id="mediumOfInstruction"
                name="mediumOfInstruction"
                value={formData.mediumOfInstruction}
                onChange={handleInputChange}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Telugu">Telugu</option>
                <option value="Tamil">Tamil</option>
                <option value="Kannada">Kannada</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="previousClass">Previous Class/Grade</label>
              <input
                type="text"
                id="previousClass"
                name="previousClass"
                value={formData.previousClass}
                onChange={handleInputChange}
                placeholder="Enter previous class/grade"
              />
            </div>

            <div className="form-group">
              <label htmlFor="previousSchoolGrade">Previous School Final Grade/Percentage</label>
              <input
                type="text"
                id="previousSchoolGrade"
                name="previousSchoolGrade"
                value={formData.previousSchoolGrade}
                onChange={handleInputChange}
                placeholder="Enter grade or percentage"
              />
            </div>

            <div className="form-group">
              <label htmlFor="transferCertificateNumber">Transfer Certificate Number</label>
              <input
                type="text"
                id="transferCertificateNumber"
                name="transferCertificateNumber"
                value={formData.transferCertificateNumber}
                onChange={handleInputChange}
                placeholder="Enter transfer certificate number"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline">
            ← Previous
          </button>
          <button type="button" className="btn btn-outline">
            Save as Draft
          </button>
          <button type="button" className="btn btn-primary" onClick={handleNext}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcademicInformation;
