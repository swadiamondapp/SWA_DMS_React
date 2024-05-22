import {
  apiService,
  checkApiStatus,
} from "../../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../../Pages/Utils/Common";
import {
  FOLDER_DETAIL_API,
  ASSIGN_TO_CAD,
} from "../../../Pages/Services/EndPoints";

export const list_designer_folderDetails = async (
  setIsLoading,
  setFolderDetails,
  id
) => {
  try {
    const response = await apiService.get(`${FOLDER_DETAIL_API}/${id}/`);
    if (checkApiStatus(response)) {
      setFolderDetails(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const assign_to_cad = async (
  setIsLoading,
  assignToCadId,
  userId,
  selectedDesign,
  setAssignedData
) => {
  try {
    const body = {
      folder: assignToCadId,
      user: userId,
      assignment_items: selectedDesign,
    };
    console.log(body, "body====>");
    const response = await apiService.post(ASSIGN_TO_CAD, body);
    if (response.data.results.status_code === 200) {
      setAssignedData(response.data.results.data)
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};
