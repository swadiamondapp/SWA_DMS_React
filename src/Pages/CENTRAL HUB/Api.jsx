import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import {
  CENTRAL_HUB_FOLDER_DETAILS,
  CENTRAL_HUB_TRANSFER,
  CHANGE_CENTRAL_HUB_STATUS,
  GENERATE_SLOT_NUMBER,
  LIST_CENTRAL_FOLDERS,
  LIST_FROM_DESIGN_CAD,
  LIST_SLOT_HUB,
  SCAN_TRANSFER_SLOT,
  SLOT_VIEW_BY_ID,
} from "../Services/EndPoints";
// import { LIST_FROM_DESIGN_CAD, LIST_SLOT_HUB, SLOT_VIEW_BY_ID, } from "../../Pages/Services/EndPoints";

export const list_slot_central_hub = async (setIsLoading, setData) => {
  try {
    const response = await apiService.get(LIST_SLOT_HUB);
    if (checkApiStatus(response)) {
      setData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};
export const centralTransfer = async (setIsLoading, setTransferData) => {
  try {
    const response = await apiService.get(CENTRAL_HUB_TRANSFER);
    if (checkApiStatus(response)) {
      setTransferData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const list_all_designs_from_cad = async (setIsLoading, setData) => {
  try {
    const response = await apiService.get(LIST_FROM_DESIGN_CAD);
    if (checkApiStatus(response)) {
      setData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const slot_view_by_id = async (Id, setSloteView) => {
  try {
    const response = await apiService.get(`${SLOT_VIEW_BY_ID}${Id}/`);
    if (checkApiStatus(response)) {
      setSloteView(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const listFoldersCentralHub = async (setIsLoading, setFolders) => {
  try {
    const response = await apiService.get(LIST_CENTRAL_FOLDERS);
    if (checkApiStatus(response)) {
      setFolders(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const centralFolderDetails = async (Id, setCentralFolderDetails) => {
  try {
    const response = await apiService.get(`${CENTRAL_HUB_FOLDER_DETAILS}${Id}`);
    if (response.data.results.status_code === 200) {
      setCentralFolderDetails(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const generateSloteNumber = async (setIsLoading, setGeneratSloteNum) => {
  try {
    const response = await apiService.post(GENERATE_SLOT_NUMBER);
    if (response.data.results.status_code === 201) {
      console.log("successfully created");

      setGeneratSloteNum(response.data.results.data);
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};

export const scanSloteTransfer = async (
  setIsLoading,
  TransferScan,
  setSuccessModalOpen,
  setSuccessMessage,
  setTransferData,
  setTransferScan
) => {
  try {
    const body = {
      finisheditem_id: TransferScan,
    };
    const response = await apiService.post(SCAN_TRANSFER_SLOT, body);
    if (response.data.results.status_code === 200) {
      setSuccessMessage("Scanned Successfully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
      centralTransfer(setIsLoading, setTransferData);
      setTransferScan("");
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};

export const listCentralHubStatus = async (
  setIsLoading,
  setCentralHubStatus
) => {
  try {
    const response = await apiService.get(LIST_CENTRAL_FOLDERS);
    if (checkApiStatus(response)) {
      setCentralHubStatus(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const changeCentralHubStatus = async (itemId, setIsLoading, value,setTransferData) => {
  debugger
  try {
    const body = {
      status: value,
    };
    const response = await apiService.patch(
      `${CHANGE_CENTRAL_HUB_STATUS}${itemId}/`,
      body
    );
    if (checkApiStatus(response)) {
      centralTransfer(setIsLoading, setTransferData);
      // setSuccessMessage("Status Updated Successfully");
      // setSuccessModalOpen(true);
      // setTimeout(() => {
      //   setSuccessModalOpen(false);
      // }, 1600);
      alert("Status Updated Successfully")
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};
