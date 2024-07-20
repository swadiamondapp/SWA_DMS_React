import { apiService, checkApiStatus } from "../Services/ApiInstants";
import { SEARCH_WITH_NAMES } from "../Services/EndPoints";

export const searchNamesAdmin = async (
  setIsLoading,
  setData,
  SearchWithName
) => {
  try {
    const response = await apiService.get(
      `${SEARCH_WITH_NAMES}${SearchWithName}`
    );
    if (checkApiStatus(response)) {
      setData(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  }
};
