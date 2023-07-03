/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
// import OtpInput from "react-otp-input";
import OTPInput from "otp-input-react";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import Dashboard from "layouts/dashboard";
import axios from "axios";
import API from "backend";

function Basic() {
	useEffect(() => {
		localStorage.clear();
	}, []);
	const [countryCode, setCountryCode] = useState(0);
	const [mobileNum, setMobileNum] = useState(0);
	const [success, setSuccess] = useState(false);
	const [errMsg, setErrMsg] = useState("");
	const [otp, setOtp] = useState("");

	const navigate = useNavigate();

	async function onSubmit(event) {
		event.preventDefault();

		try {
			const response = await axios.post(
				`${API}Vendor/verifyOtp`,
				JSON.stringify({ countryCode, mobileNum, otp }),
				{
					headers: { "Content-Type": "application/json" },
					// withCredentials: true,
				}
			);
			// if (!success) {
			// 	navigate("/admin/dashboard");
			// }
			console.log(response?.data);

			if (response.data.statusCode === 200) {
				setSuccess(true);
				navigate("/dashboard");
			}
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
		console.log(await success);
	}

	return (
		<>
			{success ? (
				<Dashboard />
			) : (
				<BasicLayout image={bgImage}>
					<Card>
						<MDBox
							variant="gradient"
							bgColor="info"
							borderRadius="lg"
							coloredShadow="success"
							mx={2}
							mt={-3}
							p={2}
							mb={1}
							textAlign="center">
							<MDTypography
								variant="h4"
								fontWeight="medium"
								color="white"
								mt={1}>
								Admin login
							</MDTypography>
							<MDTypography
								className={errMsg ? "errMsg" : "text-danger"}
								color="warning"
								warning="true"
								aria-live="assertive">
								{errMsg}
							</MDTypography>
						</MDBox>
						<MDBox pt={4} pb={3} px={3}>
							<MDBox component="form" role="form">
								<MDBox mb={2}>
									<MDInput
										onChange={(event) => setCountryCode(event.target.value)}
										value={countryCode}
										type="number"
										name="CountryCode"
										label="Country Code"
										required
										fullWidth
									/>
								</MDBox>
								<MDBox mb={2}>
									<MDInput
										onChange={(event) => setMobileNum(event.target.value)}
										value={mobileNum}
										type="number"
										label="Mobile number"
										name="mobileNumber"
										required
										fullWidth
									/>
								</MDBox>
								<MDBox mb={2} textAlign="centre">
									<OTPInput
										value={otp}
										onChange={setOtp}
										autoFocus
										OTPLength={4}
										otpType="number"
									/>
								</MDBox>

								<MDBox mt={4} mb={1}>
									<MDButton
										onClick={(event) => onSubmit(event)}
										href="/admin/dashboard"
										variant="gradient"
										color="info"
										fullWidth>
										Sign In
									</MDButton>
								</MDBox>

								<MDBox textAlign="right">
									<MDTypography variant="button" color="text">
										Dont have an Account?{" "}
										<MDTypography
											component={Link}
											to="/authentication/sign-up"
											variant="button"
											color="info"
											fontWeight="medium"
											textGradient>
											Signup here
										</MDTypography>
									</MDTypography>
								</MDBox>
							</MDBox>
						</MDBox>
					</Card>
				</BasicLayout>
			)}
		</>
	);
}

export default Basic;
