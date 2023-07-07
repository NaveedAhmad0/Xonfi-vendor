import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import API from "../../backend";
import "./Table.css";

function Transaction() {
  const [tableRowsData, setTableRowsData] = useState();
  const [search, setSearch] = useState("");
  const [Filtered, setFiltered] = useState([]);

  const [toggle, setToggle] = useState(false);
  const [rowData, setRowData] = useState();

  const token = localStorage.getItem("accessToken");
  console.log(token)

  const fetchData = async () => {
    try {
      var config = {
        method: "get",
        url: `${API}transaction/vendor-transactions`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };
      axios(config)
        .then(function (response) {
         setTableRowsData(response?.data.data.tsxDetails);
           setFiltered(response?.data.data.tsxDetails);
          console.log(response.data.data.tsxDetails);
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
        color: "white",

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
      name: "Reciever Name",
      selector: "recieverName",
      sortable: true,
      style: {
        color: "#4E7AED",
      },
    },
    {
      name: "Reciever Name",
      selector: "recieverEmail",
      sortable: false,
      style: {
        color: "#4E7AED",
      },
    },
    {
      name: " Reciever Mobile",
      selector: "recieverNum",
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
      name: "Action",
      cell: (row) => [
        <button
          className="btn  btn-sm btn- text-white"
          style={{ backgroundColor: "#26A69A" }}
          onClick={() => {
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
                  style={{
                    background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
                    padding: "22px",
                    borderRadius: "10px",
                  }}
                >
                  # {rowData?.id} {rowData?.recieverName} &nbsp; : &nbsp;{" "}
                  {rowData?.recieverEmail}
                </h6>
                <div
                  className="col-md-11 m-auto my-3"
                  style={{ boxShadow: "0px 0px 15px rgb(204, 204, 204) " }}
                >
                  <table class="table">
                    <tbody>
                     
                      <tr>
                        <th scope="row">Created At</th>
                        <td>{rowData?.createdAt}</td>
                      </tr>
                      <tr>
                        <th scope="row">Amount</th>
                        <td>{rowData?.amount}</td>
                      </tr>
                      <tr>
                        <th scope="row">Message</th>
                        <td>{rowData?.message}</td>
                      </tr>
                      <tr>
                        <th scope="row">Transaction Type</th>
                        <td>{rowData?.transactionType}</td>
                      </tr>
                      <tr>
                        <th scope="row">Reciever Number</th>
                        <td>{rowData?.recieverNum}</td>
                      </tr>
                      <tr>
                        <th scope="row">Sender Number</th>
                        <td>{rowData?.senderNum}</td>
                      </tr>
                      <tr>
                        <th scope="row">Reciever Type</th>
                        <td>{rowData?.recieverType}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default Transaction;
