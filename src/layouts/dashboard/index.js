/* eslint-disable no-return-await */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "backend";
import { useNavigate } from "react-router-dom";

function Dashboard() {
	const { sales, tasks } = reportsLineChartData;
	const [numberOfProjects, setNumberOfProjects] = useState(0);
	const [ittems, setItems] = useState([]);
	const [totalUsers, setTotalUsers] = useState(0);
	const [completedProjects, setCompletedProjects] = useState(0);
	const [kycPending, setKycPendingUsers] = useState(0);
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	console.log("items is", ittems);
	const getUserDetails = async () => {
		try {
			await axios
				.get(`${API}Admin/get-all-projects`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					// withCredentials: true,
				})
				.then((response) => {
					// console.log(response.data);
					setNumberOfProjects(response.data.data.length);
					const sample = [];
					for (let i = 0; i < response.data.length; i += 1) {
						sample.push({
							id: response.data[i].id,
							projectName: response.data[i].projectName,
							description: response.data[i].description.slice(0, 10),
						});
					}
					setItems(sample);
					// setLoading(false);
					setTimeout(() => {
						// setLoading(false);
					}, 3000);
				});
		} catch (error) {
			console.log(error);
		}
	};

	const getNumberOfUsers = async () => {
		await axios
			.get(`${API}Admin/get-all-users`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				// withCredentials: true,
			})
			.then((res) => {
				// console.log("RE", res);
				setTotalUsers(res.data.data.data.length);
			});
	};
	const getCompletedProjects = async () => {
		await axios
			.get(`${API}Admin/completed-projects`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				// withCredentials: true,
			})
			.then((res) => {
				console.log("co", res);
				setCompletedProjects(res.data.data.length);
			});
	};
	const getKycPendingUsers = async () => {
		await axios
			.get(`${API}Admin/kyc-pending-users`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				// withCredentials: true,
			})
			.then((res) => {
				setKycPendingUsers(res.data.data.data.length);
			});
	};

	useEffect(() => {
		if (!token) {
			navigate("/authentication/sign-in");
		} else {
			(async () => await getKycPendingUsers())();
			(async () => await getNumberOfUsers())();
			(async () => await getCompletedProjects())();
			(async () => await getUserDetails())();
		}
	}, []);

	return (
		<DashboardLayout>
			<DashboardNavbar />
			<MDBox py={3}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6} lg={3}>
						<MDBox mb={1.5}>
							<ComplexStatisticsCard
								color="dark"
								icon="weekend"
								title="Total users"
								count={totalUsers}
								percentage={{
									color: "success",

									label: "Total Number of users",
								}}
							/>
						</MDBox>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<MDBox mb={1.5}>
							<ComplexStatisticsCard
								icon="leaderboard"
								title="Total projects"
								count={numberOfProjects}
								percentage={{
									color: "success",

									label: "Total number of projects",
								}}
							/>
						</MDBox>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<MDBox mb={1.5}>
							<ComplexStatisticsCard
								color="success"
								icon="store"
								title="KYC Pending"
								count={kycPending}
								percentage={{
									color: "success",

									label: "KYC pending users",
								}}
							/>
						</MDBox>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<MDBox mb={1.5}>
							<ComplexStatisticsCard
								color="primary"
								icon="person_add"
								title="Competed Projects"
								count={completedProjects}
								percentage={{
									color: "success",
									label: "Completed projects",
								}}
							/>
						</MDBox>
					</Grid>
				</Grid>
				{/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
				<MDBox>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6} lg={8}>
							<Projects />
						</Grid>
						<Grid item xs={12} md={6} lg={4}>
							<OrdersOverview />
						</Grid>
					</Grid>
				</MDBox>
			</MDBox>
			<Footer />
		</DashboardLayout>
	);
}

export default Dashboard;
