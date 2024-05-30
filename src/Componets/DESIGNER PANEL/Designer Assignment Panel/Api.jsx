import {
  apiService,
  checkApiStatus,
} from "../../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../../Pages/Utils/Common";
import { LIST_ASSIGNMENT_FOLDER } from "../../../Pages/Services/EndPoints";

export const list_designer_folder = async (setIsLoading, setDesignerFolder) => {
  try {
    const response = await apiService.get(LIST_ASSIGNMENT_FOLDER);
    if (checkApiStatus(response)) {
      setDesignerFolder(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};
