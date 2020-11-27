import React from 'react'
import '../../index.css'
import { Link } from 'react-router-dom'

import cookie from 'js-cookie';
import HeaderComponent from '../../components/header/header.component';
import DoctorSideNavComponent from '../../components/dashboard/sidenave.component';
export default ({ children }) => {
    return (
        <div className="main-wrapper">
            <HeaderComponent />
            <div className="content">
                <div className="container-fluid">
                    <div className="row" >
                        <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar" >
                            <DoctorSideNavComponent />
                        </div>

                        <div className="col-md-7 col-lg-8 col-xl-9">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

    )
}