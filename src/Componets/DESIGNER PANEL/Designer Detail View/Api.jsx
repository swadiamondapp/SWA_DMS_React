import {
  apiService,
  checkApiStatus,
} from "../../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../../Pages/Utils/Common";
import { FOLDER_DETAIL_API } from "../../../Pages/Services/EndPoints";

export const list_designer_folderDetails = async (
  setIsLoading,
  setFolderDetails,
  selectedId
) => {
  try {
    const response = await apiService.get(
      `${FOLDER_DETAIL_API}/${selectedId}/`
    );
    if (checkApiStatus(response)) {
      setFolderDetails(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};
