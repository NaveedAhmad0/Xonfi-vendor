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

	const [kycUsers, setKycUsers] = useState([]);
	const [id1, setid1] = useState([]);

	useEffect(() => {
		axios
			.get(`${API}transaction/all-transactions/authenticate_for_admin`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res);
				const sample = [];
				for (let i = 0; i < res.data.length; i++) {
					sample.push({
						id: (
							<MDTypography
								component="a"
								href="#"
								variant="caption"
								color="text"
								fontWeight="medium"
								onClick={(e) => {
									setid1(res.data[i].id);
									// console.log(e.target.innerHTML);
								}}>
								{res.data[i].id}
							</MDTypography>
						),
						recieverName: (
							<MDTypography
								component="a"
								href="#"
								variant="caption"
								color="text"
								fontWeight="medium"
								onClick={(e) => {
									setid1(res.data[i].id);
									// console.log(e.target.innerHTML);
								}}>
								{res.data[i].recieverName}
							</MDTypography>
						),
						recieverNum: (
							<MDTypography
								component="a"
								href="#"
								variant="caption"
								color="text"
								fontWeight="medium"
								onClick={(e) => {
									setid1(res.data[i].id);
									// console.log(e.target.innerHTML);
								}}>
								{res.data[i].recieverNum}
							</MDTypography>
						),
						amount: (
							<MDTypography
								component="a"
								href="#"
								variant="caption"
								color="text"
								fontWeight="medium"
								onClick={(e) => {
									setid1(res.data[i].id);
									// console.log(e.target.innerHTML);
								}}>
								{res.data[i].amount}
							</MDTypography>
						),
						action: (
							<MDButton size="small" variant="gradient" color="success">
								<p
									onClick={() => {
										navigate("/get-users-profile", {
											state: { userEmail: res.data[i].email },
										});
									}}>
									View
								</p>
							</MDButton>
						),
					});
				}
				setKycUsers(sample);
			});
	}, []);

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
			{ Header: "reciever Name", accessor: "recieverName", align: "left" },
			{ Header: "reciever Num", accessor: "recieverNum", align: "center" },
			{ Header: "amount", accessor: "amount", align: "center" },
			// { Header: "action", accessor: "action", align: "center" },
		],
		rows: kycUsers,
		id12ka4: id1,

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
