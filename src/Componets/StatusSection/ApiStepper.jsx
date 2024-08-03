import { apiService } from "../../Pages/Services/ApiInstants";
import { PRODUCT_TRACKING } from "../../Pages/Services/EndPoints";


export const productTracking = async (setIsLoading, productId, setSteppretDta,setError) => {
    try {
        setIsLoading(true)
      const body = {
        product_code: productId,
      };
      const response = await apiService.post(PRODUCT_TRACKING, body);
      if (response.data.results.status_code === 200) {
        setSteppretDta(response.data.results)
      }
      if (response.data.results.status_code === 404) {
        setError(response.data.results.message)
        setTimeout(() => {
            setError("");
          }, 2300);
          setSteppretDta({})
      }
    } catch (error) {
      console.error("Error moving designs:", error);
    }finally{
        setIsLoading(false)
    }
  };