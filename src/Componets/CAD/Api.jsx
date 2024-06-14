import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../Pages/Utils/Common";
import {
  ASSIGNED_DATA_BY_ID,
  LIST_ASSIGNED_CAD_DESIGN,
  TRANSFER_CAD,
  UPLOAD_CAD_DESIGN,
} from "../../Pages/Services/EndPoints";

export const list_assigned_cad_design = async (
  setIsLoading,
  setAssignedCadDesign
) => {
  try {
    const response = await apiService.get(LIST_ASSIGNED_CAD_DESIGN);
    if (checkApiStatus(response)) {
      setAssignedCadDesign(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const upload_cad_design = async (
  setIsLoading,
  designCode,
  imageFile,
  threeDFile,
  onClose,
  setSuccessModalOpen,
  setSuccessMessage,
  handleSuccessUpload
) => {
  try {
    setIsLoading(true);
    const body = {
      designcode: designCode,
      file1: imageFile,
      file2: threeDFile,
    };

    const config = {
      headers: {
        "Content-Type": "multipart/form-data", // Set the appropriate content type for your request
        // Add any other headers you need
      },
    };
    console.log(body, "uploadCad");
    const response = await apiService.post(UPLOAD_CAD_DESIGN, body, config);
    if (response.data.results.status_code === 201) {
      // list_assignment_folder(setIsLoading, setAssignmentFolder);
      setSuccessModalOpen(true);
      setSuccessMessage("File Uploaded Successfully");
      onClose();
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1500);
      handleSuccessUpload();
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  } finally {
    setIsLoading(false);
  }
};

export const assigned_data_by_id = async (
  setIsLoading,
  setFolderDetailsById,
  paramId
) => {
  try {
    const response = await apiService.get(`${ASSIGNED_DATA_BY_ID}/${paramId}/`);
    if (checkApiStatus(response)) {
      setFolderDetailsById(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const transfer_work = async (
  status,
  itemId,
  setTransferModalOpen,
  setSuccessMessage,
  setSuccessModalOpen,
  paramId,
  setFolderDetailsById,
  setIsLoading,
) => {
  try {
    const body = {
      work_status: status,
    };
    console.log(status, "statusss");
    const response = await apiService.patch(`${TRANSFER_CAD}/${itemId}/`, body);
    if (checkApiStatus(response)) {
      setTransferModalOpen(false);
      setSuccessMessage("Transfered Successfully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1500);
     assigned_data_by_id(setIsLoading, setFolderDetailsById, paramId);
    }
  } catch (error) {
    console.log(error);
  }
};
