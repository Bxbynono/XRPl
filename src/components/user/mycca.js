import React, { Fragment, Component } from 'react';
import axios from 'axios';
import "../css/mycca.css"
import Footer from './footer';

class MyCCa extends Component {
    constructor(props) {
        super(props);
        this.pointsContainerRef = React.createRef();
        this.state = {
            cid: '',
            name: '',
            event: '',
            points: '',
            students: []
          };
    }

    handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          await this.updateIdBasedOnCid();
          this.setState({ cid: ''});
        } catch (error) {
          console.error('Failed to update student points:', error);
        }
      };

      handleCidChange = (event) => {
        this.setState({ cid: event.target.value });
      };

      getStudents = async () => {
        try {
          const response = await axios.get('http://localhost:4002/studentVault/v1/students/');
          const studentsData = response.data.data;
          this.setState({ students: studentsData });
        } catch (err) {
          console.log(err);
        }
      };

      updateIdBasedOnCid = () => {
        for (let i = 0; i < this.state.students.length; i++) {
          if (this.state.students[i].cid === parseInt(this.state.cid)) {
            this.state.cid=this.state.students[i].cid;
            this.state.name = this.state.students[i].name;
            this.state.event=this.state.students[i].event;
            this.state.points = this.state.students[i].points;

            document.getElementById("name").span.textContent = this.state.name;
            document.getElementById("cid").span.textContent = this.state.cid;
          }
        }
      };

    componentDidMount() {
        this.getStudents();
    }
    render() {

        const userData = this.props.student;
        console.log(userData)
        return (
            <Fragment>

                <div className='cca-hero-container'>
                    <div className='cca-hero-cta'>
                        View Your CCA Points
                    </div>
                </div>
                <div className='cca-body-container'>
                    <div className='container'>
                        <div className='cca-search-container'>
                            <div className='cca-search-text'>
                                Type in your enrollment number and view your CCA
                            </div>
                            <form onSubmit={this.handleSubmit()}>

                                <div className="input-group mb-3">
                                    <input type="text" className="form-control cca-search-button" placeholder="enrollment number" aria-describedby="button-addon2" value={this.state.cid}
                                    onChange={this.handleCidChange} />
                                    <button className="btn search-btn" type="submit" id="button-addon2">Search</button>
                                </div>
                            </form>
                        </div>

                        <div className='cca-step-container'>
                            <div className='cca-steps'>
                                <div>
                                    1
                                </div>
                                <div>
                                    Enter Your Enrollment Number
                                </div>
                            </div>
                            <div className='cca-steps'>
                                <div>
                                    2
                                </div>
                                <div>
                                    Search For Your CCA
                                </div>
                            </div>
                            <div className='cca-steps'>
                                <div>
                                    3
                                </div>
                                <div>
                                    View Your CCA
                                </div>
                            </div>
                        </div>
                        <div className='mb-5' ref={this.pointsContainerRef}>

                        </div>
                        <div className='cca-points-container' >
                            <div className='cca-points-header'>
                                <img src='images/logo.png' alt='logo' />
                                <div>Your CCA Points</div>
                                <div>Date</div>
                            </div>
                            <div className='cca-points-user-name'>
                                <div id='name'>
                                    Name : <b> </b>
                                    <span></span>
                                </div>
                                <div id='cid'>
                                    Enrollment Number : <b></b>
                                </div>
                            </div>
                            <div className='cca-points-point'>
                                <div id='events'>
                                    Events Attended :
                                </div>




                            </div>

                            <div className='cca-points-total' id='points'>
                                <div>Total CCA Points :</div>
                                <span></span>
                            </div>

                            {/* <div className='cca-btn-container' >
                                <button className='cca-download-btn'>Download</button>
                                <button className='cca-view-btn'>View Detail</button>
                            </div> */}
                        </div>

                        {/* <div className='cca-points-detail'>
                            <h5 className='text-center'>Your CCA Record Details</h5>
                            <table className="table cca-table">
                                <thead className='cca-table-head'>
                                    <tr>
                                        <th scope="col">SL.NO</th>
                                        <th scope="col">Event Type</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">CCA Points</th>
                                    </tr>
                                </thead>
                                <tbody className='cca-table-body'>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>XRPL Awareness Event</td>
                                        <td>25/03/2023</td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Volunteer at Nekha</td>
                                        <td>34/04/2023</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Debate on Blockchain</td>
                                        <td>25/02/2023</td>
                                        <td>4</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Debate on Blockchain</td>
                                        <td>25/02/2023</td>
                                        <td>4</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td>Debate on Blockchain</td>
                                        <td>25/02/2023</td>
                                        <td>4</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> */}
                    </div>
                </div>
                <Footer />
            </Fragment>
        )
    }
}
export default MyCCa;