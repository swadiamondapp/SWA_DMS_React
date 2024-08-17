import {
  apiService,
  checkApiStatus,
} from "../../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../../Pages/Utils/Common";
import { GET_LIST_FOLDER_BY_ID, LIST_ASSIGNMENT_FOLDER, LIST_FOLDER_DESIGNER } from "../../../Pages/Services/EndPoints";

// export const list_designer_folder = async (setIsLoading, setDesignerFolder) => {
//   try {
//     const response = await apiService.get(LIST_ASSIGNMENT_FOLDER);
//     if (checkApiStatus(response)) {
//       setDesignerFolder(response.data.results.data);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const list_designer_folder = async (setIsLoading, setDesignerFolder) => {
  const LoginId = localStorage.getItem("loginId");
  console.log(LoginId,"loginIddes")
  try {
    const response = await apiService.get(`${GET_LIST_FOLDER_BY_ID}${LoginId}`);
    if (checkApiStatus(response)) {
      setDesignerFolder(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const list_designer_folder_new = async (setIsLoading, setDesignerFolder) => {
  const LoginId = localStorage.getItem("loginId");
  console.log(LoginId,"loginIddes")
  try {
    const response = await apiService.get(LIST_FOLDER_DESIGNER);
    if (checkApiStatus(response)) {
      setDesignerFolder(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};