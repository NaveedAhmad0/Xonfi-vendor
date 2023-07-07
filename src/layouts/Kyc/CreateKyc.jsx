import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import React, { useEffect, useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import axios from "axios";
import API from "../../backend";
import './Createkyc.css'


function CreateKyc() {
  const id = localStorage.getItem("user_data");
  const token = localStorage.getItem("accessToken");


  const [numb, setNumb] = useState(1);
  const [idImage, setIdImage] = useState();
  const [passport, setPassport] = useState();
  const [profile, setProfile] = useState();

  const [showIdImage, setShowIdImage] = useState();
  const [showPassport, setShowPassport] = useState();
  const [showProfile, setShowProfile] = useState();

  const [checked,setChecked]= useState(false)


  const handleIdImage = (e) => {
    e.preventDefault();

    const data = { image: idImage };

    let config = {
      method: "post",
      url: `${API}Vendor/upload-id-proof/${id}`,
      headers: { "Content-Type": "multipart/form-data" },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setShowIdImage(response.data.image);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePassport = (e) => {
    e.preventDefault();

    const data = { image: passport };

    let config = {
      method: "post",
      url: `${API}Vendor/upload-passport-pic/${id}`,
      headers: { "Content-Type": "multipart/form-data" },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setShowPassport(response.data.image);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleProfile = (e) => {
    e.preventDefault();

    const data = { image: profile };

    let config = {
      method: "post",
      url: `${API}Vendor/upload-profile-pic/${id}`,
      headers: { "Content-Type": "multipart/form-data" },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setShowProfile(response.data.image);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAllImages =()=>{

    // e.preventDefault();

    const data = JSON.stringify({ passportImg:showPassport,
    idCard:showIdImage,
    profileImg: showProfile })

    console.log(token)

    let config = {
      method: "post",
      url: `${API}Vendor/create-vendor-kyc/${id}`,
      headers: { "Content-Type": "application/json",
      Authorization: `Bearer ${token}` },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if(response.data.kycStatus === 'uploaded'){
          setChecked(true)
          
        }

     
      })
      .catch((error) => {
        console.log(error);
      });


  }

  useEffect(()=>{handleAllImages()},[numb===4])

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />

        <Stepper activeStep={numb}>
          <Step label=" Step 1" onClick={() => setNumb(1)} />

          <Step
            label=" Step 2"
            onClick={() => {
              if (idImage?.name) {
                setNumb(2);
              }
            }}
          />
          <Step
            label=" Step 3"
            onClick={() => {
              if (passport?.name) {
                setNumb(3);
              }
            }}
          />
          <Step
            label=" Step 4"
            onClick={() => {
              if (profile?.name) {
                setNumb(4);
              }
            }}
          />
        </Stepper>
        <div className="container px-4">
          <div className="row bg-light rounded">
            <p className="text-center row-p">
              To create ID and verify your identity your need to do these 4
              steps
            </p>

            {numb === 1 ? (
              <div id="section1" className="row py-3">
                <div className="col-md-6 mx-3 rounded"  style={{ boxShadow: "0px 0px 15px rgb(204, 204, 204) " }}>
                <form
                  className="bg-light p-4 mt-4"
                  style={{ borderRadius: "10px" }}
                >
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Choose Id Proof
                    </label>
                    <input
                      type="file"
                      class="form-control mt-3"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={(e) => {
                        setIdImage(e.target.files[0]);
                      }}
                    />
                  </div>
                  <button className="btn btn-light text-success border border-success " onClick={handleIdImage}>
                    {" "}
                    Submit
                  </button>
                </form>
                  </div>
               

                <div className="col-md-4 m-auto text-center " >
                  <img className="img-fluid" src={showIdImage} alt=""></img>
                </div>
              </div>
            ) : numb === 2 ? (
              <div id="section1" className="row py-3">
                <div className="col-md-6 mx-3 rounded"  style={{ boxShadow: "0px 0px 15px rgb(204, 204, 204) " }}>
                <form
                  className="bg-light p-4 mt-4"
                  style={{ borderRadius: "10px" }}
                >
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Choose Passport Image
                    </label>
                    <input
                      type="file"
                      class="form-control mt-3"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={(e) => {
                        setPassport(e.target.files[0]);
                      }}
                    />
                  </div>
                  <button className="btn btn-light text-success border border-success" onClick={handlePassport}>
                  {" "}
                  Submit
                </button>
                </form>

               

                  </div>

                  <div className="col-md-4 m-auto text-center ">
                  <img className="img-fluid" src={showPassport} alt=""></img>
                </div>
             
              </div>
            ) : numb === 3 ? (
              <div id="section1" className="row py-3">
                <div className="col-md-6 mx-3 rounded"  style={{ boxShadow: "0px 0px 15px rgb(204, 204, 204) " }}>
                <form
                  className=" p-4 mt-4"
                  style={{ borderRadius: "10px" }}
                >
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Choose Profile Image
                    </label>
                    <input
                      type="file"
                      class="form-control mt-3"
                      id="exampleInputEmail1"
                      onChange={(e) => {
                        setProfile(e.target.files[0]);
                      }}
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <button className="btn btn-light text-danger border border-danger" onClick={handleProfile}>
                  {" "}
                  Submit
                </button>
                </form>
               
                  </div>
                  <div className="col-md-4 m-auto  text-center ">
                  <img className="img-fluid" src={showProfile} alt=""></img>
                </div>
              
              </div>
            ) : numb === 4 ? (
              <div className="col-md-6 m-auto rounded pt-3 mb-4"  style={{ boxShadow: "0px 0px 15px rgb(204, 204, 204) " }}>
              
             
             <ul style={{listStyleType:'none'}}>
               <li className="my-2">
               <i class="fa-solid fa-id-badge  p-3 text-light" style={{borderRadius:'10px',background:'#dcdcdc'}}></i>
                &nbsp; ID Proof 
                 <span style={{float:'right'}}>
                 <i class="fa-solid fa-circle-check me-3" style={{ color: checked === true ? 'green' : 'gray'}}></i>
                   </span>
               </li>
               <li className="my-2">
               <i class="fa-solid fa-passport  p-3 text-light" style={{borderRadius:'10px',background:'#dcdcdc'}}></i>
               &nbsp; Passport Image 
                 <span style={{float:'right'}}>
                 <i class="fa-solid fa-circle-check me-3"  style={{ color: checked === true ? 'green' : 'gray'}}></i>
                   </span>
               </li>
               <li className="my-2">
               <i class="fa-solid fa-user  p-3 text-light" style={{borderRadius:'10px',background:'#dcdcdc'}}></i>
               &nbsp;  Profile Image 
                 <span style={{float:'right'}}>
                 <i class="fa-solid fa-circle-check me-3"  style={{ color: checked === true ? 'green' : 'gray'}}></i>
                   </span>
               </li>
             </ul>

             {
              checked === true ?
              <p className="text-danger text-center  p-3" style={{fontSize:'13px'}}>
              Documents Upload Successfull... Wait For The Admin Approval
             </p>
             :
             <p className="text-danger text-center  p-3" style={{fontSize:'13px'}}>
              Document Upload Failed... Try Again
             </p>
             }

             
          
          
               

              </div>
            ) : null}

                      
          
          </div>
        </div>

      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3  ms-auto">
          {numb !== 1 ? (
          <button
            type="button"
            className="btn btn-light text-danger mt-2 me-2"
            onClick={() => {
              setNumb(numb - 1);
            }}
          >
            Previous
          </button>
        ) : null}

        {numb === 4 ? (

          


          <button type="button"  className="btn btn-light text-danger mt-2 ms-2" onclick={setNumb(1)}>
            Done
          </button>
        ) : (
          <button
            type="button"
            className="btn  btn-light text-danger mt-2 ms-2"
            onClick={() => {
              if(idImage )
              setNumb(2);
              if(passport)
              setNumb(3);
              if(profile)
              setNumb(4)

            }}
          >
            Next
          </button>
        )}

          </div>
       

        </div>
      </div>
       
      </DashboardLayout>
    </>
  );
}

export default CreateKyc;
