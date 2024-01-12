import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoginModal,
  selectCreateAccountModal,
  selectVerifyAccountModal,
  toggleCreateAccount,
  toggleLogin,
  toggleVerifyAccount
} from "../redux/features/modal/modal";
import { selectToken, selectId } from "../redux/features/users/userSlice";
import { isLoggedIn } from "../utils";
import { useLocation } from "react-router-dom";
import {
  LoginModal,
  CreateAccountModal,
} from "../components/authentication_modal";
import VerifyAccountModal from "../components/authentication_modal/VerifyAccountModal";

export const CombinedAuthenticationPage = () => {
  const [signUpEmail, setSignUpEmail] = useState<string>("");
  const [signUpUserId, setSignUpUserId] = useState<number>(-1);

  const location = useLocation();

  // States for login / create account modals
  const showLogin = useSelector(selectLoginModal);
  const showCreateAccount = useSelector(selectCreateAccountModal);
  const showVerifyAccount = useSelector(selectVerifyAccountModal);

  const userToken = useSelector(selectToken);
  const userId = useSelector(selectId);
  const dispatch = useDispatch();

  const hideAllModals = () => {
    dispatch(toggleLogin(false));
    dispatch(toggleCreateAccount(false));
    dispatch(toggleVerifyAccount(false));
  };

  const showLogInModal = () => {
    dispatch(toggleLogin(true));
    dispatch(toggleCreateAccount(false));
    dispatch(toggleVerifyAccount(false));
  };

  const authoriseCreateAccountModal = () => {
    dispatch(toggleLogin(false));
    dispatch(toggleCreateAccount(true));
    dispatch(toggleVerifyAccount(false));
  };

  const showVerificationModal = (email: string, userId: number) => {
    setSignUpEmail(email);
    setSignUpUserId(userId);
    dispatch(toggleLogin(false));
    dispatch(toggleCreateAccount(false));
    dispatch(toggleVerifyAccount(true));
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
        <LoginModal cancel={hideAllModals} showSignUpModal={authoriseCreateAccountModal} />
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
    </>
  );
};

export default CombinedAuthenticationPage;
