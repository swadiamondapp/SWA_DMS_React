import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../Pages/Utils/Common";
import {
  DIAMOND_TYPE_DROPDOWN,
  FINDINGS_LIST,
  FOLDER_DETAIL_API,
  LIST_ASSIGNMENT_PANEL,
  METAL_TYPE,
  MOVE_TO_FOLDER,
  TAG_LIST,
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

export const move_to_folder = async (
  setIsLoading,
  formData,
  folderName,
  selectedAssignment,
  setAssignmentFolder,
  onClose,
  setSuccessMessage,
  setSuccessModalOpen,
  setSelectedAssignment,
  setFormData,
  findingsNames,
  selectedFechedTagsId
) => {
  try {
    const body = {
      folder_data: {
        name: folderName,
        SKU: formData.SKU,
        productCategory: formData.productCategory,
        length: formData.length,
        width: formData.width,
        height: formData.height,
        type_of_metal: formData.typeOfMetal,
        diamond_type: formData.diamondType,
        approx_diamond_weight: formData.approxDiamondWeight,
        findings: formData.findings,
        approx_weight: formData.approxMetalWeights,
        approx_price: formData.approxMRP,
        tag: selectedFechedTagsId,
        note: formData.notes,
      },
      items: selectedAssignment,
    };
    console.log(body, "bodyAssijj");
    const response = await apiService.post(MOVE_TO_FOLDER, body);
    if (response.data.results.status_code === 200) {
      list_assignment_folder(setIsLoading, setAssignmentFolder);
      onClose();
      setSuccessMessage("Assignment Folder Created SuccessFully");
      setSuccessModalOpen(true);
      setSelectedAssignment([]);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
      setFormData({
        SKU: "",
        length: "",
        width: "",
        height: "",
        typeOfMetal: "",
        diamondType: "",
        approxDiamondWeight: "",
        findings: "",
        approxMetalWeights: "",
        approxMRP: "",
        tag: "",
        notes: "",
      });
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};

export const metal_type_dropdown_basicDetails = async (
  setMetalTypeDropDown,
) => {
  try {
    const response = await apiService.get(METAL_TYPE);
    if (checkApiStatus(response)) {
      setMetalTypeDropDown(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  }
};
export const diamond_type_dropdown_basicDetails = async (
  setDiamondType,
) => {
  try {
    const response = await apiService.get(DIAMOND_TYPE_DROPDOWN);
    if (checkApiStatus(response)) {
      setDiamondType(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const tag_List_basicDetails = async (
  setSelected,
) => {
  try {
    const response = await apiService.get(TAG_LIST);
    if (checkApiStatus(response)) {
      setSelected(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const findings_List_basicDetails = async (
  setFindingsList
) => {
  try {
    const response = await apiService.get(FINDINGS_LIST);
    if (checkApiStatus(response)) {
      setFindingsList(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  }
};