import {
    apiService,
    checkApiStatus,
  } from "../../Pages/Services/ApiInstants";
  import { setToLocalstorage } from "../../Pages/Utils/Common";
  import {FOLDER_DETAIL_API, LIST_ASSIGNMENT_PANEL } from "../../Pages/Services/EndPoints";


  export const list_assignment_panel = async (setIsLoading, setAssignmentFolder) => {
    try {
      const response = await apiService.get(LIST_ASSIGNMENT_PANEL);
      if (checkApiStatus(response)) {
        setAssignmentFolder(response.data.results.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const list_folderDetails = async (setIsLoading,setFolderDetails,selectedId) => {
    try {
      const response = await apiService.get(`${FOLDER_DETAIL_API}/${selectedId}/`);
      if (checkApiStatus(response)) {
        setFolderDetails(response.data.results.data)
      }

    }catch(error) {
      console.log(error)
    }
  }