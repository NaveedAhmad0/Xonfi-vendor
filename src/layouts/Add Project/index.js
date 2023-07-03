/* eslint-disable arrow-body-style */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
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

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import "./add.css";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { FileUploader } from "react-drag-drop-files";
import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "backend";

function Cover() {
	const [projectName, setProjectName] = useState("");
	const [descr, setDescr] = useState("");
	const [CreatorType, setCreatorType] = useState("Elimpay User");
	// const [createdBy, setCreatedBy] = useState("");
	const [creatersMobileNum, setCreatersMobileNum] = useState("");
	const [long_desc, setLongDesc] = useState("");
	const [images, setImages] = useState([]);

	const fileTypes = ["JPG", "PNG", "GIF"];
	const token = localStorage.getItem("token");
	const naviagte = useNavigate();

	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				resolve(fileReader.result);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};
	// const fileSelectedHandler = (file) => {
	// 	let addedFiles = images.concat(file);
	// 	setImages([addedFiles]);
	// 	console.log("upload file " + file.name);
	// };

	useEffect(() => {
		console.log("IMAGE", images);
	}, [images]);

	const getFiles = (files) => {
		setImages({ files });
	};

	async function onSubmit(event) {
		// const Base64ProjectImage = await convertBase64(images);
		// const Base64ProjectImage2 = await convertBase64(projectImage2[0]);

		event.preventDefault();
		// const formData = new FormData();
		// for (let i = 0; i < images.length; i++) {
		// 	formData.append(`images[${i}]`, images[0]);
		// }
		try {
			await axios
				.post(
					`${API}Admin/create_project?creater_type=${CreatorType}`,
					JSON.stringify({
						creatersMobileNum,
						short_desc: descr,
						projectName,
						long_desc: long_desc,
						images: images.files,
					}),
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then((res) => {
					// console.log(res);
					alert(res.data.message);
					setProjectName("");
					setImages([]);
					setDescr("");
					setLongDesc("");
					// setCreatedBy("");
					naviagte("/projects");
				});
			// }
		} catch (err) {
			console.log(err.message);
		}
	}

	// const getFiles2 = (files) => {
	// 	setProjectImage2(files);
	// };

	return (
		<DashboardLayout>
			<DashboardNavbar />
			<Card>
				<MDBox
					variant="gradient"
					bgColor="info"
					borderRadius="lg"
					coloredShadow="success"
					mx={2}
					mt={3}
					p={2}
					mb={1}
					textAlign="left">
					<MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
						Add New Project
					</MDTypography>
					{/* <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography> */}
				</MDBox>
				<MDBox pt={4} pb={3} px={3}>
					<MDBox component="form" role="form">
						<MDBox mb={2}>
							<MDInput
								type="text"
								label="Project Name"
								variant="standard"
								onChange={(e) => {
									setProjectName(e.target.value);
								}}
								value={projectName}
								fullWidth
							/>
						</MDBox>
						{/* <MDBox mb={2}>
							<MDInput
								type="email"
								label="Created By"
								variant="standard"
								onChange={(e) => {
									setCreatedBy(e.target.value);
								}}
								value={createdBy}
								fullWidth
							/>
						</MDBox> */}
						<MDBox mb={2}>
							<MDInput
								type="email"
								label="Creator Mobile"
								variant="standard"
								onChange={(e) => {
									setCreatersMobileNum(e.target.value);
								}}
								value={creatersMobileNum}
								fullWidth
							/>
						</MDBox>

						<MDBox mb={2}>
							<FormControl
								fullWidth
								variant="standard"
								sx={{ height: "150px", marginBottom: "20px" }}>
								<InputLabel htmlFor="standard-adornment-amount2">
									Description
								</InputLabel>
								<Input
									id="standard-adornment-amount"
									multiline
									label="Long Description"
									onChange={(e) => {
										setDescr(e.target.value);
									}}
									value={descr}
									sx={{ height: "150px" }}
								/>
							</FormControl>{" "}
						</MDBox>
						<MDBox mb={2}>
							<FormControl
								fullWidth
								variant="standard"
								sx={{ height: "150px", marginBottom: "20px" }}>
								<InputLabel htmlFor="standard-adornment-amount">
									Long Description
								</InputLabel>
								<Input
									id="standard-adornment-amount"
									multiline
									label="Long Description"
									onChange={(e) => {
										setLongDesc(e.target.value);
									}}
									value={long_desc}
									sx={{ height: "150px" }}
								/>
							</FormControl>{" "}
						</MDBox>
						<MDBox
							display="flex"
							alignItems="center"
							ml={1}
							sx={{ display: "flex", justifyContent: "space-between" }}>
							{/* <Checkbox /> */}
							<MDBox mb={2}>
								<label>Upload Photo</label> <br />
								{/* <MDBox> */}
								{/* <FormControl fullWidth variant="standard">
									<input
										id="standard-adornment-amount"
										type="file"
										multiple
										label="Project Image"
										onChange={(e) => {
											setImages(e.target.files);
										}}
									/>
								</FormControl>{" "} */}
								{/* </MDBox> */}
								<FileBase64
									type="file"
									multiple={true}
									className="hi"
									onDone={getFiles.bind()}
									style={{
										maxWidth: "100%",
										minWidth: "100%",
										width: "100%",
										height: "210px",
										border: "1px solid black",
										backgroundColor: "red",
									}}
								/>
								{/* <FileUploader
                  style={{
                    maxWidth: "100%",
                    minWidth: "100%",
                    width: "100%",
                    height: "210px",
                    border: "1px solid black",
                    backgroundColor: "red",
                  }}
                  classes="file-upload"
                  handleChange={(e) => {
                    setProjectImage2(e);
                    // console.log(e);
                  }}
                  name="file"
                  maxSize={2}
                  types={fileTypes}
                /> */}
							</MDBox>
							{/* <MDBox mb={2}>
								<label>Upload Photo</label> <br />
								<FormControl fullWidth variant="standard">
									<Input
										id="standard-adornment-amount"
										type="file"
										label="Description"
										onChange={(e) => {
											setProjectImage2(e.target.value);
										}}
										value={description}
									/>
								</FormControl>{" "} */}
							{/* <FileBase64
									type="file"
									multiple={false}
									onDone={({ base64 }) => setProjectImage2(base64)}
								/> */}
							{/* <FileUploader
                  style={{
                    maxWidth: "100%",
                    minWidth: "100%",
                    width: "100%",
                    height: "210px",
                    border: "1px solid black",
                    backgroundColor: "red",
                  }}
                  classes="file-upload"
                  handleChange={(e) => {
                    setProjectImage2(e);
                  }}
                  name="file"
                  maxSize={2}
                  types={fileTypes}
                /> */}
							{/* </MDBox> */}
						</MDBox>
						<MDBox mt={4} mb={1}>
							<MDButton
								variant="gradient"
								color="info"
								fullWidth
								onClick={onSubmit}>
								Create
							</MDButton>
						</MDBox>
					</MDBox>
				</MDBox>
			</Card>
		</DashboardLayout>
	);
}

export default Cover;
