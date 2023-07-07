import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import API from "../../backend";
import "./Table.css";

function CashOutAcceptedList() {
  const [tableRowsData, setTableRowsData] = useState();
  const [search, setSearch] = useState("");
  const [Filtered, setFiltered] = useState([]);

  const [toggle, setToggle] = useState(false);
  const [rowData, setRowData] = useState();
  const [Image,setImage]=useState()

  const token = localStorage.getItem("accessToken");
  const email = localStorage.getItem("email");

  const fetchData = async () => {
    try {
      var config = {
        method: "get",
        url: `${API}Vendor/accepted-cashout-requests/${email}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };
      axios(config)
        .then(function (response) {
          setTableRowsData(response.data.data);
          setFiltered(response.data.data);
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error.response?.data);
        });
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleQR = async (req_id) => {

    try {
      var config = {
        method: "get",
        url: `${API}Vendor/generateQRAtVendorLoc/${req_id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };
      axios(config)
        .then(function (response) {
          
          console.log(response.data.data);
          setImage(response?.data?.data)
        })
        .catch(function (error) {
          console.log(error.response?.data);
        });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    handleQR();
  }, []);

  

  useEffect(() => {}, [tableRowsData]);

  // useEffect(() => {
  // 	const result = tableRowsData?.filter((tables) => {
  // 		return tables.user_id.toLowerCase().match(search.toLowerCase());
  // 	});
  // 	setFiltered(result);
  // }, [search]);

  const customStyles = {
    headCells: {
      style: {
        color:'white',
       
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "12px",
        lineHeight: "18px",
      },
    },
    row: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "12px",
      lineHeight: "18px",
    },
  };

  const headerResponsive = [
    {
      name: "#",
      selector: "id",
      sortable: false,
      style: {
        color: "#4E7AED",
      },
    },

    {
      name: "User Name",
      selector: "username",
      sortable: true,
      style: {
        color: "#4E7AED",
      },
    },
    {
      name: " Contact",
      selector: "user_mobile",
      sortable: false,
      style: {
        color: "#4E7AED",
      },
    },
    {
      name: " Email",
      selector: "user_email",
      sortable: false,
      style: {
        color: "#4E7AED",
      },
    },
    {
      name: "Amount",
      selector: "amount",
      sortable: false,
      style: {
        color: "#4E7AED",
      },
    },
    {
      name: " Location",
      selector: "cashWithdrawalType",
      sortable: false,
      style: {
        color: "#4E7AED",
      },
    },

    {
      name: "Action",
      cell: (row) => [
        <button
          className="btn  btn-sm btn- text-white" style={{backgroundColor:'#26A69A'}}
          onClick={() => {
            setImage("")
            setToggle(true);
            setRowData(row);
          }}
        >
          Details
        </button>,
      ],
      sortable: false,
      style: {
        color: "#4E7AED",
      },
    },
  ];
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar></DashboardNavbar>
        <div className="container-fluid">
          <div className="row">
            <div className={toggle ? "d-none" : "col-md-12"}>
              <DataTable
                columns={headerResponsive}
                data={Filtered}
                pagination={20}
                fixedHeader
                highlightOnHover
                customStyles={customStyles}
              />
            </div>

            <div
              className={toggle ? "col-md-12 bg-light" : "invoiceDisplay"}
              style={{ display: !rowData ? "none" : "block" }}
            >
              <div className="row">
                <h6
                  className=" text-white"
                 style={{ background: 'linear-gradient(195deg, #49a3f1, #1A73E8)',padding:'22px',borderRadius:'10px'}}
   
                >
                  # {rowData?.id} {rowData?.username} &nbsp; : &nbsp;{" "}
                  {rowData?.user_email}
                </h6>
                <div className="col-md-11 m-auto my-3" style={{ boxShadow: "0px 0px 15px rgb(204, 204, 204) " }}>

                <table class="table">
  
   
 
  <tbody>
  <tr>
      <th scope="row">User ID</th>
      <td>{rowData?.user_id}</td>
      
    </tr>
  <tr>
      <th scope="row">Created At</th>
      <td>{rowData?.createdAt}</td>
      
    </tr>
    <tr>
      <th scope="row">Amount</th>
      <td>{rowData?.amount}</td>
      
    </tr>
    <tr>
      <th scope="row">Location</th>
      <td>{rowData?.cashWithdrawalType}</td>
      
      
    </tr>
    <tr>
      <th scope="row">Address</th>
      <td>{rowData?.address}</td>
      
      
    </tr>
    <tr>
      <th scope="row">Mobile</th>
      <td>{rowData?.user_mobile}</td>
      
      
    </tr>

   
    

   


   
  </tbody>
</table>
<div className="row">
    <div className="col-md-6">
    <button className="btn btn-secondary  text-white" onClick={()=>handleQR(rowData?.id)}>Genrate QR</button>

    </div>
    <div className="col-md-6">
       <img className="img-fluid" src={Image} alt=''></img>


    </div>

       

 </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default CashOutAcceptedList;
