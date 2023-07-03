/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-loop-func */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
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
import MDInput from "components/MDInput";
import { FormControlLabel, Switch } from "@mui/material";

export default function data() {
	const token = localStorage.getItem("token");

	const [projectsList, setprojectsList] = useState([]);
	const [marked, setMarked] = useState(false);
	const [deleteOk, setDeleteOk] = useState(true);
	const navigate = useNavigate();

	const getProjectsList = () => {
		axios
			.get(`${API}Admin/get-all-projects`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res);

				const sample = [];
				for (let i = 0; i < res.data.data.length; i++) {
					sample.push({
						id: res.data.data[i].id,
						projectName: (
							<MDTypography
								component="a"
								href="#"
								variant="caption"
								color="text"
								fontWeight="medium">
								{res.data.data[i].projectName}
							</MDTypography>
						),
						description:
							res.data.data[i].short_desc &&
							`${res.data.data[i].short_desc.slice(0, 80)}....`,
						projStatus: (
							<FormControlLabel
								sx={{
									display: "block",
								}}
								control={
									<Switch
										checked={
											res.data.data[i].projectStatus === "Inactive"
												? false
												: true
										}
										onChange={() => {
											axios
												.put(
													`${API}Admin/mark-as-active?projectId=${res.data.data[i].id}`,
													JSON.stringify({}),
													{
														headers: {
															"Content-Type": "application/json",
															Authorization: `Bearer ${token}`,
														},
													}
												)
												.then((res) => {
													console.log(res);

													setMarked(!marked);
													alert(res.data.message);
												});
										}}
									/>
								}
								label={
									res.data.data[i].projectStatus === "Inactive"
										? "Inactive"
										: "Active"
								}
							/>
						),
						action: (
							<>
								<MDButton size="small" variant="gradient" color="success">
									<p
										onClick={() => {
											navigate("/projectDetails", {
												state: { projId: res.data.data[i].id },
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
													`https://backend.elimpay.com/api/Admin/delete-project/${res.data.data[i].id}`,
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
				setprojectsList(sample);
			});
	};

	useEffect(() => {
		getProjectsList();
	}, []);

	useEffect(() => {
		getProjectsList();
	}, [marked, deleteOk]);

	const Author = ({ image, name, projectName }) => (
		<MDBox display="flex" alignItems="center" lineHeight={1}>
			<MDAvatar src={image} name={name} size="sm" />
			<MDBox ml={2} lineHeight={1}>
				<MDTypography display="block" variant="button" fontWeight="medium">
					{name}
				</MDTypography>
				<MDTypography variant="caption">{projectName}</MDTypography>
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
			{ Header: "projectName", accessor: "projectName", align: "left" },
			{ Header: "description", accessor: "description", align: "center" },
			{ Header: "projStatus", accessor: "projStatus", align: "center" },
			{ Header: "action", accessor: "action", align: "center" },
			// { Header: "Delete", accessor: "action2", align: "center" },
		],
		rows: projectsList,
	};
}
