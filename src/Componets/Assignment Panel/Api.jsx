import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../Pages/Utils/Common";
import {
  FOLDER_DETAIL_API,
  LIST_ASSIGNMENT_PANEL,
  MOVE_TO_FOLDER,
} from "../../Pages/Services/EndPoints";
import { list_assignment_folder } from "../ADMIN PANEL/Design Pool/Api";

export const list_assignment_panel = async (
  setIsLoading,
  setAssignmentFolder
) => {
  try {
    const response = await apiService.get(LIST_ASSIGNMENT_PANEL);
    if (checkApiStatus(response)) {
      setAssignmentFolder(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const list_folderDetails = async (
  setIsLoading,
  setFolderDetails,
  selectedId
) => {
  try {
    const response = await apiService.get(
      `${FOLDER_DETAIL_API}/${selectedId}/`
    );
    if (checkApiStatus(response)) {
      setFolderDetails(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const move_to_folder = async (setIsLoading, formData, folderName,selectedAssignment, setAssignmentFolder,onClose) => {
  try {
    const body = {
      folder_data: {
        name: folderName,
        SKU: formData.SKU,
        length: formData.length,
        width: formData.width,
        height: formData.height,
        type_of_metal: formData.typeOfMetal,
        diamond_type: formData.diamondType,
        approx_diamond_weight: formData.approxDiamondWeight,
        findings: formData.findings,
        approx_weight: formData.approxMetalWeights,
        approx_price: formData.approxMRP,
        tags: formData.tags,
        note: formData.notes,
      },
      items:selectedAssignment,
    };
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
