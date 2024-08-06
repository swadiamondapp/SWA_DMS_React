import React, { useEffect, useState } from "react";
import "./StatusSection.css";
import { productTracking } from "./ApiStepper";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  centralStatusTableData,
  whstatusTableData,
} from "../MastersSection/ApiMasters/ApiMasters";

const Stepper = () => {
  const [productId, setProductId] = useState("");
  const [steppretDta, setSteppretDta] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [wHdata, setwHdata] = useState();
  const [cHdata, setcHdata] = useState();

  const handleChange = (e) => {
    const value = e.target.value.toUpperCase();
    setProductId(value);
  };

  const handleTrackProduct = async () => {
    if (productId === "") {
      setError("Enter Product Id");
      setTimeout(() => {
        setError("");
      }, 1600);
      return;
    }
    try {
      await productTracking(setIsLoading, productId, setSteppretDta, setError);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleTrackProduct();
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  const section = [
    { id: 1, title: "Design pool" },
    { id: 2, title: "Selected" },
    { id: 3, title: "Folder Created" },
    { id: 4, title: "CAD assigned" },
    { id: 5, title: "CAD finished" },
    { id: 6, title: "Slotted" },
    { id: 7, title: "CentralHub" },
    { id: 8, title: "Transferred to warehouse" },
    { id: 9, title: "Warehouse" },
    { id: 10, title: "Work done", text: "Workdone" },
  ];

  const status = steppretDta?.Tracking_data?.status_message || "";

  //   const subStatus = [
  //     { id: 1, title: "Status1" },
  //     { id: 2, title: "Status2" },
  //     { id: 3, title: "Status3" },
  //   ];
  const status2 = steppretDta?.Tracking_data?.status_details?.status || "";

  //   const WHStatus = [
  //     { id: 1, title: "Status1" },
  //     { id: 2, title: "Status2" },
  //     { id: 3, title: "Status3" },
  //   ];
  const warehouse = steppretDta?.Tracking_data?.status_details?.wh_status || "";
  const rederDate =
    steppretDta?.Tracking_data?.status_details?.render_uploaded_at || "";

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownVisible2, setDropdownVisible2] = useState(false);
  const [dropdownVisible3, setDropdownVisible3] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const toggleDropdown2 = () => {
    setDropdownVisible2(!dropdownVisible2);
  };
  const toggleDropdown3 = () => {
    setDropdownVisible3(!dropdownVisible3);
  };

  useEffect(() => {
    whstatusTableData(setwHdata, setIsLoading);
  }, []);

  useEffect(() => {
    centralStatusTableData(setcHdata, setIsLoading);
  }, []);

  console.log("productId", productId);
  console.log("steppretDta", steppretDta);
  console.log("wHdata", wHdata);
  console.log("cHdata", cHdata);
  console.log("rederDate", rederDate);

  return (
    <>
      <div className="">
        <div className="staus_search">
          <input
            type="text"
            name="search"
            placeholder="Enter Product Id"
            value={productId}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleTrackProduct}>Track</button>
        </div>
        {error && (
          <span style={{ color: "red", fontSize: "10px" }}>{error}</span>
        )}
      </div>

      <div className="stepper-container" style={{ marginTop: "3%" }}>
        <h3 style={{ marginBottom: "50px" }}>
          {steppretDta?.Tracking_data?.product_ID || ""}
        </h3>
        <div className="stepper">
          {section.map((step, index) => {
            const isActive =
              section.findIndex((s) => s.title === status) >= index;
            return (
              <React.Fragment key={step.id}>
                <div
                  data-aos="fade-left"
                  className="step-wrapper"
                  onClick={() =>
                    (step.id === 7 && toggleDropdown()) ||
                    (step.id === 9 && toggleDropdown2())(
                      step.id === 5 && toggleDropdown3()
                    )
                  }
                >
                  <div
                    className="step"
                    style={{
                      position: "relative",
                      backgroundColor: isActive ? "#00474d" : "inherit",
                    }}
                  >
                    {isActive ? (
                      <span style={{ color: "white" }}>&#10003;</span>
                    ) : (
                      <span className="step-number">{step.id}</span>
                    )}

                    <div
                      className="step-heading"
                      style={{
                        width: "100px",
                        position: "absolute",
                        top: "45px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {step.title === "Transfered to WH" ? (
                        <span
                          style={{
                            color: "black",
                            fontSize: "13px",
                            textAlign: "center",
                          }}
                        >
                          Transfered to Warhouse
                        </span>
                      ) : (
                        <span
                          style={{
                            color: "black",
                            fontSize: "13px",
                            textAlign: "center",
                          }}
                        >
                          {step.title}
                        </span>
                      )}
                    </div>
                    {step.id === 7 && dropdownVisible && (
                      <div
                        className="dropdown-container"
                        style={{ marginTop: "30px" }}
                      >
                        {cHdata?.map((sub, index) => {
                          const Active =
                            cHdata.findIndex((s) => s.name === status2) >=
                            index;
                          return (
                            <div className="vertical-stepper">
                              <React.Fragment>
                                <div className="vertical-step">
                                  {Active ? (
                                    <span
                                      className={`vertical-step-number ${
                                        Active ? "vertical-step-complete" : ""
                                      } `}
                                      style={{ color: Active ? "white" : "" }}
                                    >
                                      &#10003;
                                    </span>
                                  ) : (
                                    <span className="vertical-step-number">
                                      &#10003;
                                    </span>
                                  )}

                                  <div className="step-heading">
                                    <span
                                      style={{
                                        color: "black",
                                        fontSize: "13px",
                                      }}
                                    >
                                      {sub.name}
                                    </span>
                                  </div>
                                </div>
                                {index < cHdata.length - 1 && (
                                  <div
                                    className="vertical-connector"
                                    style={{
                                      backgroundColor: Active
                                        ? "#002427"
                                        : "#ddd",
                                    }}
                                  />
                                )}
                              </React.Fragment>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {step.id === 9 && dropdownVisible2 && (
                      <div
                        className="dropdown-container"
                        style={{ marginTop: "30px" }}
                      >
                        {wHdata?.map((sub, index) => {
                          const Active =
                            wHdata.findIndex((s) => s.name === warehouse) >=
                            index;
                          return (
                            <div className="vertical-stepper">
                              <React.Fragment>
                                <div className="vertical-step">
                                  {Active ? (
                                    <span
                                      className={`vertical-step-number ${
                                        Active ? "vertical-step-complete" : ""
                                      } `}
                                      style={{ color: Active ? "white" : "" }}
                                    >
                                      &#10003;
                                    </span>
                                  ) : (
                                    <span className="vertical-step-number">
                                      &#10003;
                                    </span>
                                  )}

                                  <div className="step-heading">
                                    <span
                                      style={{
                                        color: "black",
                                        fontSize: "13px",
                                      }}
                                    >
                                      {sub.name}
                                    </span>
                                  </div>
                                </div>
                                {index < wHdata.length - 1 && (
                                  <div
                                    className="vertical-connector"
                                    style={{
                                      backgroundColor: Active
                                        ? "#002427"
                                        : "#ddd",
                                    }}
                                  />
                                )}
                              </React.Fragment>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {step.id === 5 && dropdownVisible3 && (
                      <>
                        <div
                          className="dropdown-container"
                          style={{
                            marginTop: "30px",
                            height: "50px",
                            width: "250px",
                          }}
                        >
                          <div className="vertical-stepper">
                            <div className="vertical-step">
                              {rederDate ? (
                                <span
                                  className={`vertical-step-number ${
                                    rederDate ? "vertical-step-complete" : ""
                                  } `}
                                  style={{ color: rederDate ? "white" : "" }}
                                >
                                  &#10003;
                                </span>
                              ) : (
                                <span className="vertical-step-number">
                                  &#10003;
                                </span>
                              )}

                              <div
                                style={{ width: "180px",display:"flex",flexDirection:"column" }}
                                className="step-heading"
                              >
                                <span
                                  style={{
                                    color: "black",
                                    width: "190px",
                                    fontSize: "13px",
                                    // background:"red"
                                  }}
                                >
                                  Rendering Finished Projects
                                </span>
                                <span style={{fontSize:"12px",marginTop:"5px"}}>{rederDate}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {index < section.length - 1 && (
                  <div
                    data-aos="fade-left"
                    className="connector"
                    style={{
                      backgroundColor: isActive ? "#00474d" : "#ddd",
                      height: "3px",
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Stepper;
