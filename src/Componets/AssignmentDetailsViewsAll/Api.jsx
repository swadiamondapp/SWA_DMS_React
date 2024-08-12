import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import { ALL_ITEMS_DETAILS_VIEW } from "../../Pages/Services/EndPoints";
import { setToLocalstorage } from "../../Pages/Utils/Common";

export const detailsViewOfItems = async (
  setIsLoading,
  setDetailsData,
  id
) => {
  try {
    const response = await apiService.get(
      `${ALL_ITEMS_DETAILS_VIEW}${id}/`
    );
    if (checkApiStatus(response)) {
      setDetailsData(response.data.results);
    }
  } catch (error) {
    console.log(error);
  }
};
