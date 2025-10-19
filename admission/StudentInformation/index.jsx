import React, { useState } from 'react';
import './style.scss';

const StudentInformation = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    bloodGroup: '',
    religion: '',
    nationality: 'India',
    previousSchool: '',
    academicYear: '2024-25'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    console.log('Form Data:', formData);
  };

  return (
    <div className="student-information">
      <div className="page-header">
        <h1>Student Admission Application</h1>
      </div>

      <div className="progress-bar">
        <div className="progress-steps">
          <div className="step active">
            <div className="step-icon">👤</div>
            <span>Student Information</span>
          </div>
          <div className="step">
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
          <h2>Student Information</h2>
        </div>
        
        <div className="form-content">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="Enter full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender *</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth *</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bloodGroup">Blood Group</label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
              >
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="religion">Religion</label>
              <input
                type="text"
                id="religion"
                name="religion"
                value={formData.religion}
                onChange={handleInputChange}
                placeholder="Enter religion"
              />
            </div>

            <div className="form-group">
              <label htmlFor="nationality">Nationality</label>
              <select
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
              >
                <option value="India">India</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="previousSchool">Previous School</label>
              <input
                type="text"
                id="previousSchool"
                name="previousSchool"
                value={formData.previousSchool}
                onChange={handleInputChange}
                placeholder="Enter previous school name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="academicYear">Academic Year</label>
              <select
                id="academicYear"
                name="academicYear"
                value={formData.academicYear}
                onChange={handleInputChange}
              >
                <option value="2024-25">2024-25</option>
                <option value="2025-26">2025-26</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary btn-disabled" disabled>
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

export default StudentInformation;
