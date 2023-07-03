/* eslint-disable no-plusplus */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import KycCompletedData from "layouts/tables/data/KycCompletedData";
import KycPendingData from "layouts/tables/data/KycPendingTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { Tabs, Box, Tab, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";
import API from "backend";
import { useMaterialUIController } from "context";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  // const [kycUsers, setKycUsers] = useState([]);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function Tables() {
  // eslint-disable-next-line no-unused-vars
  const { columns, rows } = authorsTableData();
  const { columns: kycPendingcolumns, rows: kycpendingrows } = KycPendingData();
  const { columns: kycCOmpletedcolumns, rows: KycCompletedrows } = KycCompletedData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  // const [controller] = useMaterialUIController();
  // const { kycUsers } = controller;
  // console.log("KYC", kycUsers);

  // export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Users Table
                </MDTypography>
              </MDBox>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Registered" {...a11yProps(0)} />
                    <Tab label="Kyc Pending" {...a11yProps(1)} />
                    <Tab label="Kyc Completed" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <MDBox pt={3}>
                    <DataTable
                      table={{ columns, rows }}
                      isSorted
                      entriesPerPage
                      showTotalEntries={false}
                      noEndBorder
                      pagination
                    />
                  </MDBox>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <MDBox pt={3}>
                    <DataTable
                      table={{ columns: kycPendingcolumns, rows: kycpendingrows }}
                      isSorted
                      entriesPerPage
                      showTotalEntries={false}
                      noEndBorder
                      pagination
                    />
                  </MDBox>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <MDBox pt={3}>
                    <DataTable
                      table={{
                        columns: kycCOmpletedcolumns,
                        rows: KycCompletedrows,
                      }}
                      isSorted
                      entriesPerPage
                      showTotalEntries={false}
                      noEndBorder
                      pagination
                    />
                  </MDBox>
                </TabPanel>
              </Box>
            </Card>
          </Grid>
          {/* <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid> */}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
