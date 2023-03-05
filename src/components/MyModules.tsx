import styled from 'styled-components';
import { Colors } from '../constants';

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

export const MyModulesGuest = () => {
    return (
        <MyModulesContainer>
            <MyModulesHeading>My Modules</MyModulesHeading>
                <MyModulesText><div><a href="">Log in</a> to access your subscribed modules.</div></MyModulesText>
        </MyModulesContainer>
    );
}

export const MyModules = () => {
    return (
        <MyModulesContainer>
            <MyModulesHeading>My Modules</MyModulesHeading>
            <Scrollable>
                <MyModulesChildren marginTop='0em'>CS1101S</MyModulesChildren>
                <MyModulesChildren>CS1101S</MyModulesChildren>
                <MyModulesChildren>CS1101S</MyModulesChildren>
                <MyModulesChildren>CS1101S</MyModulesChildren>
                <MyModulesChildren>CS1101S</MyModulesChildren>
                <MyModulesChildren>CS1101S</MyModulesChildren>
                <MyModulesChildren>CS1101S</MyModulesChildren>
                <MyModulesChildren>CS1101S</MyModulesChildren>
            </Scrollable>
        </MyModulesContainer>
    );
}

// export default MyModules;
