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
  LIST_ASSIGN_TO_LIST_ITEMS,
  UNASSIGN_CAD_DESIGNERS,
  UNASSIGN_TO_CAD,
  LIST_FOLDER_DETAILS_DESIGNER,
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

export const list_designer_folderDetails_new = async (
  setIsLoading,
  setFolderDetails,
  id
) => {
  try {
    const response = await apiService.get(
      `${LIST_FOLDER_DETAILS_DESIGNER}${id}`
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
    setIsLoading(true);
    const response = await apiService.get(`${FOLDER_DETAIL_API}${id}`);
    if (checkApiStatus(response)) {
      setFolderDetails(response.data.results.data);
      setIsLoading(false);
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
  list_designer_folderDetails_new,
  setSuccessMessage,
  setSuccessModalOpen
) => {
  try {
    debugger
    setIsLoading(true);
    const body = {
      folder: assignToCadId,
      user: userId,
      assignment_items: selectedDesign,
    };
    console.log(body, "body====>");
    console.log(selectedDesign, " selectedDesign");
    const response = await apiService.post(ASSIGN_TO_CAD, body);
    if (checkApiStatus(response)) {
      list_designer_folderDetails_new();
      setSuccessMessage("Item Assigned Successfully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1700);
    }
  } catch (error) {
    // setSelectedAssignment([])
    console.error("Error moving designs:", error);
    alert(error?.response?.data?.assignment_items);
  } finally {
    setIsLoading(false);
  }
};
export const unAssignCadDesigner = async (
  setIsLoading,
  assignToCadId,
  userId,
  selectedDesign,
  list_designer_folderDetails_new,
  setSuccessMessage,
  setSuccessModalOpen
) => {
  try {
    const body = {
      folder: assignToCadId,
      user: userId,
      assignment_items: selectedDesign,
    };
    console.log(body, "body====>Unsss");
    const response = await apiService.patch(`${UNASSIGN_CAD_DESIGNERS}`, body);
    if (checkApiStatus(response)) {
      list_designer_folderDetails_new();
      setSuccessMessage("Item Unassigned Successfully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1700);
    }
  } catch (error) {
    // setSelectedAssignment([])
    console.error("Error moving designs:", error);
    alert(error?.response?.data?.assignment_items);
  } finally {
  }
};

export const list_all_cutomization_paper_design = async (
  setIsLoading,
  setCustomizationDesign
) => {
  setIsLoading(true);
  try {
    const response = await apiService.get(LIST_ALL_CUSTOMIZATION_DESIGNS);
    if (response.data.results.status_code === 200) {
      setCustomizationDesign(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};
export const listUnAssignedLists = async (setIsLoading, setUnAssignedLists) => {
  try {
    const response = await apiService.get(LIST_ASSIGN_TO_LIST_ITEMS);
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

  setSuccessMessage,
  setSuccessModalOpen,
  setUnAssignedLists
) => {
  try {
    const response = await apiService.patch(`${UNASSIGN_TO_CAD}${id}`);
    if (checkApiStatus(response)) {
      listUnAssignedLists(setIsLoading, setUnAssignedLists);
      setSuccessMessage("Item Unassigned Successfully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1700);
    }
  } catch (error) {
    console.error("Error moving designs:", error);
    alert(error);
  }
};
