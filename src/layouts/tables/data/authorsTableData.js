/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "backend";
import { useNavigate } from "react-router-dom";

export default function data() {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	const [allUsers, setAllUsers] = useState([]);
	const [deleteOk, setDeleteOk] = useState(false);

	const getAllUsers = () => {
		axios
			.get(`${API}Admin/get-all-users`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res);
				const sample = [];
				for (let i = 0; i < res.data.data.data.length; i++) {
					sample.push({
						id: res.data.data.data[i].id,
						email: (
							<MDTypography
								component="a"
								href="#"
								variant="caption"
								color="text"
								fontWeight="medium">
								{res.data.data.data[i].email}
							</MDTypography>
						),
						balance: (
							<MDTypography
								component="a"
								href="#"
								variant="caption"
								color="text"
								fontWeight="medium">
								{res.data.data.data[i].balance}
							</MDTypography>
						),
						mobile: (
							<MDTypography
								component="a"
								href="#"
								variant="caption"
								color="text"
								fontWeight="medium">
								{res.data.data.data[i].mobileNum}
							</MDTypography>
						),
						action: (
							<>
								<MDButton size="small" variant="gradient" color="success">
									<p
										onClick={() => {
											navigate("/get-users-profile", {
												state: { userEmail: res.data.data.data[i].email },
											});
										}}>
										View
									</p>
								</MDButton>
								/
								<MDButton size="small" variant="gradient" color="warning">
									<p
										onClick={() => {
											axios
												.delete(
													`${API}/Admin/delete-user/${res.data.data.data[i].id}`,
													{
														headers: {
															"Content-Type": "application/json",
															Authorization: `Bearer ${token}`,
														},
													}
												)
												.then((res) => {
													alert(res.data.message);
													setDeleteOk(!deleteOk);
												});
										}}>
										Delete
									</p>
								</MDButton>
							</>
						),
					});
				}
				setAllUsers(sample);
			});
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	useEffect(() => {
		getAllUsers();
	}, [deleteOk]);

	const Author = ({ image, name, email }) => (
		<MDBox display="flex" alignItems="center" lineHeight={1}>
			<MDAvatar src={image} name={name} size="sm" />
			<MDBox ml={2} lineHeight={1}>
				<MDTypography display="block" variant="button" fontWeight="medium">
					{name}
				</MDTypography>
				<MDTypography variant="caption">{email}</MDTypography>
			</MDBox>
		</MDBox>
	);

	const Job = ({ title, description }) => (
		<MDBox lineHeight={1} textAlign="left">
			<MDTypography
				display="block"
				variant="caption"
				color="text"
				fontWeight="medium">
				{title}
			</MDTypography>
			<MDTypography variant="caption">{description}</MDTypography>
		</MDBox>
	);

	return {
		columns: [
			{ Header: "Id", accessor: "id", width: "15%", align: "left" },
			{ Header: "email", accessor: "email", align: "left" },
			{ Header: "balance", accessor: "balance", align: "center" },
			{ Header: "mobile", accessor: "mobile", align: "center" },
			{ Header: "action", accessor: "action", align: "center" },
		],
		rows: allUsers,

		// rows: [
		//   {
		//     function: <Job title="Manager" description="Organization" />,
		//     status: (
		//       <MDBox ml={-1}>
		//         <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
		//       </MDBox>
		//     ),
		//     employed: (
		//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
		//         23/04/18
		//       </MDTypography>
		//     ),
		// action: (
		//   <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
		//     Edit
		//   </MDTypography>
		// ),
		//   },
		//   {
		//     author: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
		//     function: <Job title="Programator" description="Developer" />,
		//     status: (
		//       <MDBox ml={-1}>
		//         <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
		//       </MDBox>
		//     ),
		//     employed: (
		//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
		//         11/01/19
		//       </MDTypography>
		//     ),
		//     action: (
		//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
		//         Edit
		//       </MDTypography>
		//     ),
		//   },
		//   {
		//     author: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
		//     function: <Job title="Programator" description="Developer" />,
		//     status: (
		//       <MDBox ml={-1}>
		//         <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
		//       </MDBox>
		//     ),
		//     employed: (
		//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
		//         11/01/19
		//       </MDTypography>
		//     ),
		//     action: (
		//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
		//         Edit
		//       </MDTypography>
		//     ),
		//   },
		//   {
		//     author: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
		//     function: <Job title="Executive" description="Projects" />,
		//     status: (
		//       <MDBox ml={-1}>
		//         <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
		//       </MDBox>
		//     ),
		//     employed: (
		//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
		//         19/09/17
		//       </MDTypography>
		//     ),
		//     action: (
		//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
		//         Edit
		//       </MDTypography>
		//     ),
		//   },
		//   {
		//     author: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
		//     function: <Job title="Programator" description="Developer" />,
		//     status: (
		//       <MDBox ml={-1}>
		//         <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
		//       </MDBox>
		//     ),
		//     employed: (
		//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
		//         24/12/08
		//       </MDTypography>
		//     ),
		//     action: (
		//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
		//         Edit
		//       </MDTypography>
		//     ),
		//   },
		//   {
		//     author: <Author image={team3} name="Richard Gran" email="richard@creative-tim.com" />,
		//     function: <Job title="Manager" description="Executive" />,
		//     status: (
		//       <MDBox ml={-1}>
		//         <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
		//       </MDBox>
		//     ),
		//     employed: (
		//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
		//         04/10/21
		//       </MDTypography>
		//     ),
		//     action: (
		//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
		//         Edit
		//       </MDTypography>
		//     ),
		//   },
		//   {
		//     author: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
		//     function: <Job title="Programator" description="Developer" />,
		//     status: (
		//       <MDBox ml={-1}>
		//         <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
		//       </MDBox>
		//     ),
		//     employed: (
		//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
		//         14/09/20
		//       </MDTypography>
		//     ),
		//     action: (
		//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
		//         Edit
		//       </MDTypography>
		//     ),
		//   },
		// ],
	};
}
