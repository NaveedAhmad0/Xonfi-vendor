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

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/Project Details/components/Header/index";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "backend";
import { useLocation } from "react-router-dom";

function Overview() {
	const location = useLocation();

	const projid = location.state.projId;
	const token = localStorage.getItem("token");
	const [projDetails, setProjDetails] = useState({
		id: "",
		projectName: "",
		orgsMobileNum: "",
		short_desc: "",
		projectCreaterType: "",
		long_desc: "",
		image: "",
		image2: "",
		projStatus: "",
		balance: "",
		created_at: "",
		projectCompleted: "",
		approvedByAdmin: "",
	});

	useEffect(() => {
		axios
			.get(`${API}Admin/project-details-by-id?id=${projid}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				// withCredentials: true,
			})
			.then((res) => {
				console.log("hulaa", res);
				setProjDetails({
					id: res.data.id,
					projectName: res.data.projectName,
					short_desc: res.data.short_desc,
					image: res.data.image,
					image2: res.data.image2,
					projectCreaterType: res.data.projectCreaterType,
					long_desc: res.data.long_desc,
					creatersMobileNum: res.data.creatersMobileNum,
					projectCompleted: res.data.projectCompleted,
					balance: res.data.balance,
					created_at: res.data.created_at,
					approvedByAdmin: res.data.approvedByAdmin,
				});
			});
	}, []);

	return (
		<DashboardLayout>
			<DashboardNavbar />
			<MDBox mb={2} />
			<Header>
				<MDBox mt={5} mb={3}>
					<Grid container spacing={1}>
						{/* <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid> */}
						<Grid item xs={12} md={6} xl={12} sx={{ display: "flex" }}>
							<Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
							<ProfileInfoCard
								title="Description"
								description={projDetails.short_desc}
								approvedByAdmin={projDetails.approvedByAdmin}
								info={{
									projectName: projDetails.projectName,
									organisersMobile: projDetails.creatersMobileNum,
									balance: projDetails.balance,
									projectCompleted:
										projDetails.projectCompleted === false
											? "Incomplete"
											: "Completed",
									about: projDetails.long_desc,
									created_at: projDetails.created_at,
									// approvedByAdmin:
									// 	projDetails.approvedByAdmin === true
									// 		? "Approved"
									// 		: "Not Approved",
								}}
								action={{ route: "", tooltip: "Edit Profile" }}
								shadow={false}
							/>
							<Divider orientation="vertical" sx={{ mx: 0 }} />
						</Grid>
						{/* <Grid item xs={12} xl={4}>
              <ProfilesList title="conversasdftions" profiles={profilesListData} shadow={false} />
            </Grid> */}
					</Grid>
				</MDBox>
				{/* <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Projects
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Architects design houses
            </MDTypography>
          </MDBox>
        </MDBox> */}
				{/* <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor1}
                label="project #2"
                title="modern"
                description="As Uber works through a huge amount of internal management turmoil."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor2}
                label="project #1"
                title="scandinavian"
                description="Music is something that everyone has their own specific opinion about."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor2}
                label="project #1"
                title="scandinavian"
                description="Music is something that everyone has their own specific opinion about."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor3}
                label="project #3"
                title="minimalist"
                description="Different people have different taste, and various types of music."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor4}
                label="project #4"
                title="gothic"
                description="Why would anyone pick blue over pink? Pink is obviously a better color."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
          </Grid>
        </MDBox> */}
			</Header>
			<Footer />
		</DashboardLayout>
	);
}

export default Overview;
