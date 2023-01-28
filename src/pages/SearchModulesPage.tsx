import Background from "../components/Background";
import NavigationBar from "../components/Navbar";
import styled from "styled-components";
import { Colors } from "../constants";

const ModuleComponent = styled.div`
    width: 12.5vw;
    height: 8vw;
    border: none;
    border-radius: 20px;
    background-color: ${Colors.yellow};
    color: ${Colors.white};
    font-family: 'Poppins', 'sans-serif';
    font-weight: 400;
    font-size: 2em;
    padding: 0.75vw;
`

const SearchModulesPage = () => {
    return (
        <div>
            <NavigationBar />
            <Background>
                <ModuleComponent>CS1101S</ModuleComponent>
            </Background>
        </div>
    )
}

export default SearchModulesPage;