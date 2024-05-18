import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../Pages/Utils/Common";
import { ASSIGNED_DATA_BY_ID, LIST_ASSIGNED_CAD_DESIGN } from "../../Pages/Services/EndPoints";

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

export const upload_cad_design = async (setIsLoading) => {
  try {
    const body = {
      designcode: "",
      file1: "",
      file2: "",
    };
    console.log(body, "uploadCad");
    const response = await apiService.post(MOVE_TO_FOLDER, body);
    if (response.data.results.status_code === 200) {
      list_assignment_folder(setIsLoading, setAssignmentFolder);
      onClose();
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};

export const assigned_data_by_id = async (
  setIsLoading,
  setFolderDetailsById,
  paramId
) => {
  try {
    const response = await apiService.get(
      `${ASSIGNED_DATA_BY_ID}/${paramId}/`
    );
    if (checkApiStatus(response)) {
      setFolderDetailsById(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};
