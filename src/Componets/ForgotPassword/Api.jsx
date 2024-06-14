import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import {
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from "../../Pages/Services/EndPoints";
import { setToLocalstorage } from "../../Pages/Utils/Common";

export const forgot_password = async (
  setIsLoading,
  emailId,
  setSuccessModalOpen,
  setSuccessMessage,
  setIsStatus,
  navigate
) => {
  setIsLoading(true);
  try {
    const body = { email: emailId };
    console.log(body, "bodyAssi");
    const response = await apiService.post(FORGOT_PASSWORD, body);
    if (response.data.results.status_code === 200) {
      setIsLoading(false);
      setSuccessModalOpen(true);
      setSuccessMessage("Reset password code sent to your email");
      localStorage.setItem('emailforgot', emailId);
      setTimeout(() => {
        setSuccessModalOpen(false);

        navigate(`/verifyotp`);
        setIsStatus(response.data.results.status_code);
      }, 2500);
    }
  } catch (error) {
    console.error("Error moving designs:", error);
    setIsLoading(false)
    // setLoadingStates((prev) => ({ ...prev, [usersId]: false }));
  }
};

export const reset_password = async (
  setIsLoading,
  newPassword,
  confirmPassword,
  navigate,
  setErrorMessageBack,
  storedotp,
  storedEmail,
) => {
  setIsLoading(true);
  try {
    const body = {
        email: storedEmail,
        code: storedotp,
        new_password: newPassword,
        confirm_password: confirmPassword
    };
    console.log(body, "bodyAssi");
    const response = await apiService.post(RESET_PASSWORD, body);
    if (response.data.results.status_code === 200) {
    //   setIsLoading(false);
    //   setSuccessModalOpen(true);
    //   setSuccessMessage("Reset password code sent to your email");
    //   setTimeout(() => {
    //     setSuccessModalOpen(false);
    //     setIsStatus(response.data.results.status_code);
    //   }, 2500);
    localStorage.removeItem('emailforgot');
      localStorage.removeItem('otpforgot');
    navigate("/resetcomplete")
    }
  } catch (error) {
    console.error("Error moving designs:", error);
    setErrorMessageBack(error.response.data.results.error)
    // setLoadingStates((prev) => ({ ...prev, [usersId]: false }));
  }
};
