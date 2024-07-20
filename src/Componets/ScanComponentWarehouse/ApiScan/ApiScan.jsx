import { apiService, checkApiStatus } from "../../../Pages/Services/ApiInstants";
import { NEW_SCAN_LIST } from "../../../Pages/Services/EndPoints";



export const warehoueScanTable = async (setScanTableData) => {
    try {
      const response = await apiService.get(NEW_SCAN_LIST);
      if (checkApiStatus(response)) {
        setScanTableData(response.data.results.data);
      }
    } catch (error) {
      console.log(error);
    }
  };