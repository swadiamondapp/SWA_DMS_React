import {
  apiService,
  checkApiStatus,
} from "../../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../../Pages/Utils/Common";
import {
  FOLDER_DETAIL_API,
  ASSIGN_TO_CAD,
  LIST_ALL_CUSTOMIZATION_DESIGNS,
  LIST_UNASSIGNED_DESIGNER,
  ASSIGN_UNASSIGN_DESIGNERS,
  ASSIGNMENT_PANEL_DETAILS_PAGE,
} from "../../../Pages/Services/EndPoints";

export const list_designer_folderDetails = async (
  setIsLoading,
  setFolderDetails,
  id
) => {
  try {
    const response = await apiService.get(
      `${ASSIGNMENT_PANEL_DETAILS_PAGE}${id}`
    );
    if (checkApiStatus(response)) {
      setFolderDetails(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const renderFolderDetails = async (
  setIsLoading,
  setFolderDetails,
  id
) => {
  try {
    setIsLoading(true)
    const response = await apiService.get(`${FOLDER_DETAIL_API}${id}`);
    if (checkApiStatus(response)) {
      setFolderDetails(response.data.results.data);
      setIsLoading(false)
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
    console.log(selectedDesign, " selectedDesign");
    const response = await apiService.post(ASSIGN_TO_CAD, body);
    if (response.data.status_code === 200) {
      setSelectedAssignment([]);
      onClose();
      list_designer_folderDetails();
      setSuccessMessage("Item Assigned SuccessFully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
    }
  } catch (error) {
    // setSelectedAssignment([])
    console.error("Error moving designs:", error);
    alert(error?.response?.data?.assignment_items);
  }
};

export const list_all_cutomization_paper_design = async (
  setIsLoading,
  setCustomizationDesign
) => {
  try {
    const response = await apiService.get(LIST_ALL_CUSTOMIZATION_DESIGNS);
    if (response.data.results.status_code === 200) {
      setCustomizationDesign(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};
export const listUnAssignedLists = async (setIsLoading, setUnAssignedLists) => {
  try {
    const response = await apiService.get(LIST_UNASSIGNED_DESIGNER);
    if (response.data.results.status_code === 200) {
      setUnAssignedLists(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const unassignDesigner = async (
  setIsLoading,
  id,
  userId,
  setSuccessMessage,
  setSuccessModalOpen,
  setUnAssignedLists
) => {
  try {
    const body = {
      paper_design_id: id,
      user: userId,
    };
    console.log(body, "unasssdfidf");
    const response = await apiService.post(ASSIGN_UNASSIGN_DESIGNERS, body);
    if (response.data.results.status_code === 200) {
      listUnAssignedLists(setIsLoading, setUnAssignedLists);
      setSuccessMessage("Item Unassigned SuccessFully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
    }
  } catch (error) {
    console.error("Error moving designs:", error);
    alert(error);
  }
};
