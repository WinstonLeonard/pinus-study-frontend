import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Colors } from '../constants';
import { API_URL } from '../constants';

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
    font-size: 1.25em;
    padding: 0.5vw 1vw 0.5vw 1vw;
    :hover {
        background-color: ${Colors.yellow_accent};
        color: ${Colors.white_accent};
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
    padding: 1.25em;
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
    }
`

const Scrollable = styled.div`
    margin-top: 0.75em;
    overflow-y: scroll;
    height: 60vh;
`

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

export const MyModulesGuest = () => {
    return (
        <MyModulesContainer>
            <MyModulesHeading>My Modules</MyModulesHeading>
                <MyModulesText><div><a href="/">Log in</a> to access your subscribed modules.</div></MyModulesText>
        </MyModulesContainer>
    );
}

export const MyModules = () => {
    const [myModules, setMyModules] = useState([])
    const DUMMY_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2ODEyMzI5NzIsInVzZXJfaWQiOjIyfQ.9h6GEq9WhdxAuYZwg3AbF0IT4WZagAUZQ9LuVOENZOA"
    const DUMMY_USERID = 22
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(API_URL + `/me`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${DUMMY_TOKEN}`,
              },
              mode: 'cors',
              body: JSON.stringify({ userid: DUMMY_USERID }),
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
    
            const jsonData = await response.json();
            setMyModules(jsonData.MyModules)
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
    }, []);


    return (
        <MyModulesContainer>
            <MyModulesHeading>My Modules</MyModulesHeading>
            <Scrollable>
                {myModules.map(moduleCode => <MyModulesChildrenWrapper moduleCode={moduleCode}/>)}
                {/* {myModules.slice(1).map(i => <MyModulesChildren>{i}</MyModulesChildren>)} */}
            </Scrollable>
        </MyModulesContainer>
    );
}

export default MyModules;
