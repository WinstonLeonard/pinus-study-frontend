import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoginModal,
  selectSignupModal,
  selectCreateAccountModal,
  selectVerifyAccountModal,
  toggleCreateAccount,
  toggleLogin,
  toggleSignup,
  toggleVerifyAccount
} from "../redux/features/modal/modal";
import { selectToken, selectId } from "../redux/features/users/userSlice";
import { isLoggedIn } from "../utils";
import { useLocation } from "react-router-dom";
import {
  LoginModal,
  SignUpModal,
  CreateAccountModal,
} from "../components/authentication_modal";
import VerifyAccountModal from "../components/authentication_modal/VerifyAccountModal";

export const CombinedAuthenticationPage = () => {
  const [signUpEmail, setSignUpEmail] = useState<string>("");

  const location = useLocation();

  // States for login / signup / create account modals
  const showLogin = useSelector(selectLoginModal);
  const showSignup = useSelector(selectSignupModal);
  const showCreateAccount = useSelector(selectCreateAccountModal);
  const showVerifyAccount = useSelector(selectVerifyAccountModal);

  const userToken = useSelector(selectToken);
  const userId = useSelector(selectId);
  const dispatch = useDispatch();

  const hideAllModals = () => {
    dispatch(toggleLogin(false));
    dispatch(toggleSignup(false));
    dispatch(toggleCreateAccount(false));
    dispatch(toggleVerifyAccount(false));
  };

  const showSignUpModal = () => {
    dispatch(toggleLogin(false));
    dispatch(toggleSignup(true));
    dispatch(toggleCreateAccount(false));
    dispatch(toggleVerifyAccount(false));
  };

  const showLogInModal = () => {
    dispatch(toggleLogin(true));
    dispatch(toggleSignup(false));
    dispatch(toggleCreateAccount(false));
    dispatch(toggleVerifyAccount(false));
  };

  const authoriseCreateAccountModal = (email: string) => {
    setSignUpEmail(email);
    dispatch(toggleLogin(false));
    dispatch(toggleSignup(false));
    dispatch(toggleCreateAccount(true));
    dispatch(toggleVerifyAccount(false));
  };

  const showVerificationModal = () => {
    dispatch(toggleLogin(false));
    dispatch(toggleSignup(false));
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
        <LoginModal cancel={hideAllModals} showSignUpModal={showSignUpModal} />
      ) : null}
      {showSignup ? (
        <SignUpModal
          cancel={hideAllModals}
          showLogInModal={showLogInModal}
          authoriseCreateAccountModal={authoriseCreateAccountModal}
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
          showLogInModal={showLogInModal}
        />
      ) : null}
    </>
  );
};

export default CombinedAuthenticationPage;
