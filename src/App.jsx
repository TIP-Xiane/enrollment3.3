import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './App.css';

// Define validation schema using Yup (ES6 arrow functions and object literals)
const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  dob: yup.date().required('Date of birth is required').max(new Date(), 'Date of birth cannot be in the future'),
  gender: yup.string().required('Gender is required'),
  nationality: yup.string().required('Nationality is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobile: yup.string().matches(/^\d{10,11}$/, 'Mobile number must be 10-11 digits').required('Mobile number is required'),
  street: yup.string().required('Street is required'),
  barangay: yup.string().required('Barangay is required'),
  city: yup.string().required('City is required'),
  province: yup.string().required('Province is required'),
  zipCode: yup.string().matches(/^\d{4}$/, 'Zip code must be 4 digits').required('Zip code is required'),
  gradeSchoolName: yup.string().required('Grade school name is required'),
  gradeSchoolYear: yup.number().min(1900).max(2026).required('Grade school year is required'),
  gradeSchoolAddress: yup.string().required('Grade school address is required'),
  juniorHighName: yup.string().required('Junior high school name is required'),
  juniorHighYear: yup.number().min(1900).max(2026).required('Junior high school year is required'),
  juniorHighAddress: yup.string().required('Junior high school address is required'),
  seniorHighName: yup.string().required('Senior high school name is required'),
  seniorHighYear: yup.number().min(1900).max(2026).required('Senior high school year is required'),
  seniorHighAverage: yup.number().min(0).max(100).required('Senior high school average is required'),
  seniorHighAddress: yup.string().required('Senior high school address is required'),
  academicLevel: yup.string().required('Academic level is required'),
  semester: yup.string().required('Semester is required'),
  campus: yup.string().required('Campus is required'),
  collegeDepartment: yup.string().required('College department is required'),
  degreeProgram: yup.string().required('Degree program is required'),
}).required();

function App() {
  // Use React Hook Form with Yup resolver (ES6 destructuring)
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Watch for changes in specific fields (ES6 arrow function)
  const academicLevel = watch('academicLevel');
  const collegeDepartment = watch('collegeDepartment');

  // Submit handler (ES6 arrow function)
  const onSubmit = (data) => {
    console.log(data);
    alert('Registration submitted successfully!');
    // In a real app, send data to an API
  };

  // Program data (ES6 object literals)
  const undergraduatePrograms = {
    'College of Engineering and Architecture': [
      'BS Architecture',
      'BS Chemical Engineering',
      'BS Civil Engineering',
      'BS Computer Engineering',
      'BS Electrical Engineering',
      'BS Electronics Engineering',
      'BS Industrial Engineering',
      'BS Mechanical Engineering'
    ],
    'College of Computer Studies': [
      'BS Computer Science',
      'BS Data Science and Analytics',
      'BS Entertainment and Multimedia Computing',
      'BS Information Technology'
    ],
    'College of Business Education': [
      'BS Accountancy',
      'BS Accounting Information System',
      'BS Business Administration',
      'Financial Management',
      'Human Resource Management',
      'Logistics and Supply Chain Management',
      'Marketing Management'
    ],
    'College of Arts': [
      'Bachelor of Arts in English Language',
      'Bachelor of Arts in Political Science'
    ]
  };

  const graduatePrograms = {
    'Doctorate Degrees': [
      'Doctor in Information Technology',
      'Doctor of Engineering with Specialization in Computer Engineering',
      'Doctor of Philosophy in Computer Science'
    ],
    'Master\'s Degrees': [
      'Master in Information Systems',
      'Master in Information Technology',
      'Master in Logistics and Supply Chain Management',
      'Master of Engineering with Specialization in Civil Engineering',
      'Master of Engineering with Specialization in Computer Engineering',
      'Master of Engineering with Specialization in Electrical Engineering',
      'Master of Engineering with Specialization in Electronics Engineering',
      'Master of Engineering with Specialization in Industrial Engineering',
      'Master of Engineering with Specialization in Mechanical Engineering',
      'Master of Science in Computer Science'
    ]
  };

  // Helper functions (ES6 arrow functions)
  const getDegreePrograms = () => {
    if (academicLevel === 'Undergraduate') {
      return undergraduatePrograms[collegeDepartment] || [];
    } else if (academicLevel === 'Graduate') {
      return graduatePrograms[collegeDepartment] || [];
    }
    return [];
  };

  const getDepartments = () => {
    if (academicLevel === 'Undergraduate') {
      return Object.keys(undergraduatePrograms);
    } else if (academicLevel === 'Graduate') {
      return Object.keys(graduatePrograms);
    }
    return [];
  };

  return (
    <div className="container">
      <h1>Student Enrollment System</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend><h2>Personal Information</h2></legend>
          <div className="grid-row">
            <div className="grid-item">
              <label htmlFor="firstName">First Name</label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => <input {...field} type="text" id="firstName" maxLength="50" />}
              />
              {errors.firstName && <p className="error">{errors.firstName.message}</p>}
            </div>
            <div className="grid-item">
              <label htmlFor="middleName">Middle Name</label>
              <Controller
                name="middleName"
                control={control}
                render={({ field }) => <input {...field} type="text" id="middleName" maxLength="50" />}
              />
            </div>
            <div className="grid-item">
              <label htmlFor="lastName">Last Name</label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => <input {...field} type="text" id="lastName" maxLength="50" />}
              />
              {errors.lastName && <p className="error">{errors.lastName.message}</p>}
            </div>
            <div className="grid-item">
              <label htmlFor="suffix">Suffix</label>
              <Controller
                name="suffix"
                control={control}
                render={({ field }) => <input {...field} type="text" id="suffix" maxLength="10" />}
              />
            </div>
          </div>
          <div className="grid-row">
            <div className="grid-item">
              <label htmlFor="dob">Date of Birth</label>
              <Controller
                name="dob"
                control={control}
                render={({ field }) => <input {...field} type="date" id="dob" onKeyDown={(e) => e.preventDefault()} />}
              />
              {errors.dob && <p className="error">{errors.dob.message}</p>}
            </div>
            <div className="grid-item">
              <label htmlFor="gender">Gender</label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <select {...field} id="gender">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                  </select>
                )}
              />
              {errors.gender && <p className="error">{errors.gender.message}</p>}
            </div>
            <div className="grid-item">
              <label htmlFor="nationality">Nationality</label>
              <Controller
                name="nationality"
                control={control}
                render={({ field }) => (
                  <select {...field} id="nationality">
                    <option value="">Select Nationality</option>
                    <option value="Filipino">Filipino</option>
                    <option value="American">American</option>
                    <option value="Other">Other</option>
                    {/* Add more options as needed */}
                  </select>
                )}
              />
              {errors.nationality && <p className="error">{errors.nationality.message}</p>}
            </div>
            <div className="grid-item">
              <label htmlFor="religion">Religion</label>
              <Controller
                name="religion"
                control={control}
                render={({ field }) => <input {...field} type="text" id="religion" maxLength="50" />}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend><h2>Contact Details</h2></legend>
          <div className="grid-row">
            <div className="grid-item">
              <label htmlFor="email">Email Address</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <input {...field} type="email" id="email" />}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div className="grid-item">
              <label htmlFor="mobile">Mobile Number</label>
              <Controller
                name="mobile"
                control={control}
                render={({ field }) => (
                  <input 
                    {...field} 
                    type="tel" 
                    id="mobile" 
                    inputMode="numeric"
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) e.preventDefault();
                    }}
                    maxLength="11"
                  />
                )}
              />
              {errors.mobile && <p className="error">{errors.mobile.message}</p>}
            </div>
            <div className="grid-item">
              <label htmlFor="landline">Landline</label>
              <Controller
                name="landline"
                control={control}
                render={({ field }) => (
                  <input 
                    {...field} 
                    type="tel" 
                    id="landline"
                    inputMode="numeric"
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) e.preventDefault();
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className="grid-row">
            <div className="grid-item">
              <label htmlFor="street">Street</label>
              <Controller
                name="street"
                control={control}
                render={({ field }) => <input {...field} type="text" id="street" maxLength="100" />}
              />
              {errors.street && <p className="error">{errors.street.message}</p>}
            </div>
            <div className="grid-item">
              <label htmlFor="barangay">Barangay</label>
              <Controller
                name="barangay"
                control={control}
                render={({ field }) => <input {...field} type="text" id="barangay" maxLength="50" />}
              />
              {errors.barangay && <p className="error">{errors.barangay.message}</p>}
            </div>
            <div className="grid-item">
              <label htmlFor="city">City</label>
              <Controller
                name="city"
                control={control}
                render={({ field }) => <input {...field} type="text" id="city" maxLength="50" />}
              />
              {errors.city && <p className="error">{errors.city.message}</p>}
            </div>
            <div className="grid-item">
              <label htmlFor="province">Province</label>
              <Controller
                name="province"
                control={control}
                render={({ field }) => <input {...field} type="text" id="province" maxLength="50" />}
              />
              {errors.province && <p className="error">{errors.province.message}</p>}
            </div>
            <div className="grid-item">
              <label htmlFor="zipCode">Zip Code</label>
              <Controller
                name="zipCode"
                control={control}
                render={({ field }) => (
                  <input 
                    {...field} 
                    type="text" 
                    id="zipCode"
                    maxLength="4"
                    inputMode="numeric"
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) e.preventDefault();
                    }}
                  />
                )}
              />
              {errors.zipCode && <p className="error">{errors.zipCode.message}</p>}
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend><h2>Educational Background</h2></legend>
          <h3>Grade School</h3>
          <div className="grid-row">
            <div className="grid-item">
              <label htmlFor="gradeSchoolName">School Name</label>
              <Controller
                name="gradeSchoolName"
                control={control}
                render={({ field }) => <input {...field} type="text" id="gradeSchoolName" maxLength="100" />}
              />
              {errors.gradeSchoolName && <p className="error">{errors.gradeSchoolName.message}</p>}
            </div>
            <div className="grid-item">
              <label htmlFor="gradeSchoolYear">Year Graduated</label>
              <Controller
                name="gradeSchoolYear"
                control={control}
                render={({ field }) => <input {...field} type="number" id="gradeSchoolYear" min="1900" max="2026" />}
              />
              {errors.gradeSchoolYear && <p className="error">{errors.gradeSchoolYear.message}</p>}
            </div>
            <div className="grid-item">
              <label htmlFor="gradeSchoolAddress">Address</label>
              <Controller
                name="gradeSchoolAddress"
                control={control}
                render={({ field }) => <input {...field} type="text" id="gradeSchoolAddress" maxLength="100" />}
              />
              {errors.gradeSchoolAddress && <p className="error">{errors.gradeSchoolAddress.message}</p>}
            </div>
          </div>
          <h3>Junior High School</h3>
          <div className="grid-row">
            <div className="grid-item">
              <label htmlFor="juniorHighName">School Name</label>
              <Controller
                name="juniorHighName"
                control={control}
                render={({ field }) => <input {...field} type="text" id="juniorHighName" maxLength="100" />}
              />
              {errors.juniorHighName && <p className="error">{errors.juniorHighName.message}</p>}
            </div>
            <div className="grid-item">
              <label htmlFor="juniorHighYear">Year Graduated</label>
              <Controller
                name="juniorHighYear"
                control={control}
                render={({ field }) => <input {...field} type="number" id="juniorHighYear" min="1900" max="2026" />}
              />
              {errors.juniorHighYear && <p className="error">{errors.juniorHighYear.message}</p>}
            </div>
            <div className="grid-item">
              <label htmlFor="juniorHighAddress">Address</label>
              <Controller
                name="juniorHighAddress"
                control={control}
                render={({ field }) => <input {...field} type="text" id="juniorHighAddress" maxLength="100" />}
              />
              {errors.juniorHighAddress && <p className="error">{errors.juniorHighAddress.message}</p>}
            </div>
          </div>
          <h3>Senior High School</h3>
          <div className="grid-row">
            <div className="grid-item">
              <label htmlFor="seniorHighName">School Name</label>
              <Controller
                name="seniorHighName"
                control={control}
                render={({ field }) => <input {...field} type="text" id="seniorHighName" maxLength="100" />}
              />
              {errors.seniorHighName && <p className="error">{errors.seniorHighName.message}</p>}
            </div>
            <div className="grid-item">
              <label htmlFor="seniorHighYear">Year Graduated</label>
              <Controller
                name="seniorHighYear"
                control={control}
                render={({ field }) => <input {...field} type="number" id="seniorHighYear" min="1900" max="2026" />}
              />
              {errors.seniorHighYear && <p className="error">{errors.seniorHighYear.message}</p>}
            </div>
            <div className="grid-item">
              <label htmlFor="seniorHighAverage">Grade Average</label>
              <Controller
                name="seniorHighAverage"
                control={control}
                render={({ field }) => <input {...field} type="number" id="seniorHighAverage" step="0.01" />}
              />
              {errors.seniorHighAverage && <p className="error">{errors.seniorHighAverage.message}</p>}
            </div>
            <div className="grid-item">
              <label htmlFor="seniorHighAddress">Address</label>
              <Controller
                name="seniorHighAddress"
                control={control}
                render={({ field }) => <input {...field} type="text" id="seniorHighAddress" maxLength="100" />}
              />
              {errors.seniorHighAddress && <p className="error">{errors.seniorHighAddress.message}</p>}
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend><h2>Program Selection</h2></legend>
          <div className="grid-row">
            <div className="grid-item">
              <label>Academic Level</label>
              <div>
                <Controller
                  name="academicLevel"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input {...field} type="radio" id="undergraduate" value="Undergraduate" />
                      <label htmlFor="undergraduate">Undergraduate</label>
                    </>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="academicLevel"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input {...field} type="radio" id="graduate" value="Graduate" />
                      <label htmlFor="graduate">Graduate</label>
                    </>
                  )}
                />
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend><h2>College Department</h2></legend>
          <div className="grid-row">
            <div className="grid-item">
              <label>College Department</label>
              <Controller
                name="collegeDepartment"
                control={control}
                render={({ field }) => (
                  <select {...field} >
                    <option value="">Select Department</option>
                    {getDepartments().map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                )}
              />
              {errors.collegeDepartment && <p className="error">{errors.collegeDepartment.message}</p>}
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend><h2>Degree Program</h2></legend>
          <div className="grid-row">
            <div className="grid-item">
              <label>Degree Program</label>
              {collegeDepartment ? (
                <Controller
                  name="degreeProgram"
                  control={control}
                  render={({ field }) => (
                    <select {...field}>
                      <option value="">Select Program</option>
                      {getDegreePrograms().map((program) => (
                        <option key={program} value={program}>{program}</option>
                      ))}
                    </select>
                  )}
                />
              ) : (
                <p style={{ color: '#667eea', fontStyle: 'italic', padding: '14px', background: '#f1f3f7', borderRadius: '8px', fontWeight: '500', textAlign: 'center' }}>
                  Please select a College Department first
                </p>
              )}
              {errors.degreeProgram && <p className="error">{errors.degreeProgram.message}</p>}
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend><h2>Enrollment Information</h2></legend>
          <div className="grid-row">
            <div className="grid-item">
              <label>Semester</label>
              <div className="radio-group">
                <Controller
                  name="semester"
                  control={control}
                  render={({ field }) => (
                    <>
                      <label className="radio-item">
                        <input 
                          {...field} 
                          type="radio" 
                          value="First Semester"
                          checked={field.value === "First Semester"}
                        />
                        First Semester
                      </label>
                      <label className="radio-item">
                        <input 
                          {...field} 
                          type="radio" 
                          value="Second Semester"
                          checked={field.value === "Second Semester"}
                        />
                        Second Semester
                      </label>
                      <label className="radio-item">
                        <input 
                          {...field} 
                          type="radio" 
                          value="Summer"
                          checked={field.value === "Summer"}
                        />
                        Summer
                      </label>
                    </>
                  )}
                />
              </div>
              {errors.semester && <p className="error">{errors.semester.message}</p>}
            </div>
            <div className="grid-item">
              <label>Campus</label>
              <div className="radio-group">
                <Controller
                  name="campus"
                  control={control}
                  render={({ field }) => (
                    <>
                      <label className="radio-item">
                        <input 
                          {...field} 
                          type="radio" 
                          value="Manila"
                          checked={field.value === "Manila"}
                        />
                        Manila
                      </label>
                      <label className="radio-item">
                        <input 
                          {...field} 
                          type="radio" 
                          value="Quezon City"
                          checked={field.value === "Quezon City"}
                        />
                        Quezon City
                      </label>
                    </>
                  )}
                />
              </div>
              {errors.campus && <p className="error">{errors.campus.message}</p>}
            </div>
          </div>
        </fieldset>

        <div className="button-row">
          <button type="submit">Submit Registration</button>
        </div>
      </form>
    </div>
  );
}

export default App;