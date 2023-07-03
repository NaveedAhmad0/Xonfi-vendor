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
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useEffect, useState } from "react";
import API from "backend";
import axios from "axios";

function Cover() {
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [countryCode, setCountryCode] = useState(0);
	const [mobileNum, setMobileNum] = useState(0);
	const [location, setLocation] = useState("");
	const [address, setAddress] = useState("");
	const [success, setSuccess] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	async function onSubmit(event) {
		event.preventDefault();
		console.log(email, firstName, lastName, countryCode, mobileNum);

		try {
			const response = await axios.post(
				`${API}/Vendor/signup`,
				JSON.stringify({
					email,
					firstName,
					lastName,
					countryCode,
					mobileNum,
					location,
					Address: address,
				}),
				{
					headers: { "Content-Type": "application/json" },
					// withCredentials: true,
				}
			);
			// if (!success) {
			// 	navigate("/admin/dashboard");
			// }
			console.log(JSON.stringify(response?.data));

			alert(response.data.message);

			setEmail("");
			setSuccess(true);
		} catch (err) {
			// if (!err?.response) {
			// 	setErrMsg("No Server Response");
			// } else if (err.response?.status === 400) {
			// 	setErrMsg("Invalid Credentialials");
			// 	setSuccess(false);
			// } else {
			// 	setErrMsg("Login failed");
			// }
			console.log(err);
		}
		console.log(success);
	}

	return (
		<CoverLayout image={bgImage}>
			<Card>
				<MDBox
					variant="gradient"
					bgColor="info"
					borderRadius="lg"
					coloredShadow="success"
					mx={2}
					mt={-3}
					p={3}
					mb={1}
					textAlign="center">
					<MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
						Join us today
					</MDTypography>
					<MDTypography display="block" variant="button" color="white" my={1}>
						Enter your email and password to register
					</MDTypography>
				</MDBox>
				<MDBox pt={3} pb={3} px={3}>
					<MDBox component="form" role="form">
						<MDBox mb={2}>
							<MDInput
								value={firstName}
								onChange={(e) => {
									setFirstName(e.target.value);
								}}
								type="text"
								label="First Name"
								variant="standard"
								fullWidth
							/>
						</MDBox>
						<MDBox mb={2}>
							<MDInput
								value={lastName}
								onChange={(e) => {
									setLastName(e.target.value);
								}}
								type="text"
								label="Last Name"
								variant="standard"
								fullWidth
							/>
						</MDBox>
						<MDBox mb={2}>
							<MDInput
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								type="email"
								label="Email"
								variant="standard"
								fullWidth
							/>
						</MDBox>
						<MDBox mb={2}>
							<MDInput
								value={countryCode}
								onChange={(e) => {
									setCountryCode(e.target.value);
								}}
								type="number"
								label="Country Code"
								variant="standard"
								fullWidth
							/>
						</MDBox>
						<br />
						<MDBox mb={2}>
							<MDInput
								value={mobileNum}
								onChange={(e) => {
									setMobileNum(e.target.value);
								}}
								type="number"
								label="Mobile Number"
								variant="standard"
								fullWidth
							/>
						</MDBox>
						<MDBox mb={2}>
							<MDInput
								value={location}
								onChange={(e) => {
									setLocation(e.target.value);
								}}
								type="text"
								label="Location"
								variant="standard"
								fullWidth
							/>
						</MDBox>
						<MDBox mb={2}>
							<MDInput
								value={address}
								onChange={(e) => {
									setAddress(e.target.value);
								}}
								type="text"
								label="Address"
								variant="standard"
								fullWidth
							/>
						</MDBox>
						<MDBox display="flex" alignItems="center" ml={-1}>
							<Checkbox />
							<MDTypography
								variant="button"
								fontWeight="regular"
								color="text"
								sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}>
								&nbsp;&nbsp;I agree the&nbsp;
							</MDTypography>
							<MDTypography
								component="a"
								href="#"
								variant="button"
								fontWeight="bold"
								color="info"
								textGradient>
								Terms and Conditions
							</MDTypography>
						</MDBox>
						<MDBox mt={4} mb={1}>
							<MDButton
								variant="gradient"
								color="info"
								onClick={(event) => onSubmit(event)}
								fullWidth>
								sign in
							</MDButton>
						</MDBox>
						<MDBox mt={3} mb={1} textAlign="center">
							<MDTypography variant="button" color="text">
								Already have an account?{" "}
								<MDTypography
									component={Link}
									to="/authentication/sign-in"
									variant="button"
									color="info"
									fontWeight="medium"
									textGradient>
									Sign In
								</MDTypography>
							</MDTypography>
						</MDBox>
					</MDBox>
				</MDBox>
			</Card>
		</CoverLayout>
	);
}

export default Cover;
