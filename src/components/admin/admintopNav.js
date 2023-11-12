import React, { Fragment, useEffect, useState } from 'react';

import '../css/topnav.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import jwt from 'jsonwebtoken';
export default function AdminTopNav() {

    const [userData, setUserData] = useState(null);
    const fetchData = async () => {
        try {
            const cookieValue = Cookies.get('jwt');
            const decodedToken = jwt.decode(cookieValue);
            const userId = decodedToken.id;
            const response = await axios.get(`http://localhost:3001/studentVault/v1/users/${userId}`);
            setUserData(response.data.data);
        } catch (error) {
            console.error('Retriveing Failed: Error getting data');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Fragment>
            <div className='admin-top-nav-container'>
                <div className='admin-top-logo-container'>
                    <img src='/images/logo.png' alt='logo' className='top-nav-logo' />
                    <div className='admin-top-name'>
                        CCA<span>LEDGER</span>
                    </div>
                </div>
                {userData ? (
                    <div className='admin-top-user-container'>
                        <div className='admin-top-user-name'>
                            {userData.name}
                        </div>
                    </div>
                ) : (
                    <div className='admin-top-user-container'>
                        <div className='admin-top-user-name'>
                            user1
                        </div>
                        {/* <img src='images/user.png' alt='user' /> */}
                    </div>
                )}
            </div>
        </Fragment>
    )
}