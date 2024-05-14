import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../Pages/Utils/Common";
import {
  FOLDER_DETAIL_API,
  LIST_ASSIGNMENT_PANEL,
  MOVE_TO_FOLDER,
} from "../../Pages/Services/EndPoints";

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

export const move_to_folder = async (setIsLoading, formData, folderName,selectedId) => {
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
        tags: "Tag1, Tag2",
        note: formData.notes,
      },
      items: [{ id: 3 }],
    };
    console.log(body, "bodyAssi");
    const response = await apiService.post(MOVE_TO_FOLDER, body);
    if (response.data.results.status_code === 200) {
      console.log(response.data.results.message, "success");
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};
