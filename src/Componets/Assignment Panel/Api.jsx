import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../Pages/Utils/Common";
import {
  ASSIGNMENT_MOVE,
  CALCULATION,
  DIAMOND_TYPE_DROPDOWN,
  FINDINGS_LIST,
  FOLDER_DETAIL_API,
  LIST_ASSIGNMENT_PANEL,
  METAL_TYPE,
  MOVE_TO_FOLDER,
  PRODUCT_CATEGORY_LIST,
  TAG_LIST,
} from "../../Pages/Services/EndPoints";
import {
  all_Designs,
  list_assignment_folder,
} from "../ADMIN PANEL/Design Pool/Api";

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
  folderName,
  setAssignmentFolder,
  onClose,
  setSuccessMessage,
  setSuccessModalOpen,
  setSelectedAssignment,
  ItemMovedToAssignment,
  handleClose
) => {
  try {
    const body = {
      folder_data: {
        name: folderName,
      },
      items: ItemMovedToAssignment,
    };
    console.log(body, "itemMovirddd");
    const response = await apiService.post(MOVE_TO_FOLDER, body);
    if (response.data.results.status_code === 200) {
     
      list_assignment_folder(setIsLoading, setAssignmentFolder);
      onClose();
      setSuccessMessage("Assignment Folder Created SuccessFully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
      setSelectedAssignment([]);
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};

export const metal_type_dropdown_basicDetails = async (
  setMetalTypeDropDown
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
export const diamond_type_dropdown_basicDetails = async (setDiamondType) => {
  try {
    const response = await apiService.get(DIAMOND_TYPE_DROPDOWN);
    if (checkApiStatus(response)) {
      setDiamondType(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const tag_List_basicDetails = async (setSelected) => {
  try {
    const response = await apiService.get(TAG_LIST);
    if (checkApiStatus(response)) {
      setSelected(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const findings_List_basicDetails = async (setFindingsList) => {
  try {
    const response = await apiService.get(FINDINGS_LIST);
    if (checkApiStatus(response)) {
      setFindingsList(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const product_category_basicDetails = async (setListProductCategory) => {
  try {
    const response = await apiService.get(PRODUCT_CATEGORY_LIST);
    if (checkApiStatus(response)) {
      setListProductCategory(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const move_to_assignment = async (
  formData,
  onClose,
  setSuccessModalOpen,
  setSuccessMessage,
  setIsLoading,
  setSelectedDesigns,
  setData,
  setShowRadioButtons,
  setSelectButtonLabel,
  setShowAssignmentModal,
  setMovedItemsId
) => {
  try {
    const body = {
      design_codes: formData.SKU,
      assignment_data: {
        length: formData.length,
        width: formData.width,
        height: formData.height,
        approx_diamond_weight: formData.approxDiamondWeight,
        approx_metal_weight: formData.approxMetalWeights,
        approx_price: formData.approxMRP,
        note: formData.notes,
        product_category: formData.productCategory,
        type_of_metal: formData.typeOfMetal,
        diamond_type: formData.diamondType,
        findings: formData.findings,
        tag: formData.tag,
      },
    };
    console.log(body, "move_TO_ASSINGG");
    const response = await apiService.post(ASSIGNMENT_MOVE, body);
    if (response.data.results.status_code === 200) {
      all_Designs(setIsLoading, setData);
      onClose();
      setSuccessMessage("Moved to Assignment Successfully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
      setSelectedDesigns([]);
      setShowRadioButtons(false);
      setSelectButtonLabel("Select");
      setShowAssignmentModal(true);
      setMovedItemsId(response?.data?.results.data);
      // setFormData({
      //   SKU: "",
      //   length: "",
      //   width: "",
      //   height: "",
      //   typeOfMetal: "",
      //   diamondType: "",
      //   approxDiamondWeight: "",
      //   findings: "",
      //   approxMetalWeights: "",
      //   approxMRP: "",
      //   tag: "",
      //   notes: "",
      // });
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};

export const basic_calculation = async (
  setIsLoadingCalculation,
  formData,
  SelectedMetalId,
  SelectedDiamondId,
  setCalculationData
) => {
  try {
    setIsLoadingCalculation(true)
    const body = {
      metal_weight: formData.approxMetalWeights,
      diamond_weight: formData.approxDiamondWeight,
      metal_id: SelectedMetalId,
      diamond_id: SelectedDiamondId,
    };
    console.log(body, "move_TO_ASSINGG");
    const response = await apiService.post(CALCULATION, body);
    if (response.data.results.status_code === 200) {
      setCalculationData(response?.data?.results?.data);
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }finally {
    setIsLoadingCalculation(false)
  }
};
