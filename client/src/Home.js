

import React from 'react';
import { useHistory } from "react-router-dom";
import './App.css'; 

function Home() {
    const history = useHistory();

    const redirect_to_roles = () => {
        history.push('/roles');
    };

    const redirect_to_addmed = () => {
        history.push('/addmed');
    };

    const redirect_to_supply = () => {
        history.push('/supply');
    };

    const redirect_to_track = () => {
        history.push('/track');
    };

    return (
        <center>
        <div className="home-container">
            <h1 className="title">PharmaAuth</h1>
            <div className="content">
                <div className="section" onClick={redirect_to_roles}>
                    <h2 className="section-title">Register Stakeholders</h2>
                    <button onClick={redirect_to_roles} className="btn btn-primary">Register</button>
                </div>
                <div className="section" onClick={redirect_to_addmed}>
                    <h2 className="section-title">Order Medicines</h2>
                   
                    <button onClick={redirect_to_addmed} className="btn btn-primary">Order Medicines</button>
                </div>
                <div className="section" onClick={redirect_to_supply}>
                    <h2 className="section-title">Control Supply Chain</h2>
                   
                    <button onClick={redirect_to_supply} className="btn btn-primary">Control Supply Chain</button>
                </div>
                <div className="section" onClick={redirect_to_track}>
                    <h2 className="section-title">Verification Page</h2>
                  
                    <button onClick={redirect_to_track} className="btn btn-primary">Verify</button>
                </div>
            
        

            </div>
            <div className="footer">
                    <p>&copy; 2024 PharmaAuth. All rights reserved.</p>
                </div>
        </div>
        </center>
    );
}

export default Home;