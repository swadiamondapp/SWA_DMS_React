import React, { useEffect, useState } from "react";
import "./centraldashboard.css";
import ring from "../../../assets/ring.png";
import { GoDownload } from "react-icons/go";
import { IoPrintOutline } from "react-icons/io5";
import {
  listFoldersCentralHub,
  list_all_designs_from_cad,
} from "../../../Pages/CENTRAL HUB/Api";
import folderimg from "../../../assets/folder.png";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const CentralDashboard = ({
  sidebarExpanded,
  Folders,
  isLoading,
  searchListId,
}) => {
  const navigate = useNavigate();
  const [Data, setData] = useState([]);

  const card = [
    {
      product: "ID : SWAD3456",
    },
    {
      product: "ID : SWAD3456",
    },
  ];

  // useEffect(() => {
  //   // list_all_designs_from_cad(setIsLoading, setData);
  //   listFoldersCentralHub(setIsLoading, setFolders);
  // }, []);
  const handleFolderNaviate = (item) => {
    navigate(`/centralfolderdetails/${item.id}`, {
      state: { assignmentFolderName: item.name },
    });
  };
  console.log(Folders, "listaksjdfks====>");
  // return (
  //   <div
  //     className="parentCentral"
  //     style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
  //   >
  //     <div className="CadAssignmentCard">
  //       <div className="folderCard_parent">
  //         {/* {isLoading && (
  //                 <div
  //                   style={{
  //                     display: "flex",
  //                     justifyContent: "center",
  //                     alignItems: "center",
  //                   }}
  //                 >
  //                   <CircularProgress
  //                     // filter={filter}
  //                     // setFilter={setFilter}
  //                     size={50}
  //                     sx={{
  //                       color: "#126e72",
  //                       padding: "8px 10px",
  //                       width: "35px",
  //                     }}
  //                   />
  //                 </div>
  //               )} */}

  //         {isLoading ? (
  //           <div
  //             style={{
  //               display: "flex",
  //               justifyContent: "center",
  //               alignItems: "center",
  //               width: "100%",
  //               height: "300px",
  //             }}
  //           >
  //             <CircularProgress
  //               // filter={filter}
  //               // setFilter={setFilter}
  //               size={50}
  //               sx={{
  //                 color: "#126e72",
  //                 padding: "8px 10px",
  //                 width: "35px",
  //               }}
  //             />
  //           </div>
  //         ) : (
  //           <>
  //             {Folders.filter((x) => x.name.includes(searchListId)).map(
  //               (item) => (
  //                 <div
  //                   className="folder__card"
  //                   key={item.id}
  //                   onClick={() => handleFolderNaviate(item)}
  //                 >
  //                   {/* <Link to={`/centralfolderdetails/${item.id}`}> */}
  //                   <img src={folderimg} alt="" />
  //                   {/* </Link> */}
  //                   <p>{item.name}</p>
  //                 </div>
  //               )
  //             )}

  //             {isLoading !== true && Folders && Folders.length === 0 && (
  //               <div
  //                 style={{
  //                   display: "flex",
  //                   justifyContent: "center",
  //                   alignItems: "center",
  //                   width: "100%",
  //                   height: "300px",
  //                 }}
  //               >
  //                 <span style={{ marginTop: "100px" }}>No Data Found</span>
  //               </div>
  //             )}
  //           </>
  //         )}
  //       </div>

  //       {/* <div className="Card_Design_Parent">
  //         {Data.map((item) => (
  //           <div className="New_Design_card">
  //             <div className="Card_Details">
  //               <div className="Card_img" style={{ borderBottom: "0px" }}>
  //                 <img src={item.file1} alt="" />
  //               </div>
  //               <div className="Card_Details_Inner_cad_Hub">
  //                 <p className="Hub_head">ID : {item.designcode}</p>

  //                 <button className="Download_btn_hub">
  //                   DOWNLOAD
  //                   <GoDownload />
  //                 </button>
  //                 <button className="Prinit_btn_hub">
  //                   Print
  //                   <IoPrintOutline />
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div> */}
  //     </div>
  //   </div>
  // );


  return (
    <div
      className="parentCentral"
      style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
    >
      <div className="CadAssignmentCard">
        <div className="folderCard_parent">
          { Folders.length === 0 && isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "400px",
              }}
            >
              <CircularProgress
                size={50}
                sx={{
                  color: "#126e72",
                  padding: "8px 10px",
                  width: "35px",
                }}
              />
            </div>
          ) : (
            <>
              { Folders.filter((x) => x.name.includes(searchListId)).length > 0 ? (
                Folders.filter((x) => x.name.includes(searchListId)).map(
                  (item) => (
                    <div
                      className="folder__card"
                      key={item.id}
                      onClick={() => handleFolderNaviate(item)}
                    >
                      <img src={folderimg} alt="" />
                      <p>{item.name}</p>
                    </div>
                  )
                )
              ) :  !isLoading && Folders.length === 0 &&  (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "300px",
                  }}
                >
                  <span style={{ marginTop: "100px" }}>No Data Found</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CentralDashboard;
