import {
  apiService,
  checkApiStatus,
} from "../../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../../Pages/Utils/Common";
import { FOLDER_DETAIL_API } from "../../../Pages/Services/EndPoints";

export const list_designer_folderDetails = async (
  setIsLoading,
  setFolderDetails,
  id
) => {
  try {
    const response = await apiService.get(
      `${FOLDER_DETAIL_API}/${id}/`
    );
    if (checkApiStatus(response)) {
      setFolderDetails(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const assign_to_cad = async (setIsLoading, formData, folderName,selectedAssignment, setAssignmentFolder,onClose) => {
  try {
    const body = {
      folder: folderId,
      user: userId,
      assignment_items: seletectDesigns
  }
    console.log(body, "bodyAssi");
    const response = await apiService.post(MOVE_TO_FOLDER, body);
    if (response.data.results.status_code === 200) {
      list_assignment_folder(setIsLoading,  setAssignmentFolder);
      onClose()

    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};
