import React, { useEffect, useState } from "react";
import "./StatusSection.css";
import { productTracking } from "./ApiStepper";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  centralStatusTableData,
  whstatusTableData,
} from "../MastersSection/ApiMasters/ApiMasters";

const Stepper = ({ code }) => {
  const [productId, setProductId] = useState(code || "");
  const [steppretDta, setSteppretDta] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [wHdata, setwHdata] = useState();
  const [cHdata, setcHdata] = useState();

  const handleChange = (e) => {
    const value = e.target.value.toUpperCase();
    setProductId(value);
  };

  console.log("code", code);

  useEffect(() => {
    if (code) {
      handleTrackProduct(code);
    }
  }, [code]);

  const handleTrackProduct = async (productCode) => {
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
    { id: 7, title: "Central Hub status" },
    { id: 8, title: "Transferred to warehouse" },
    { id: 9, title: "Warehouse Received" },
    { id: 10, title: "Warehouse status" },
    { id: 11, title: "Work done", text: "Workdone" },
  ];

  const cadstatus = [
    { id: 1, title: "Pending" },
    { id: 2, title: "Rejected" },
    { id: 3, title: "Approved" },
  ];

  const status = steppretDta?.Tracking_data?.status_message || "";

  const status2 =
    Array.isArray(
      steppretDta?.Tracking_data?.status_details?.ch_status_history
    ) &&
    steppretDta?.Tracking_data?.status_details?.ch_status_history.length > 0
      ? steppretDta.Tracking_data.status_details.ch_status_history[0]
          ?.current_status
      : {};

  const warehouse =
    Array.isArray(
      steppretDta?.Tracking_data?.status_details?.warehouse_status_history
    ) &&
    steppretDta?.Tracking_data?.status_details?.warehouse_status_history
      .length > 0
      ? steppretDta.Tracking_data.status_details.warehouse_status_history[0]
          ?.current_status
      : {};

  const rederDate =
    steppretDta?.Tracking_data?.status_details?.render_uploaded_at || "";

  const FormatedRenderDate = rederDate
    ? new Date(rederDate).toLocaleDateString("en-US", {
        weekday: "long",
        // year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    : "";

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

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${String(hours).padStart(
      2,
      "0"
    )}:${minutes} ${ampm}`;

    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = formatDate(
    Array.isArray(
      steppretDta?.Tracking_data?.status_details?.ch_status_history
    ) &&
      steppretDta?.Tracking_data?.status_details?.ch_status_history.length > 0
      ? steppretDta.Tracking_data.status_details.ch_status_history[0]
          ?.updated_at
      : ""
  );

  const wareHouseDate = (isoString) => {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const WHDate = `${day}/${month}/${year}`;

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const WHTime = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;

    return { WHDate, WHTime };
  };

  const { WHDate, WHTime } = wareHouseDate(
    Array.isArray(
      steppretDta?.Tracking_data?.status_details?.warehouse_status_history
    ) &&
      steppretDta?.Tracking_data?.status_details?.warehouse_status_history
        .length > 0
      ? steppretDta.Tracking_data.status_details.warehouse_status_history[0]
          ?.updated_at
      : ""
  );

  const formatDateTrack = (isoString) => {
    if (!isoString) return "";

    const date = new Date(isoString);

    // Date Formatting
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    // Time Formatting
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Determine AM/PM
    const period = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Hour '0' should be '12'

    // Format hours
    const formattedHours = String(hours).padStart(2, "0");

    // Combine date and time
    return `${day}/${month}/${year} ${formattedHours}:${minutes} ${period}`;
  };

  const getFormattedDate = (stepId, dates) => {
    switch (stepId) {
      case 1:
        return formatDateTrack(dates?.design_pool);
      case 2:
        return formatDateTrack(dates?.selected);
      case 3:
        return formatDateTrack(dates?.folder_created);
      case 4:
        return formatDateTrack(dates?.cad_assigned);
      case 5:
        return formatDateTrack(dates?.cad_finished);
      case 6:
        return formatDateTrack(dates?.slotted);
      case 8:
        return formatDateTrack(dates?.transfer_to_warehouse);
        case 9:
          return formatDateTrack(dates?.warehouse_received);
      case 11:
        return formatDateTrack(dates?.workdone);
      default:
        return "";
    }
  };

  return (
    <>
      {code ? (
        <div className=""></div>
      ) : (
        <div className="">
          <div className="staus_search">
            {/* Search Input */}
            <input
              type="text"
              name="search"
              placeholder="Enter Product Id"
              value={productId}
              onChange={(e) => setProductId(e.target.value.toUpperCase())}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleTrackProduct(productId);
              }}
            />
            <button onClick={() => handleTrackProduct(productId)}>Track</button>
          </div>
          {error && (
            <span style={{ color: "red", fontSize: "10px" }}>{error}</span>
          )}
        </div>
      )}

      <div className="stepper-container" style={{ marginTop: "3%" }}>
        <h3 style={{ marginBottom: "50px" }}>
          {steppretDta?.Tracking_data?.product_ID || ""}
        </h3>
        <div className="stepper">
          {section.map((step, index) => {
            const isActive =
              section.findIndex((s) => s.title === status) >= index;
            const dates = steppretDta?.Tracking_data?.status_dates[0];
            return (
              <React.Fragment key={step.id}>
                <div
                  data-aos="fade-left"
                  className="step-wrapper"
                  onClick={() =>
                    (step.id === 7 && toggleDropdown()) ||
                    (step.id === 10 && toggleDropdown2()) ||
                    (step.id === 5 && toggleDropdown3())
                  }
                >
                  <div
                    className="step"
                    style={{
                      position: "relative",
                      backgroundColor: isActive ? "#00474d" : "inherit",
                      cursor:
                        step.id === 7 || step.id === 10 || step.id === 5
                          ? "pointer"
                          : "",
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
                        flexDirection: "column",
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
                      <span
                        style={{
                          color: "black",
                          fontSize: "13px",
                          textAlign: "center",
                          width: "90px",
                          // backgroundColor:"red"
                        }}
                      >
                        {getFormattedDate(step.id, dates)}
                      </span>
                    </div>
                    {/* {step.id === 7 && dropdownVisible && (
                      <div
                        className="dropdown-container"
                        style={{ marginTop: "70px",marginLeft:"10px" }}
                      >
                        {cHdata?.map((sub, index) => {
                          const chStatusHistory =
                            Array.isArray(
                              steppretDta?.Tracking_data?.status_details
                                ?.ch_status_history
                            ) &&
                            steppretDta?.Tracking_data?.status_details
                              ?.ch_status_history.length > 0
                              ? steppretDta.Tracking_data.status_details
                                  .ch_status_history[0]
                              : {};

                          const matchedStatus =
                            chStatusHistory?.previous_status?.find(
                              (status) => status.status === sub.name
                            );

                          const isCurrentStatus =
                            chStatusHistory?.current_status === sub.name;

                          const formattedDate = isCurrentStatus
                            ? new Date(
                                chStatusHistory?.updated_at
                              ).toLocaleDateString("en-US", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                // year: 'numeric',
                              })
                            : matchedStatus
                            ? new Date(
                                matchedStatus.changed_at
                              ).toLocaleDateString("en-US", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                // year: 'numeric',
                              })
                            : null;

                          const formattedTime = isCurrentStatus
                            ? new Date(
                                chStatusHistory?.updated_at
                              ).toLocaleTimeString()
                            : matchedStatus
                            ? new Date(
                                matchedStatus.changed_at
                              ).toLocaleTimeString()
                            : null;

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

                                  <div
                                    className="step-heading"
                                    style={{
                                      // width: "180px",
                                      width: "150px",
                                      paddingLeft: "10px",
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: "black",
                                        fontSize: "13px",
                                      }}
                                    >
                                      {sub.name}
                                    </span>
                                    <span style={{ fontSize: "10px" }}>
                                      {formattedDate} {formattedTime}
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
                    )} */}

                    {step.id === 7 && dropdownVisible && (
                      <div
                        className="dropdown-container"
                        style={{ marginTop: "70px", marginLeft: "10px" }}
                      >
                        {Array.isArray(
                          steppretDta?.Tracking_data?.status_details
                            ?.ch_status_history
                        ) &&
                        steppretDta.Tracking_data.status_details
                          .ch_status_history.length > 0 ? (
                          steppretDta.Tracking_data.status_details.ch_status_history.map(
                            (chStatusHistory, index) => {
                              const isCurrentStatus =
                                chStatusHistory?.current_status;
                              const formattedDate = new Date(
                                chStatusHistory?.updated_at
                              ).toLocaleDateString("en-US", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                              });
                              const formattedTime = new Date(
                                chStatusHistory?.updated_at
                              ).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              });

                              return (
                                <div key={index} className="vertical-stepper">
                                  <div className="vertical-step">
                                    <span
                                      className="vertical-step-number"
                                      style={{
                                        color: isCurrentStatus
                                          ? "white"
                                          : "#00474d",
                                        backgroundColor: isCurrentStatus
                                          ? "#00474d"
                                          : "inherit",
                                      }}
                                    >
                                      &#10003;
                                    </span>
                                    <div
                                      className="step-heading"
                                      style={{
                                        width: "150px",
                                        paddingLeft: "10px",
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <span
                                        style={{
                                          color: isCurrentStatus
                                            ? "black"
                                            : "#888",
                                          fontSize: "13px",
                                        }}
                                      >
                                        {isCurrentStatus
                                          ? isCurrentStatus
                                          : "No Central Hub Status"}
                                      </span>
                                      {isCurrentStatus && (
                                        <span style={{ fontSize: "10px" }}>
                                          {formattedDate} {formattedTime}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  {/* No connector needed if only one status */}
                                </div>
                              );
                            }
                          )
                        ) : (
                          <div className="vertical-stepper">
                            <div className="vertical-step">
                              <span
                                className="vertical-step-number"
                                style={{ color: "#ddd" }}
                              >
                                &#10003;
                              </span>
                              <div
                                className="step-heading"
                                style={{
                                  width: "150px",
                                  paddingLeft: "10px",
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <span
                                  style={{ color: "#888", fontSize: "13px" }}
                                >
                                  No Central Hub Status
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* {step.id === 10 && dropdownVisible2 && (
                      <div
                        className="dropdown-container"
                        style={{ marginTop: "70px" }}
                      >
                        {wHdata?.map((sub, index) => {
                          const warehouseStatusHistory =
                            Array.isArray(
                              steppretDta?.Tracking_data?.status_details
                                ?.warehouse_status_history
                            ) &&
                            steppretDta?.Tracking_data?.status_details
                              ?.warehouse_status_history.length > 0
                              ? steppretDta.Tracking_data.status_details
                                  .warehouse_status_history[0]
                              : {};

                          const matchedStatus =
                            warehouseStatusHistory?.previous_status?.find(
                              (status) => status.status === sub.name
                            );

                          const isCurrentStatus =
                            warehouseStatusHistory?.current_status === sub.name;

                          const WHDate = isCurrentStatus
                            ? new Date(
                                warehouseStatusHistory?.updated_at
                              ).toLocaleDateString("en-US", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                // year: 'numeric',
                              })
                            : matchedStatus
                            ? new Date(
                                matchedStatus.changed_at
                              ).toLocaleDateString("en-US", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                // year: 'numeric',
                              })
                            : null;

                          const WHTime = isCurrentStatus
                            ? new Date(
                                warehouseStatusHistory?.updated_at
                              ).toLocaleTimeString()
                            : matchedStatus
                            ? new Date(
                                matchedStatus.changed_at
                              ).toLocaleTimeString()
                            : null;

                          const Active =
                            wHdata.findIndex((s) => s.name === warehouse) >=
                            index;

                          return (
                            <div className="vertical-stepper" key={index}>
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

                                  <div
                                    className="step-heading"
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      width: "150px",
                                      // background:"green",
                                      paddingLeft: "10px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: "black",
                                        fontSize: "13px",
                                      }}
                                    >
                                      {sub.name}
                                    </span>
                                    {WHDate && (
                                      <span
                                        style={{
                                          fontSize: "10px",
                                          width: "auto",
                                        }}
                                      >
                                        {WHDate} {WHTime}
                                      </span>
                                    )}
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
                    )} */}

                    {step.id === 10 && dropdownVisible2 && (
                      <div
                        className="dropdown-container"
                        style={{ marginTop: "70px" }}
                      >
                        {Array.isArray(
                          steppretDta?.Tracking_data?.status_details
                            ?.warehouse_status_history
                        ) &&
                        steppretDta.Tracking_data.status_details
                          .warehouse_status_history.length > 0 ? (
                          <div className="vertical-stepper">
                            {steppretDta.Tracking_data.status_details.warehouse_status_history.map(
                              (warehouseStatusHistory, index) => {
                                const isCurrentStatus =
                                  warehouseStatusHistory?.current_status;
                                const formattedDate = new Date(
                                  warehouseStatusHistory?.updated_at
                                ).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  day: "numeric",
                                  month: "long",
                                });
                                const formattedTime = new Date(
                                  warehouseStatusHistory?.updated_at
                                ).toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                });
                                

                                return (
                                  <div key={index} className="vertical-step">
                                    <span
                                      className="vertical-step-number"
                                      style={{
                                        color: isCurrentStatus
                                          ? "white"
                                          : "#00474d",
                                        backgroundColor: isCurrentStatus
                                          ? "#00474d"
                                          : "inherit",
                                      }}
                                    >
                                      &#10003;
                                    </span>
                                    <div
                                      className="step-heading"
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "150px",
                                        paddingLeft: "10px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          color: isCurrentStatus
                                            ? "black"
                                            : "#888",
                                          fontSize: "13px",
                                        }}
                                      >
                                        {isCurrentStatus ||
                                          "No Warehouse Status"}
                                      </span>
                                      {isCurrentStatus && (
                                        <span style={{ fontSize: "10px" }}>
                                          {formattedDate} {formattedTime}
                                        </span>
                                      )}
                                    </div>
                                    {/* No connector needed if only one status */}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        ) : (
                          <div className="vertical-stepper">
                            <div className="vertical-step">
                              <span
                                className="vertical-step-number"
                                style={{ color: "#ddd" }}
                              >
                                &#10003;
                              </span>
                              <div
                                className="step-heading"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  width: "150px",
                                  paddingLeft: "10px",
                                }}
                              >
                                <span
                                  style={{ color: "#888", fontSize: "13px" }}
                                >
                                  No Warehouse Status
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {step.id === 5 && dropdownVisible3 && (
                      <>
                        {/* <div
                          className="dropdown-container"
                          style={{
                            marginTop: "70px",
                            height: "50px",
                            width: "210px",
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
                                style={{
                                  width: "160px",
                                  display: "flex",
                                  flexDirection: "column",
                                  paddingLeft: "6px",
                                }}
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
                                <span
                                  style={{ fontSize: "11px", marginTop: "5px" }}
                                >
                                  {FormatedRenderDate}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div> */}

                        <div
                          className="dropdown-container"
                          style={{ marginTop: "70px" }}
                        >
                          {cadstatus?.map((sub, index) => {
                            // const warehouseStatusHistory =
                            //   Array.isArray(
                            //     steppretDta?.Tracking_data?.status_details
                            //       ?.warehouse_status_history
                            //   ) &&
                            //   steppretDta?.Tracking_data?.status_details
                            //     ?.warehouse_status_history.length > 0
                            //     ? steppretDta.Tracking_data.status_details
                            //         .warehouse_status_history[0]
                            //     : {};

                            // const matchedStatus =
                            //   warehouseStatusHistory?.previous_status?.find(
                            //     (status) => status.status === sub.name
                            //   );

                            // const isCurrentStatus =
                            //   warehouseStatusHistory?.current_status === sub.name;

                            // const WHDate = isCurrentStatus
                            //   ? new Date(
                            //       warehouseStatusHistory?.updated_at
                            //     ).toLocaleDateString("en-US", {
                            //       weekday: "long",
                            //       day: "numeric",
                            //       month: "long",
                            //       // year: 'numeric',
                            //     })
                            //   : matchedStatus
                            //   ? new Date(
                            //       matchedStatus.changed_at
                            //     ).toLocaleDateString("en-US", {
                            //       weekday: "long",
                            //       day: "numeric",
                            //       month: "long",
                            //       // year: 'numeric',
                            //     })
                            //   : null;

                            // const WHTime = isCurrentStatus
                            //   ? new Date(
                            //       warehouseStatusHistory?.updated_at
                            //     ).toLocaleTimeString()
                            //   : matchedStatus
                            //   ? new Date(
                            //       matchedStatus.changed_at
                            //     ).toLocaleTimeString()
                            //   : null;

                            const Active =
                              wHdata.findIndex((s) => s.name === warehouse) >=
                              index;

                            return (
                              <div className="vertical-stepper" key={index}>
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

                                    <div
                                      className="step-heading"
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "150px",
                                        // background:"green",
                                        paddingLeft: "10px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          color: "black",
                                          fontSize: "13px",
                                        }}
                                      >
                                        {sub.title}
                                      </span>
                                      {/* {WHDate && (
                                      <span
                                        style={{
                                          fontSize: "10px",
                                          width: "auto",
                                        }}
                                      >
                                        {WHDate} {WHTime}
                                      </span>
                                    )} */}
                                    </div>
                                  </div>
                                  {index < cadstatus.length - 1 && (
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
