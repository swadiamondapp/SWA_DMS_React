import {
  apiService,
  checkApiStatus,
} from "../../../Pages/Services/ApiInstants";
import {
  CENTRALHUB_NEW_SCAN_LIST,
  CENTRALHUB_NEW_SCAN_PRODUCTSCAN,
  CENTRALHUB_NEW_SCAN_PRODUCTSTATUS_DELETE,
  CENTRALHUB_NEW_SCAN_PRODUCTSTATUS_UPDATE,
  NEW_SCAN_LIST,
  NEW_SCAN_PRODUCTSCAN,
  NEW_SCAN_PRODUCTSTATUS_DELETE,
  NEW_SCAN_PRODUCTSTATUS_UPDATE,
} from "../../../Pages/Services/EndPoints";

export const warehoueScanTable = async (setScanTableData) => {
  try {
    const response = await apiService.get(NEW_SCAN_LIST);
    if (checkApiStatus(response)) {
      setScanTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const newScanProductScan = async (
  setIsLoading,
  searchListId,
  setScanTableData,
  setsearchListId,
  setError
) => {
  try {
    const body = {
      finisheditem_id: searchListId,
    };

    const response = await apiService.post(NEW_SCAN_PRODUCTSCAN, body);
    if (response.data.results.status_code === 200) {
      warehoueScanTable(setScanTableData);
      setsearchListId("");
      alert("Item Added");
      setError("");
    }
    if (response.data.results.status_code === 206) {
      setError(response.data.results.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  } catch (error) {
    console.log(error);
    alert("Item Not Found");
    setError("");
    setsearchListId("");
  }
};

export const newScanProductStatusUpdate = async (
  statusId,
  clickedProductIds,
  setScanTableData,
  setError,
  setStatusId,
  setOpen
) => {
  debugger;
  try {
    const body = {
      transfer_id: clickedProductIds,
      status_id: statusId,
    };

    const response = await apiService.patch(
      NEW_SCAN_PRODUCTSTATUS_UPDATE,
      body
    );
    if (response.data.results.status_code === 200) {
      warehoueScanTable(setScanTableData);
      setStatusId("");
      alert("Status Updated");
      setError("");
      setOpen(false);
    }
  } catch (error) {
    console.log(error);
    // alert("Failed to status change");
    setError("Failed to status change");
    setStatusId("");
  }
};

export const newScanSearchFilter = async (searchListId, setTableData) => {
  debugger;
  try {
    let endpoint = `${NEW_SCAN_LIST}`;

    if (searchListId !== "") {
      endpoint += `?designcode=${searchListId}`;
    } else if (searchListId === "") {
      warehoueScanTable(setTableData);
    }

    const response = await apiService.get(endpoint);

    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const warehouseScanItemDelete = async (
  // setIsLoading,
  setTableData,
  userId,
  setDeleteConfirmationOpen,
  setSuccessMessage,
  setSuccessModalOpen
) => {
  try {
    const response = await apiService.delete(
      `${NEW_SCAN_PRODUCTSTATUS_DELETE}${userId}/`
    );

    if (checkApiStatus(response)) {
      // setData(response.data.results.data);
      warehoueScanTable(setTableData);
      setDeleteConfirmationOpen(false);
      setSuccessMessage("Deleted Successfully"), setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
    }
  } catch (error) {
    console.log(error);
  }
};

// ......CENTRAL_HB..

export const centralHubScanTable = async (setScanTableData) => {
  try {
    const response = await apiService.get(CENTRALHUB_NEW_SCAN_LIST);
    if (checkApiStatus(response)) {
      setScanTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const centralhubScanSearchFilter = async (
  searchListId,
  setTableData
) => {
  debugger;
  try {
    let endpoint = `${CENTRALHUB_NEW_SCAN_LIST}`;

    if (searchListId !== "") {
      endpoint += `?designcode=${searchListId}`;
    } else if (searchListId === "") {
      centralHubScanTable(setTableData);
    }

    const response = await apiService.get(endpoint);

    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const CentralHubnewScanProductScan = async (
  setIsLoading,
  searchListId,
  setScanTableData,
  setsearchListId,
  setError
) => {
  try {
    const body = {
      finisheditem_id: searchListId,
    };

    const response = await apiService.post(
      CENTRALHUB_NEW_SCAN_PRODUCTSCAN,
      body
    );
    if (response.data.results.status_code === 200) {
      centralHubScanTable(setScanTableData);
      setsearchListId("");
      alert("Item Added");
      setError("");
    }
    if (response.data.results.status_code === 206) {
      setError(response.data.results.message);
      setsearchListId("");
    }
  } catch (error) {
    console.log(error);
    alert("Item Not Found");
    setError("");
    setsearchListId("");
  }
};

export const centralHubnewScanProductStatusUpdate = async (
  cHstatusId,
  clickedProductIds,
  setScanTableData,
  setError,
  setChStatusId,
  setOpen,
  setSuccessModalOpen,
  setSuccessMessage
) => {
  debugger;
  try {
    const body = {
      transfer_id: clickedProductIds,
      status_id: cHstatusId,
    };

    const response = await apiService.patch(
      CENTRALHUB_NEW_SCAN_PRODUCTSTATUS_UPDATE,
      body
    );
    if (response.data.results.status_code === 200) {
      centralHubScanTable(setScanTableData);
      setSuccessModalOpen(true);
      setSuccessMessage("Status updated Successfully");
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
      setOpen(false);
      setChStatusId("");
      setError("");
    }
  } catch (error) {
    console.log(error);
    // alert("Failed to status change");
    setError("Failed to status change");
    setChStatusId("");
  }
};

export const centralhubScanItemDelete = async (
  // setIsLoading,
  setTableData,
  userId,
  setDeleteConfirmationOpen,
  setSuccessMessage,
  setSuccessModalOpen
) => {
  try {
    const response = await apiService.delete(
      `${CENTRALHUB_NEW_SCAN_PRODUCTSTATUS_DELETE}${userId}/`
    );

    if (checkApiStatus(response)) {
      // setData(response.data.results.data);
      centralHubScanTable(setTableData);
      setDeleteConfirmationOpen(false);
      setSuccessMessage("Deleted Successfully"), setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
    }
  } catch (error) {
    console.log(error);
  }
};
