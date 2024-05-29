import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../Pages/Utils/Common";
import { LOGIN } from "../../Pages/Services/EndPoints";

export const userLogin = async (userCredentials, setData, setIsLoading) => {
  try {
    setIsLoading(true);
    const response = await apiService.post(LOGIN, {
      username: userCredentials.email,
      password: userCredentials.password,
    });
    console.log("abcd", response?.data?.results?.data[0]?.Usertype);

    if (checkApiStatus(response)) {
      setToLocalstorage(response?.data?.results?.token);
      localStorage.setItem("Usertype", response?.data?.results?.data[0]?.Usertype);
      localStorage.setItem("name", response?.data?.results?.data[0]?.name);
      localStorage.setItem("email",response?.data?.results?.data[0]?.email);
      localStorage.setItem("phone_number", response?.data?.results?.data[0]?.phone_number);
      localStorage.setItem("Loginimage", response?.data?.results?.data[0]?.image);
      setData(response?.data?.results);

    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};
