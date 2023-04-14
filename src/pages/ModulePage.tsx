import styled from "styled-components";
import { useParams } from "react-router-dom";
import Background from "../components/Background";
import NavigationBar from "../components/Navbar";
import { Colors } from "../constants";
import MyModules from "../components/MyModules";
import ModuleForum, { RedButton } from "../components/ModuleForum";
import ThreadList from "../components/ThreadList";
import { useSelector } from "react-redux";
import { selectId, selectToken } from "../redux/features/users/userSlice";

const ModulePageWrapper = styled.div`
    display: grid;
    grid-template-columns: 8.5fr 1.5fr;
    grid-column-gap: 1em;
    padding: 2em;
`

export const RightSide = styled.div`
    display: flex;
    flex-direction: column;
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

const ModuleForumDiv = styled.div`
    display: grid;
    align-items: center;
    padding: 1.25em calc(2em + 20px);
`

const ModulePage = () => {
    const { mod } = useParams();
    const userId = useSelector(selectId);
    const token = useSelector(selectToken);

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
                            <ThreadList selectedModule={mod? mod.toString() : ""}/>
                        </ThreadListContainer>
                    </div>
                    <RightSide>
                        <ModuleForumDiv>
                            <ModuleForum selectedModule={mod? mod.toString() : ""}/>
                        </ModuleForumDiv>
                        <MyModules />
                    </RightSide>
                </ModulePageWrapper>
            </Background>
        </div>
    )
}

export default ModulePage;
