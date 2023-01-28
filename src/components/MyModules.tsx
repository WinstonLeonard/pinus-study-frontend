import styled from 'styled-components';
import { Colors } from '../constants';

const MyModulesContainer = styled.div`
    background-color: ${Colors.white};
    border-radius: 20px;
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
`

const Scrollable = styled.div`
    margin-top: 0.75em;
    overflow-y: scroll;
    height: 60vh;
`

const MyModules = () => {
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

export default MyModules;
