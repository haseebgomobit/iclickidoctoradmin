import '../App.css';
import { Component } from 'react';

import DashboardAppointmentComponent from '../components/dashboard/appointment';

export default class Index extends Component {
	constructor(props) {
		super(props);
		this.state={show:false}
	}
	render() {
		return (
			<div>
				
				<div className="row">
					<div className="col-md-12">
						<div className="card dash-card">
							<div className="card-body">
								<div className="row">
									<div className="col-md-12 col-lg-4">
										<div className="dash-widget dct-border-rht">
											<div className="circle-bar circle-bar1">
												<div className="circle-graph1" data-percent="75">

													<img src="assets/img/icon-01.png" className="img-fluid" alt="patient" />
												</div>
											</div>
											<div className="dash-widget-info">
												<h6>Total Patient</h6>
												<h3>1500</h3>
												<p className="text-muted">Till Today</p>
											</div>
										</div>
									</div>
									
									<div className="col-md-12 col-lg-4">
										<div className="dash-widget dct-border-rht">
											<div className="circle-bar circle-bar2">
												<div className="circle-graph2" data-percent="65">

													<img src="assets/img/icon-02.png" className="img-fluid" alt="Patient" />
												</div>
											</div>
											<div className="dash-widget-info">
												<h6>Today Patient</h6>
												<h3>160</h3>
												<p className="text-muted">06, Nov 2019</p>
											</div>
										</div>
									</div>

									<div className="col-md-12 col-lg-4">
										<div className="dash-widget">
											<div className="circle-bar circle-bar3">
												<div className="circle-graph3" data-percent="50">

													<img src="assets/img/icon-03.png" className="img-fluid" alt="Patient" />
												</div>
											</div>
											<div className="dash-widget-info">
												<h6>Appoinments</h6>
												<h3>85</h3>
												<p className="text-muted">06, Apr 2019</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h4 className="mb-4">Patient Appoinment</h4>
						<div className="appointment-tab">
							<ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
								<li className="nav-item">
									<a className="nav-link active" href="#upcoming-appointments" data-toggle="tab">Upcoming</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#today-appointments" data-toggle="tab">Today</a>
								</li>
							</ul>

							<div className="tab-content">
								<div className="tab-pane show active" id="upcoming-appointments">
									<div className="card card-table mb-0">
										<div className="card-body">
											<div className="table-responsive">
												<table className="table table-hover table-center mb-0">
													<thead>
														<tr>
															<th>Patient Name</th>
															<th>Appt Date</th>
															<th>Purpose</th>
															<th>Type</th>
															<th className="text-center">Paid Amount</th>
															<th></th>
														</tr>
													</thead>
													<tbody>
														<DashboardAppointmentComponent />
														<DashboardAppointmentComponent />
														<DashboardAppointmentComponent />
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
								<div className="tab-pane" id="today-appointments">
									<div className="card card-table mb-0">
										<div className="card-body">
											<div className="table-responsive">
												<table className="table table-hover table-center mb-0">
													<thead>
														<tr>
															<th>Patient Name</th>
															<th>Appt Date</th>
															<th>Purpose</th>
															<th>Type</th>
															<th className="text-center">Paid Amount</th>
															<th></th>
														</tr>
													</thead>
													<tbody>
													<DashboardAppointmentComponent />
													<DashboardAppointmentComponent />
													<DashboardAppointmentComponent />
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		);
	}
}