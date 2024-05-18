import React, { useState, useEffect, useRef } from "react";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import ring from "../../../assets/ring.png";
import { GoDownload } from "react-icons/go";
import CentalHub from "../../CentalHub/CentalHub";
import { useLocation } from "react-router-dom";
import { assigned_data_by_id } from "../Api";
import { saveAs } from "file-saver"; 

const CadAssignmentCard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramId = queryParams.get("id");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timers, setTimers] = useState({});
  const [statuses, setStatuses] = useState({});
  const [isLoading,setIsLoading] = useState(false)
  const [isAnyTimerRunning, setIsAnyTimerRunning] = useState(false);
  const [finishedTimes, setFinishedTimes] = useState({});
  const [currentRunningTimerId, setCurrentRunningTimerId] = useState(null);
  const [folderDetailsById,setFolderDetailsById] = useState([])
  const intervalRef = useRef(null);



  const card = [
    {
      id: 1,
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 June 2023",
    },
    {
      id: 2,
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 June 2023",
    },
    {
      id: 3,
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 June 2023",
    },
    {
      id: 4,
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 June 2023",
    },
  ];
  useEffect(() => {
    assigned_data_by_id(setIsLoading, setFolderDetailsById, paramId);
  }, [paramId]);

  console.log(folderDetailsById,"folderDetalsbyid")
  console.log(folderDetailsById[0]?.assignment_items,"paramId")

  useEffect(() => {
    const initialStatuses = {};
    card.forEach((item) => {
      initialStatuses[item.id] = "Notstarted";
    });
    setStatuses(initialStatuses);

    return () => clearInterval(intervalRef.current); // Clear interval on component unmount
  }, []);



  // useEffect(() => {
  //   const initialStatuses = {};
  //   card.forEach((item) => {
  //     initialStatuses[item.id] = "Notstarted";
  //   });
  //   setStatuses(initialStatuses);
  // }, []);

  // useEffect(() => {
  //   return () => clearInterval(intervalRef.current); // Clear interval on component unmount
  // }, []);

  const formatTime = (totalSeconds) => {
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${days} d: ${hours} h: ${minutes} m: ${seconds} s`;
  };

  const handleDownloadClick = async (id,imageUrl) => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimers((prevTimers) => {
        const newTimers = { ...prevTimers };
        if (newTimers[id] && newTimers[id].running) {
          newTimers[id].time += 1;
        }
        return newTimers;
      });
    }, 1000);

    setTimers((prevTimers) => {
      const newTimers = { ...prevTimers };

      for (const timerId in newTimers) {
        if (newTimers[timerId].running && timerId !== id.toString()) {
          newTimers[timerId].running = false;
        }
      }

      if (!newTimers[id] || !newTimers[id].running) {
        newTimers[id] = { running: true, time: newTimers[id]?.time || 0 };
        setCurrentRunningTimerId(id); // Set the currently running timer ID
      }

      return newTimers;

      
    });

    setIsAnyTimerRunning(true);
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: "Ongoing",
    }));

    try {
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = imageUrl.split('/').pop(); // Set the filename for download
      link.target = '_blank';
  
      // Append the anchor element to the document body
      document.body.appendChild(link);
  
      // Simulate a click on the anchor element to trigger download
      link.click();
  
      // Remove the anchor element from the document body
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }

 
 
   
  
    
  };

  const handleStatusChange = (id, status) => {
    setStatuses((prevStatuses) => ({ ...prevStatuses, [id]: status }));
    if (status === "transfer" || status === "finished") {
      clearInterval(intervalRef.current); // Clear interval when status changes
      setIsAnyTimerRunning(false);
      setCurrentRunningTimerId(null);
      setTimers((prevTimers) => {
        const currentTime = timers[id]?.time || 0;
        setFinishedTimes((prevFinishedTimes) => ({
          ...prevFinishedTimes,
          [id]: currentTime,
        }));
        const newTimers = { ...prevTimers };
        if (newTimers[id]) {
          newTimers[id].running = false;
          newTimers[id].time = 0;
        }
        return newTimers;
      });
    }
    // if (status === "finished") {
    //   clearInterval(intervalRef.current); // Clear interval when status changes

    //   setTimers((prevTimers) => {
    //     const currentTime = timers[id]?.time || 0;
    //     setFinishedTimes((prevFinishedTimes) => ({
    //       ...prevFinishedTimes,
    //       [id]: currentTime,
    //     }));
    //     const newTimers = { ...prevTimers };
    //     if (newTimers[id]) {
    //       newTimers[id].running = false;
    //       newTimers[id].time = 0;
    //     }
    //     return newTimers;
    //   });
    // }
  };
let cadDesign = folderDetailsById[0]?.assignment_items;
console.log(cadDesign,'cadd')
  return (
    <div className="ParentCad">
      <div className="Design_FileUpload" onClick={() => setIsModalOpen(true)}>
        <div>
          <p className="D__fileUpload">Submit design</p>
          <p className="D__fileUpload2">
            Upload your finished file as png and 3.dm file format
          </p>
        </div>
        <div className="File____uploadbtn">
          <button>
            Upload File <LiaCloudUploadAltSolid style={{ fontSize: "22px" }} />
          </button>
        </div>

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>
      <div className="CadAssignmentCard">
        <div className="Card_Design_Parent">
          {cadDesign?.map((item) => (
            <div className="New_Design_card" key={item.id}>
              <div className="Card_Details">
                <div className="Card_img" style={{ borderBottom: "0px" }}>
                  <img src={item.image} alt="" />
                </div>
                <div className="Card_Details_Inner_cad_Hub">
                  <h3>ID : {item.design_code}</h3>
                  <p>POSTED ON:</p>

                  <select
                    style={{ padding: "5px 10px", margin: "10px 10px" }}
                    name="status"
                    id="status"
                    value={statuses[item.id] || "Notstarted"}
                    onChange={(e) =>
                      handleStatusChange(item.id, e.target.value)
                    }
                    disabled={
                      (isAnyTimerRunning && !timers[item.id]?.running) ||
                      (currentRunningTimerId !== null &&
                        currentRunningTimerId !== item.id)
                    }
                  >
                    {isAnyTimerRunning ? (
                      <></>
                    ) : (
                      <>
                        <option value="Notstarted">Not Started</option>
                      </>
                    )}
                    <option value="Ongoing">Ongoing</option>
                    <option value="finished">Finished</option>
                    <option value="transfer">Transfer</option>
                  </select>

                  <button
                    className="Download_btn_hub"
                    onClick={() => handleDownloadClick(item.id,item.image)}
                    disabled={
                      (isAnyTimerRunning && !timers[item.id]?.running) ||
                      (currentRunningTimerId !== null &&
                        currentRunningTimerId !== item.id)
                    }
                  >
                    {timers[item.id]?.running ? (
                      <span className="timerFeild">
                        {formatTime(timers[item.id].time)}
                      </span>
                    ) : (
                      <>
                        DOWNLOAD
                        <GoDownload />
                      </>
                    )}
              
                  </button>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CentalHub open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default CadAssignmentCard;
