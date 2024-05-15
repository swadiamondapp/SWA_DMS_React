import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../Pages/Utils/Common";
import { LIST_ASSIGNED_CAD_DESIGN } from "../../Pages/Services/EndPoints";

export const list_assigned_cad_design = async (
  setIsLoading,
  setAssignedCadDesign
) => {
  try {
    const response = await apiService.get(LIST_ASSIGNED_CAD_DESIGN);
    if (checkApiStatus(response)) {
        setAssignedCadDesign(response.data.resulrs.data);
    }
  } catch (error) {
    console.log(error);
  }
};
