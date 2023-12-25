import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoginModal,
  selectCreateAccountModal,
  toggleCreateAccount,
  toggleLogin,
} from "../redux/features/modal/modal";
import { selectToken, selectId } from "../redux/features/users/userSlice";
import { isLoggedIn } from "../utils";
import { useLocation } from "react-router-dom";
import {
  LoginModal,
  CreateAccountModal,
} from "../components/authentication_modal";

export const CombinedAuthenticationPage = () => {
  const [signUpEmail, setSignUpEmail] = useState<string>("");

  const location = useLocation();

  // States for login / create account modals
  const showLogin = useSelector(selectLoginModal);
  const showCreateAccount = useSelector(selectCreateAccountModal);

  const userToken = useSelector(selectToken);
  const userId = useSelector(selectId);
  const dispatch = useDispatch();

  const hideAllModals = () => {
    dispatch(toggleLogin(false));
    dispatch(toggleCreateAccount(false));
  };

  const showLogInModal = () => {
    dispatch(toggleLogin(true));
    dispatch(toggleCreateAccount(false));
  };

  const authoriseCreateAccountModal = (email: string) => {
    setSignUpEmail(email);
    dispatch(toggleLogin(false));
    dispatch(toggleCreateAccount(true));
  };

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
        />
      ) : null}
    </>
  );
};

export default CombinedAuthenticationPage;
