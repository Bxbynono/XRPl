import React, { Fragment, Component } from 'react';
import axios from 'axios';

export default class AdminViewCCA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cid: '',
      points: '',
      id: '',
      students: [],
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await this.getStudents();
      await this.updateIdBasedOnCid();
      this.setState({ cid: '', points: '' });
    } catch (error) {
      console.error('Failed to update student points:', error);
    }
  };

  handleCidChange = (event) => {
    this.setState({ cid: event.target.value });
  };

  // handlePointChange = () => {
  //   this.setState({ points:  document.getElementById('inputID').value}, () => {
  //     return this.state.points;
  //   });
  // };
  

  getStudents = async () => {
    try {
      const response = await axios.get('http://localhost:4002/studentVault/v1/students');
      const studentsData = response.data.data;
      this.setState({ students: studentsData });
    } catch (err) {
      console.log(err);
    }
  };

  updateIdBasedOnCid = () => {
    for (let i = 0; i < this.state.students.length; i++) {
      if (this.state.students[i].cid === parseInt(this.state.cid)) {
        this.setState({ id: this.state.students[i]._id }, () => {
          this.setState({ points:  document.getElementById('inputID').value}, () => {
            console.log("Updated ID:", this.state.id);
            console.log("points:", this.state.points);
            this.updatePoints();
          });
        });
        return;
      }
    }

    console.log("Student with CID not found");
  };

  updatePoints = async () => {
    try {
      const response = await axios({
        method: 'PATCH',
        url: 'http://localhost:4002/studentVault/v1/students/' + this.state.id,
        data: { points: this.state.points},
      });
      console.log(response);
      if (response.data.status === 'Success') {
        alert('Success Updating');
      }
    } catch (err) {
      console.log(err.message);
      alert('Upload failed: Try again');
      console.error('Upload failed: Try again');
    }
  };

  componentDidMount() {
    this.getStudents();
  }

  render() {
    return (
      <Fragment>
        <div className='home-container'>
          <div className='home-header'>View Student CCA</div>
          <div className='upload-form-container mb-5'>
            <form className='row g-3 upload-form' onSubmit={this.handleSubmit}>
              <div className='col-md-6'>
                <label htmlFor='inputPassword4' className='form-label'>
                  Enrollment Number
                </label>
                <input
                  type='number'
                  className='form-control upload-input'
                  id='inputPassword4'
                  value={this.state.cid}
                  onChange={this.handleCidChange}
                  placeholder='Enrollment Number'
                />
              </div>
              <div className='col-md-6'>
                <label htmlFor='inputPassword4' className='form-label'>
                  CCA Points
                </label>
                <input
                  type='text'
                  className='form-control upload-input'
                  id='inputID'
                  // value={this.state.points}
                  // onChange={this.handlePointChange}
                  placeholder='CCA Points'
                />
              </div>

              <div className='col-12 mt-5'>
                <button type='submit' className='btn w-25 upload-button'>
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className='home-table-container'>
            <div className='home-table table-responsive'>
              <table className='table'>
                <thead className='table-head'>
                  <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Enrollment Number</th>
                    <th scope='col'>Course</th>
                    <th scope='col'>Event Name</th>
                    <th scope='col'>Date</th>
                    <th scope='col'>Total Points</th>
                  </tr>
                </thead>
                <tbody className='table-body'>
                  {this.state.students.map((student, index) => (
                    <tr key={index}>
                      <th scope='row'>{index + 1}</th>
                      <td>{student.name}</td>
                      <td>{student.cid}</td>
                      <td>{student.course}</td>
                      <td>{student.event}</td>
                      <td>{student.date}</td>
                      <td>{student.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
