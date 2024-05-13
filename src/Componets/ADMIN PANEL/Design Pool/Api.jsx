import {
  apiService,
  checkApiStatus,
} from "../../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../../Pages/Utils/Common";
import { ALL_DESIGNS, MOVE_TO_ASSIGNMENT, UNVOTED_DESIGN,LIST_ASSIGNMENT_FOLDER } from "../../../Pages/Services/EndPoints";
import { useNavigate } from "react-router-dom";


export const all_Designs = async (setIsLoading, setData) => {
  try {
    const response = await apiService.get(ALL_DESIGNS);
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

export const moveSelectedDesign = async (setIsLoading,selectedDesigns) => {
  try {
    const body = {
      design_code: 'SWAD0021',
    };
    const response = await apiService.post(MOVE_TO_ASSIGNMENT, body);
    console.log('RequestBody', body);
    console.log(response.data.results,"resppp===>")

    if (response.data.results.status_code === 200) {
      console.log('Designs moved successfully');

    }
  } catch (error) {
    console.error('Error moving designs:', error);
  }
};

export const list_assignment_folder = async (setIsLoading,setData) => {
  try {
   const response = await apiService.get( LIST_ASSIGNMENT_FOLDER);
    if (checkApiStatus(response)) {
      setData(response.data.results.data)
    } 
  } catch(error) {
    console.log(error)
  }

}