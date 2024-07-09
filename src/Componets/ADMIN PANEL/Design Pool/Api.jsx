import {
  apiService,
  checkApiStatus,
} from "../../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../../Pages/Utils/Common";
import { ALL_DESIGNS, MOVE_TO_ASSIGNMENT, UNVOTED_DESIGN,LIST_ASSIGNMENT_FOLDER } from "../../../Pages/Services/EndPoints";


export const all_Designs = async (setIsLoading, setData) => {
  try {
    const response = await apiService.get(`${ALL_DESIGNS}/?not_assigned=true`);
    if (checkApiStatus(response)) {
      setData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const unvoted_design = async (setIsLoading, setUnvotedData) => {
  try {
    const response = await apiService.get(UNVOTED_DESIGN);
    if (checkApiStatus(response)) {
      setUnvotedData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const moveSelectedDesign = async (setIsLoading, selectedDesigns) => {
  try {
    const body = {
      design_codes: selectedDesigns,
    };
    const response = await apiService.post(MOVE_TO_ASSIGNMENT, body);
    const res = response.data.results.status_code === 200
    if (response.data.results.status_code === 200) {
      console.log(response.data.results.message,"success")
    }
    return res
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};





export const list_assignment_folder = async (setIsLoading,  setAssignmentFolder) => {
  try {
    const response = await apiService.get(LIST_ASSIGNMENT_FOLDER);
    if (checkApiStatus(response)) {
      setAssignmentFolder(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};
