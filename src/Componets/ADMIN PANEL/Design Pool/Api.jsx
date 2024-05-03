import {
  apiService,
  checkApiStatus,
} from "../../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../../Pages/Utils/Common";
import { ALL_DESIGNS } from "../../../Pages/Services/EndPoints";

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
