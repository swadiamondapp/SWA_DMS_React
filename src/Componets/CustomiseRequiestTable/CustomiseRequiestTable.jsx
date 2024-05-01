import React from "react";
import "../../Componets/CustomiseRequiestTable/CustomiseRequiestTable.css";
import PrintIcon from "../../assets/printIcon.png";
import EyeIcon from "../../assets/eyeIcon.png";
import ThreeDot from "../../assets/threeDots.png";

const data = [
  {
    date: "11/2/2023",
    customizationId: "SWACO4535",
    outlet: "Swa diamonds valanchery",
    mobileNumber: "+919995674444",
    productType: "Bangles",
  },
  {
    date: "11/2/2023",
    customizationId: "SWACO4535",
    outlet: "Swa diamonds valanchery",
    mobileNumber: "+919995674444",
    productType: "Bangles",
  },
  {
    date: "11/2/2023",
    customizationId: "SWACO4535",
    outlet: "Swa diamonds valanchery",
    mobileNumber: "+919995674444",
    productType: "Bangles",
  },
  {
    date: "11/2/2023",
    customizationId: "SWACO4535",
    outlet: "Swa diamonds valanchery",
    mobileNumber: "+919995674444",
    productType: "Bangles",
  },
  {
    date: "11/2/2023",
    customizationId: "SWACO4535",
    outlet: "Swa diamonds valanchery",
    mobileNumber: "+919995674444",
    productType: "Bangles",
  },
  {
    date: "11/2/2023",
    customizationId: "SWACO4535",
    outlet: "Swa diamonds valanchery",
    mobileNumber: "+919995674444",
    productType: "Bangles",
  },
];

const CustomizationTable = () => {
  return (
    <div className="Parant_CustomTable">
      <div className="TableContainer">
        <table>
          <thead>
            <tr style={{ backgroundColor: "#fff" }}>
              <th>Date</th>
              <th>Customization ID</th>
              <th>Outlet</th>
              <th>Mobile number</th>
              <th>Product type</th>
              <th
                style={{ borderBottom: "1px solid #ddd", borderRight: "none" }}
              >
                Action
              </th>
              <th
                style={{ borderBottom: "1px solid #ddd", borderRight: "none" }}
              ></th>
              <th
                style={{ borderBottom: "1px solid #ddd", borderRight: "none" }}
              ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
                }}
              >
                <td>{item.date}</td>
                <td>{item.customizationId}</td>
                <td>{item.outlet}</td>
                <td>{item.mobileNumber}</td>
                <td>{item.productType}</td>
                <td>
                  <button className="PrintButton_CT">
                    Print <img src={PrintIcon} />
                  </button>
                </td>
                <td>
                  <img src={EyeIcon} />
                </td>
                <td>
                  <img src={ThreeDot} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomizationTable;
