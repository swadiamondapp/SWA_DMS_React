import {
  apiService,
  checkApiStatus,
} from "../../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../../Pages/Utils/Common";
import {
  FOLDER_DETAIL_API,
  ASSIGN_TO_CAD,
  LIST_ALL_CUSTOMIZATION_DESIGNS,
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
  list_id,
  onClose,
  list_designer_folderDetails,
  setSuccessModalOpen,
  setSuccessMessage,
  setSelectedAssignment

) => {
  try {
    const body = {
      folder: assignToCadId,
      user: userId,
      assignment_items: selectedDesign,
    };
    console.log(body, "body====>");
    console.log( selectedDesign," selectedDesign")
    const response = await apiService.post(ASSIGN_TO_CAD, body);
    if (response.data.status_code === 200) {
      setSelectedAssignment([])
      onClose()
      list_designer_folderDetails()
      setSuccessMessage("Item Assigned SuccessFully")
      setSuccessModalOpen(true)
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
      
    }
  } catch (error) {
      // setSelectedAssignment([])
    console.error("Error moving designs:", error);
    alert(error?.response?.data?.assignment_items
    )
  }
};

export const list_all_cutomization_paper_design= async (
  setIsLoading,
  setCustomizationDesign,
) => {
  try {
    debugger
    const response = await apiService.get(LIST_ALL_CUSTOMIZATION_DESIGNS);
    if (checkApiStatus(response)) {
      setCustomizationDesign(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};
