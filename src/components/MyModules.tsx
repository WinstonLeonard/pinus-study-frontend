import { useEffect } from 'react';
import styled from 'styled-components';
import { Colors } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLogin } from '../redux/features/modal/modal';
import { selectId, selectToken, selectUser } from '../redux/features/users/userSlice';
import { getUserDetailsRequest } from '../requests';
import { isLoggedIn } from '../utils';

export const ModuleComponent = styled.div`
    cursor: pointer;
    width: 15vw;
    height: 8vw;
    border: none;
    border-radius: 20px;
    background-color: ${Colors.yellow};
    color: ${Colors.white};
    font-family: 'Poppins', 'sans-serif';
    font-weight: 600;
    // font-size: 1.25em;
    font-size: 2.5vw;
    // padding: 0.5vw 1vw 0.5vw 1vw;
    padding: 7px 12px 7px 12px;
    :hover {
        background-color: ${Colors.yellow_accent};
        color: ${Colors.white_accent};
    }

    @media (max-width: 1200px) {
      width: 200px;
      height: 108px;
      font-size: 30px;
  }
`

const MyModulesContainer = styled.div`
    background-color: ${Colors.white};
    border-radius: 20px;
    width: 17.5vw;
    max-width: 17.5vw;
    min-height: 70vh;
    max-height: 70vh;
    padding: 1.5em;
    display: flex;
    flex-direction: column;
`

const MyModulesHeading = styled.span`
    font-family: "Poppins", "sans-serif";
    font-weight: 600;
    color: ${Colors.dark_grey};
    font-size: 1.625em;
`

const MyModulesText = styled.span`
    padding-top: 1.25em;
    display: flex;
    font-family: "Poppins", "sans-serif";
    font-weight: 500;
    font-size: 1.25em;
    font-style: italic;
`

const MyModulesChildren = styled.div<{marginTop? : string}>`
    background-color: ${Colors.yellow};
    border-radius: 20px;
    color: ${Colors.white};
    cursor: pointer;
    font-family: "Poppins", "sans-serif";
    font-weight: 600;
    font-size: 2.25em;
    padding: 0.25em 0.5em 0.25em 0.5em;
    margin-top: ${props => props.marginTop? props.marginTop : "0.375em"};
    margin-bottom: 0.375em;
    :hover {
        background-color: ${Colors.yellow_accent};
        color: ${Colors.white_accent};
        transform: scale(1.05);
    }
`

const Scrollable = styled.div`
    margin-top: 0.75em;
    overflow-y: scroll;
    height: 60vh;
`

export const MyModulesDiv = styled.div`
    display: grid;
    align-items: center;
    padding: 1.25em calc(2em + 20px);
`

export const ModuleComponentWrapper = ({ moduleCode }: { moduleCode: string }) => {  
  const handleButtonClick = () => {
    // Redirect to the desired URL on button click
    window.location.href = "/module/" + moduleCode 
  };

  return (
    <ModuleComponent onClick={handleButtonClick}>
      {moduleCode}
    </ModuleComponent>
  );
};

const MyModulesChildrenWrapper = ({ moduleCode }: { moduleCode: string }) => {  
    const handleButtonClick = () => {
      // Redirect to the desired URL on button click
      window.location.href = "/module/" + moduleCode 
    };
  
    return (
      <MyModulesChildren onClick={handleButtonClick}>
        {moduleCode}
      </MyModulesChildren>
    );
  };

const LoginText = styled.span`
  color: ${Colors.blue};
  cursor: pointer;

  &:hover {
    color: ${Colors.light_blue};
  }
`;

const MyModulesGuest = () => {
  const dispatch = useDispatch();

  return (
    <MyModulesContainer>
      <MyModulesHeading>My Modules</MyModulesHeading>
      <MyModulesText>
        <div>
          <LoginText onClick={() => dispatch(toggleLogin(true))}>Log in</LoginText> to access your subscribed modules.
        </div>
      </MyModulesText>
    </MyModulesContainer>
  );

}

const MyModulesLoggedIn = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserDetailsRequest(user.Id, dispatch);
  }, [])

  return (
    <MyModulesContainer>
      <MyModulesHeading>My Modules</MyModulesHeading>
      <Scrollable>
        {user.Modules.map(moduleCode => <MyModulesChildrenWrapper moduleCode={moduleCode}/>)}
      </Scrollable>
    </MyModulesContainer>
  );
}

const MyModules = () => {
  const userId = useSelector(selectId);
  const token = useSelector(selectToken);

  return (
    <MyModulesDiv>
      { isLoggedIn(token, userId) ? <MyModulesLoggedIn /> : <MyModulesGuest /> }
    </MyModulesDiv>
  )
}

export default MyModules;
