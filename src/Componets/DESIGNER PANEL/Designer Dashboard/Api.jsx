import {
  apiService,
  checkApiStatus,
} from "../../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../../Pages/Utils/Common";
import { LIST_UPLOAD_DESIGN } from "../../../Pages/Services/EndPoints";

export const list_uploaded_designs = async (setIsLoading, setData) => {
  try {
    const response = await apiService.get(LIST_UPLOAD_DESIGN);
    if (checkApiStatus(response)) {
      setData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};
