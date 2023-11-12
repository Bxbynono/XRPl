import React, { Fragment, useState } from 'react';
import axios from 'axios';

const AdminUpload = () => {
  const [name, setName] = useState('');
  const [cid, setCid] = useState('');
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [course, setCourse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser(name, cid, event, date, course);

      setName('');
      setCid('');
      setEvent('');
      setDate('');
      setCourse('');
    } catch (error) {
      console.error('Fail to create student:', error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCidChange = (event) => {
    setCid(event.target.value);
  };

  const handleEventChange = (event) => {
    setEvent(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const createUser = async (name, cid, event, date, course) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:4002/studentVault/v1/students',
        data:{name,
        cid,
        event,
        date,
        course}
      });
      console.log(response);
      if (response.data.status === 'Success') {
        alert('Success Uploading');
      }
    } catch (err) {
      console.log(err.message);
      alert('Upload failed: Try again');
      console.error('Upload failed: Try again');
    }
  };

  return (
    <Fragment>
      <div className="home-container">
        <div className="home-header">Admin Dashboard</div>
        <div className="upload-form-container">
          <form className="row g-3 upload-form" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control upload-input"
                value={name}
                onChange={handleNameChange}
                placeholder="Name"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control upload-input"
                id="inputPassword4"
                value={date}
                onChange={handleDateChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Event
              </label>
              <input
                type="text"
                className="form-control upload-input"
                id="inputPassword4"
                value={event}
                onChange={handleEventChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Enrollment Number
              </label>
              <input
                type="number"
                className="form-control upload-input"
                id="inputPassword4"
                value={cid}
                onChange={handleCidChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Course
              </label>
              <input
                type="text"
                className="form-control upload-input"
                id="inputPassword4"
                value={course}
                onChange={handleCourseChange}
              />
            </div>

            <div className="col-12 mt-5">
              <button type="submit" className="btn w-25 upload-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminUpload;
