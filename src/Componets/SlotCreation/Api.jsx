import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import {
  CREATE_SLOT_BAG,
  LIST_AVAILABLE_CAD_DESIGNS,
} from "../../Pages/Services/EndPoints";

export const listAvailableCadDesigns = async (setIsLoading, setData) => {
  try {
    const response = await apiService.get(LIST_AVAILABLE_CAD_DESIGNS);
    if (checkApiStatus(response)) {
      setData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const createSloteBag = async (
  setIsLoading,
  selectedIds,
  setSuccessMessage,
  setSuccessModalOpen,
  genSlotId,
  onClose,
  setData,
  setSelectedItems,
) => {
  try {
    const body = {
      finished_ids: selectedIds,
      slot_id:genSlotId,
    };
    console.log(body, "itemMovirddd");
    const response = await apiService.post(CREATE_SLOT_BAG, body);
    if (response.data.results.status_code === 201) {
      // list_assignment_folder(setIsLoading, setAssignmentFolder);
      listAvailableCadDesigns(setIsLoading, setData)
      onClose();
      setSuccessMessage("Bag Created Successfully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
      setSelectedItems([])
      // setItemMovedToAssignment([]);
      // setFolderName("");
      // setSelectedAssignment([]);
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};
