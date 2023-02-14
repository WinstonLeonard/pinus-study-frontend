import styled from "styled-components";
import { useParams } from "react-router-dom";
import Background from "../components/Background";
import NavigationBar from "../components/Navbar";
import { Colors } from "../constants";
import MyModules from "../components/MyModules";
import ModuleForum, { RedButton } from "../components/ModuleForum";
import ThreadList from "../components/ThreadList";

const ModulePageWrapper = styled.div`
    display: grid;
    grid-template-columns: 8.5fr 1.5fr;
    grid-column-gap: 1em;
    padding: 2em;
`

const RightSide = styled.div`
    display: grid;
`

const HeadingDiv = styled.div`
    display: flex;
    vertical-align: middle;
    margin-bottom: 1em;
    width: 100%;
`

const Heading = styled.span`
    width: 50%;
    font-family: "Poppins", "sans-serif";
    font-weight: 600;
    font-size: 2em;
    color: ${Colors.white};
`

const ButtonDiv = styled.div`
    width: 50%;
    display: flex;
    justify-content: end;
`

const ThreadListContainer = styled.div`
    margin-left: 8px;
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
                            <ButtonDiv>
                                <RedButton>
                                    + New Post
                                </RedButton>
                            </ButtonDiv>
                        </HeadingDiv>
                        <ThreadListContainer>
                            <ThreadList selectedModule="CS1231"/>
                        </ThreadListContainer>
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