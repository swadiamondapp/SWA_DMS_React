import React, { useEffect, useState } from "react";
import "./StatusSection.css";
import { productTracking } from "./ApiStepper";
import AOS from "aos";
import "aos/dist/aos.css";

const Stepper = () => {
  const [productId, setProductId] = useState("");
  const [steppretDta, setSteppretDta] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    { id: 1, title: "Designer Upload" },
    { id: 2, title: "Admin" },
    { id: 3, title: "Designer" },
    { id: 4, title: "CAD" },
    { id: 5, title: "Central Hub" },
    { id: 6, title: "Warehouse" },
  ];
  const status = steppretDta?.Tracking_data?.status || "";

  const subStatus = [
    { id: 1, title: "Status1" },
    { id: 2, title: "Status2" },
    { id: 3, title: "Status3" },
  ];
  const status2 = "";

  const WHStatus = [
    { id: 1, title: "Status1" },
    { id: 2, title: "Status2" },
    { id: 3, title: "Status3" },
  ];
  const warehouse = "Status3";

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownVisible2, setDropdownVisible2] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const toggleDropdown2 = () => {
    setDropdownVisible2(!dropdownVisible2);
  };

  console.log("productId", productId);
  console.log("steppretDta", steppretDta);

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
        {error && <span style={{color:"red",fontSize:"10px"}}>{error}</span>}
      </div>

      <div className="stepper-container" style={{ marginTop: "3%" }}>
       <h3 style={{marginBottom:"50px"}}>{steppretDta?.Tracking_data?.product_ID || ""}</h3>
        <div className="stepper" style={{ marginLeft: "40px" }}>
          {section.map((step, index) => {
            const isActive =
              section.findIndex((s) => s.title === status) >= index;
            return (
              <React.Fragment key={step.id}>
                <div
                 data-aos="fade-left"
                  className="step-wrapper"
                  onClick={() =>
                    (step.id === 5 && toggleDropdown()) ||
                    (step.id === 6 && toggleDropdown2())
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
                      <span style={{ color: "black", fontSize: "13px" }}>
                        {step.title}
                      </span>
                    </div>
                    {step.id === 5 && dropdownVisible && (
                      <div
                        className="dropdown-container"
                        style={{ marginTop: "30px" }}
                      >
                        {subStatus.map((sub, index) => {
                          const Active =
                            subStatus.findIndex((s) => s.title === status2) >=
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
                                      {sub.id}
                                    </span>
                                  )}

                                  <div className="step-heading">
                                    <span
                                      style={{
                                        color: "black",
                                        fontSize: "13px",
                                      }}
                                    >
                                      {sub.title}
                                    </span>
                                  </div>
                                </div>
                                {index < subStatus.length - 1 && (
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
                    {step.id === 6 && dropdownVisible2 && (
                      <div
                        className="dropdown-container"
                        style={{ marginTop: "30px" }}
                      >
                        {WHStatus.map((sub, index) => {
                          const Active =
                            subStatus.findIndex((s) => s.title === warehouse) >=
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
                                      {sub.id}
                                    </span>
                                  )}

                                  <div className="step-heading">
                                    <span
                                      style={{
                                        color: "black",
                                        fontSize: "13px",
                                      }}
                                    >
                                      {sub.title}
                                    </span>
                                  </div>
                                </div>
                                {index < subStatus.length - 1 && (
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
                  </div>
                </div>
                {index < section.length - 1 && (
                  <div
                   data-aos="fade-left"
                    className="connector"
                    style={{
                      backgroundColor: isActive ? "#00474d" : "#ddd",
                      height:"3px"
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
