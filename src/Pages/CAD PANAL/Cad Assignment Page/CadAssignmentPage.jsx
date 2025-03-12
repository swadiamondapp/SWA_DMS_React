import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import CadAssignment from "../../../Componets/CAD/Cad Assignment Panal/CadAssignment";
import {
  getDesignList,
  designListStatusChange,
  uploadFile,
  cadLogut,
} from "../../../Componets/CAD/Api";
import SuccessModal from "../../../Componets/SuccessModal/SuccessModal";
import CentalHub from "../../../Componets/CentalHub/CentalHub";
import { ContextTime } from "../TimerContext";

const CadAssignmentPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState("");
  const [designList, setDesignList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timer, setTimer] = useState("");
  const [productCode, setProductCode] = useState("");
  const [errorss, setErrors] = useState();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [itemId, setItemId] = useState("");
  const [SearchWithName, setSearchWithName] = useState("");

  const [images, setImages] = useState({
    normal: null,
    threeD: null,
  });

  const { cadTime, setCadTime } = useContext(ContextTime);
  setCadTime(timer);

  useEffect(() => {
    getDesignList(setIsLoading, setDesignList,SearchWithName);
  }, [SearchWithName]);

  // useEffect(() => {
  //   const ongoingItem = designList.find(
  //     (item) => item.timer_status === "on-going"
  //   );
  //   if (ongoingItem) {
  //     const interval = setInterval(() => {
  //       const now = new Date().getTime();
  //       const startTime = localStorage.getItem(
  //         `start_time_${ongoingItem.item_id}`
  //       );
  //       const elapsedTime = now - new Date(startTime).getTime();
  //       const formattedTime = formatTime(elapsedTime);
  //       setDesignList((prevList) =>
  //         prevList.map((item) =>
  //           item.item_id === ongoingItem.item_id
  //             ? { ...item, timer_value: formattedTime }
  //             : item
  //         )
  //       );
  //       console.log(`Timer for item ${ongoingItem.item_id}: ${formattedTime}`);
  //       setProductCode(ongoingItem.design_code);
  //       setItemId(ongoingItem.item_id);
  //       setTimer(formattedTime);
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  // }, [designList]);

  useEffect(() => {
    const ongoingItem = designList.find(
      (item) => item.timer_status === "on-going"
    );

    if (ongoingItem) {
      const localStorageKey = `start_time_${ongoingItem.item_id}`;
      let storedStartTime = localStorage.getItem(localStorageKey);

      if (!storedStartTime) {
        // If no start time in local storage, calculate the start time based on the timer_value
        const [hours, minutes, seconds] = ongoingItem.timer_value
          .split(":")
          .map(Number);
        const elapsedTimeInMs = (hours * 3600 + minutes * 60 + seconds) * 1000;

        const startTime = new Date().getTime() - elapsedTimeInMs;
        storedStartTime = new Date(startTime).toISOString();

        // Store the calculated start time in local storage
        localStorage.setItem(localStorageKey, storedStartTime);
      }

      // Start the timer
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const startTime = new Date(storedStartTime).getTime();
        const elapsedTime = now - startTime;
        const formattedTime = formatTime(elapsedTime);

        setTimer(formattedTime);

        setDesignList((prevList) =>
          prevList.map((item) =>
            item.item_id === ongoingItem.item_id
              ? { ...item, timer_value: formattedTime }
              : item
          )
        );

        console.log(`Timer for item ${ongoingItem.item_id}: ${formattedTime}`);
      }, 1000);

      setProductCode(ongoingItem.design_code);
      setItemId(ongoingItem.item_id);

      return () => clearInterval(interval);
    }
  }, [designList]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    // Add leading zeros to the values if they are less than 10
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const onButtonClick = (id) => {
    const startTime = new Date().toISOString();
    localStorage.setItem(`start_time_${id}`, startTime);
    designListStatusChange(
      setIsLoading,
      id,
      () => {
        getDesignList(setIsLoading, setDesignList);
      },
      "on-going"
    );
  };

  const onStopButtonClick = () => {
    localStorage.removeItem(`start_time_${itemId}`);
    designListStatusChange(
      setIsLoading,
      itemId,
      () => {
        getDesignList(setIsLoading, setDesignList);
      },
      "Completed",
      timer
    );
  };

  const handleUploadFile = () => {
    if (images.normal === null || images.threeD === null) {
      setErrors("Please Upload Both image.");
    }
    const formData = new FormData();
    formData.append("designcode", productCode);
    formData.append("file_2d", images.normal);
    formData.append("file_3d", images.threeD);
    if (images.normal !== null && images.threeD !== null) {
      uploadFile(
        setIsLoading,
        formData,
        setImages,
        setSuccessModalOpen,
        setSuccessMessage,
        setIsModalOpen,
        setProductCode,
        () => {
          onStopButtonClick();
        }
      );
    }
  };

  const handleCADLogout = () => {
    cadLogut(timer);
  };

  console.log("images cddd", images);

  return (
    <div className="ParentVotorPage">
      <Sidebar
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
        timer={timer}
      />
      <Header
        sidebarExpanded={sidebarExpanded}
        handleCADLogout={handleCADLogout}
        setSearchWithName={setSearchWithName}
      />
      <CadAssignment
        designList={designList}
        onButtonClick={onButtonClick}
        timer={timer}
        setIsModalOpen={setIsModalOpen}
        sidebarExpanded={sidebarExpanded}
        isLoadingMain={isLoading}
        SearchWithName={SearchWithName}
      />
      <CentalHub
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productCode={productCode}
        images={images}
        setImages={setImages}
        handleUploadFile={handleUploadFile}
        errorss={errorss}
        onStopButtonClick={onStopButtonClick}
        isLoading={isLoading}
      />
      <SuccessModal
        successModalOpen={successModalOpen}
        handleOpen={() => setSuccessModalOpen(true)}
        handleClose={() => setSuccessModalOpen(false)}
        successMessage={successMessage}
      />
    </div>
  );
};

export default CadAssignmentPage;
