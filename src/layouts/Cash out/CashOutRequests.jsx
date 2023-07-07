import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useState,useEffect } from "react";
import API from '../../backend'
import './Table.css';


function CashOutRequests() {
    const [tableRowsData, setTableRowsData] = useState();
	const [search, setSearch] = useState("");
	const [Filtered, setFiltered] = useState([]);

    const token=localStorage.getItem("accessToken")
    const email=localStorage.getItem('email')

     const fetchData = async () => {
	 	try {
	 		var config = {
	 			method: "get",
	 			url: `${API}/Vendor/pending-cashout-requests/${email}`,
	 			headers: {
	 				"Content-Type": "application/json",
	 				Authorization: `${token}`,
	 			},
	 		};
	 		axios(config)
	 			.then(function (response) {
	 				setTableRowsData(response?.data?.data);
	 				setFiltered(response?.data?.data);
                    
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

   const handleRequest = async (id)=>{
      
     console.log(token)
   


      try {
          var config = {
              method: "get",
              url: `${API}Vendor/accept_cashout_request/${email}/${id}`,
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}` ,
              },
          };
          axios(config)
              .then(function (response) {
                  setTableRowsData(response.data.data);
                  setFiltered(response.data.data);
                 console.log(response.data.data)
              })
              .catch(function (error) {
                  console.log(error.response.data);
              });
      } catch (error) {
          console.log(error.response.data);
      }


   }

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
			name: " Location",
			selector: "cashWithdrawalType",
			sortable: false,
			style: {
				color: "#4E7AED",
			},
		},
        {
			name: " Created At",
			selector: "createdAt",
			sortable: false,
			style: {
				color: "#4E7AED",
			},
		},
        {
			name: "Action",
			cell: (d) => [


                
                    d.request_status === 0 ? 
                    <button className="btn btn-danger" onClick={ ()=> handleRequest(`${d.id}`,`${d.email}`)}>
                     Pending
                   </button>
                   :
                   <button className="btn btn-primary">
                       Approved
                  </button>


                
				
			],
			sortable: false,
		},
	
		
		
	
	];
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar></DashboardNavbar>

       
        <DataTable
          columns={headerResponsive}
          data={Filtered}
          pagination={20}
         fixedHeader
          highlightOnHover
         
          customStyles={customStyles}
         
        /> 
      </DashboardLayout>
    </>
  );
}

export default CashOutRequests;
