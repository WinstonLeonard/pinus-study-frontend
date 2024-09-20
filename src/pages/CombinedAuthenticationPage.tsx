import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoginModal,
  selectCreateAccountModal,
  selectVerifyAccountModal,
  selectChangePasswordModal,
  toggleCreateAccount,
  toggleLogin,
  toggleVerifyAccount,
  toggleChangePassword
} from "../redux/features/modal/modal";
import { selectToken, selectId } from "../redux/features/users/userSlice";
import { isLoggedIn } from "../utils";
import { useLocation } from "react-router-dom";
import {
  LoginModal,
  CreateAccountModal,
} from "../components/authentication_modal";
import VerifyAccountModal from "../components/authentication_modal/VerifyAccountModal";
import ChangePasswordModal from "../components/authentication_modal/ChangePasswordModal";

export const CombinedAuthenticationPage = () => {
  const [signUpEmail, setSignUpEmail] = useState<string>("");
  const [signUpUserId, setSignUpUserId] = useState<number>(-1);

  const location = useLocation();

  // States for login / create account modals
  const showLogin = useSelector(selectLoginModal);
  const showCreateAccount = useSelector(selectCreateAccountModal);
  const showVerifyAccount = useSelector(selectVerifyAccountModal);
  const showChangePassword = useSelector(selectChangePasswordModal);

  const userToken = useSelector(selectToken);
  const userId = useSelector(selectId);
  const dispatch = useDispatch();

  const hideAllModals = () => {
    dispatch(toggleLogin(false));
    dispatch(toggleCreateAccount(false));
    dispatch(toggleVerifyAccount(false));
    dispatch(toggleChangePassword(false));
  };

  const showLogInModal = () => {
    dispatch(toggleLogin(true));
    dispatch(toggleCreateAccount(false));
    dispatch(toggleVerifyAccount(false));
    dispatch(toggleChangePassword(false));
  };

  const authoriseCreateAccountModal = () => {
    dispatch(toggleLogin(false));
    dispatch(toggleCreateAccount(true));
    dispatch(toggleVerifyAccount(false));
    dispatch(toggleChangePassword(false));
  };

  const showVerificationModal = (email: string, userId: number) => {
    setSignUpEmail(email);
    setSignUpUserId(userId);
    dispatch(toggleLogin(false));
    dispatch(toggleCreateAccount(false));
    dispatch(toggleVerifyAccount(true));
    dispatch(toggleChangePassword(false));
  }

  const showChangePasswordModal = () => {
    dispatch(toggleLogin(false));
    dispatch(toggleCreateAccount(false));
    dispatch(toggleVerifyAccount(false));
    dispatch(toggleChangePassword(true));
  }

  useEffect(() => {
    if (isLoggedIn(userToken, userId)) {
      hideAllModals();
    }
  }, [userId]);

  // Disables pop-up on route change.
  useEffect(() => {
    hideAllModals();
  }, [location]);

  return (
    <>
      {showLogin ? (
        <LoginModal 
          cancel={hideAllModals} 
          showSignUpModal={authoriseCreateAccountModal} 
          showChangePasswordModal={showChangePasswordModal}
        />
      ) : null}
      {showCreateAccount ? (
        <CreateAccountModal
          cancel={hideAllModals}
          email={signUpEmail}
          showLogInModal={showLogInModal}
          showVerificationModal={showVerificationModal}
        />
      ) : null}
      {showVerifyAccount ? (
        <VerifyAccountModal
          cancel={hideAllModals}
          email={signUpEmail}
          userId={signUpUserId}
        />
      ) : null}
      {showChangePassword ? (
        <ChangePasswordModal
          cancel={hideAllModals}
        />
      ) : null}
    </>
  );
};

export default CombinedAuthenticationPage;
