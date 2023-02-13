import styled from "styled-components";
import { useParams } from "react-router-dom";
import Background from "../components/Background";
import NavigationBar from "../components/Navbar";
import { Colors } from "../constants";
import MyModules from "../components/MyModules";
import ModuleForum from "../components/ModuleForum";
import ThreadList from "../components/ThreadList";

const ModulePageWrapper = styled.div`
    display: grid;
    grid-template-columns: 8.5fr 1.5fr;
    grid-column-gap: 1em;
    padding: 2em;
`

const ModuleGridWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 1em;
    grid-row-gap: 1em;
`

const RightSide = styled.div`
    display: grid;
`

const HeadingDiv = styled.div`
    margin-bottom: 1em;
`

const HeadingWrapper = styled.span`
    width: 100%;
    display: flex;
    
`

const Heading = styled.span`
    font-family: "Poppins", "sans-serif";
    font-weight: 600;
    font-size: 2.25em;
    color: ${Colors.white};
`

const HeadingItalic = styled(Heading)`
    font-style: italic;
`

const MyModulesDiv = styled.div`
    display: grid;
    align-items: center;
    padding: calc(2em + 20px);
`

const ModuleForumDiv = styled.div`
    display: grid;
    align-items: center;
    padding: calc(2em + 20px);
`

const ModulePage = () => {
    const { mod } = useParams();

    return (
        <div>
            <NavigationBar/>
            <Background>
                <ModulePageWrapper>
                    <div>
                        <HeadingDiv>
                            <Heading>
                                Discussion Forum
                            </Heading>
                        </HeadingDiv>
                        <ThreadList selectedModule="CS1231"/>
                    </div>
                    <RightSide>
                        <ModuleForumDiv>
                            <ModuleForum selectedModule="CS1231"/>
                        </ModuleForumDiv>
                        <MyModulesDiv>
                            <MyModules/>
                        </MyModulesDiv>
                    </RightSide>
                </ModulePageWrapper>
            </Background>
        </div>
    )
}

export default ModulePage;