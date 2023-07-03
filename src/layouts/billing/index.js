/* eslint-disable no-unneeded-ternary */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import TxnTable from "examples/Tables/TxnTable/index";
import txnData from "layouts/billing/data";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import Bill from "layouts/billing/components/Bill/index";
import React, { useEffect, useState } from "react";
import API from "backend";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function Billing() {
  const { columns, rows, id12ka4 } = txnData();
  const [loading, setLoading] = useState(true);
  const [showData, setShowData] = useState([
    {
      id: "",
      message: "",
      senderNum: "",
      recieverNum: "",
      amount: "",
      createdAt: "",
      recieverEmail: "",
      recieverName: "",
      recieverType: "",
      tsxSuccessful: null,
      transactionType: "",
    },
  ]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${API}transaction/details-of-transaction/${id12ka4 > 0 ? id12ka4 : 1}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
      })
      .then((res) => {
        setShowData({
          id: res.data.id,
          message: res.data.message,
          senderNum: res.data.senderNum,
          recieverNum: res.data.recieverNum,
          amount: res.data.amount,
          recieverEmail: res.data.recieverEmail,
          recieverName: res.data.recieverName,
          recieverType: res.data.recieverType,
          transactionType: res.data.transactionType,
          tsxSuccessful: res.data.tsxSuccessful,
          createdAt: res.data.createdAt,

          // notes: res.data[i].note,
        });
        setLoading(false);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  }, [id12ka4]);

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
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
                    All Transactions
                  </MDTypography>
                </MDBox>

                <TxnTable
                  table={{
                    columns,
                    rows,
                  }}
                  isSorted
                  entriesPerPage
                  showTotalEntries={false}
                  noEndBorder
                  pagination
                />
              </Card>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Card id="delete-account">
                <MDBox pt={3} px={2}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Transaction Information
                  </MDTypography>
                </MDBox>
                <MDBox pt={1} pb={2} px={2}>
                  <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                    {/* {loading === true ? (
                      <ClipLoader color="#136be0" size={100} speedMultiplier={1} />
                    ) : ( */}
                    <Bill
                      name={showData.recieverName}
                      company={showData.recieverNum}
                      email={showData.recieverEmail}
                      vat={showData.amount}
                      id={showData.id}
                      message={showData.message}
                      transactionType={showData.transactionType}
                      tsxSuccessful={showData.tsxSuccessful}
                      createdAt={showData.createdAt}
                      recieverType={showData.recieverType}
                    />
                    {/* )} */}
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        {/* <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Invoices />
            </Grid>
            <Grid item xs={12} md={5}>
              <Transactions />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
