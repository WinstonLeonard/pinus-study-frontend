import styled from "styled-components";
import { useParams } from "react-router-dom";
import Background from "../components/Background";
import NavigationBar from "../components/Navbar";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Colors } from "../constants";
import MyModules from "../components/MyModules";
import ModuleForum, { RedButton } from "../components/ModuleForum";
import ThreadList from "../components/ThreadList";

const SubscribersPageWrapper = styled.div`
    display: grid;
    grid-template-columns: 8.5fr 1.5fr;
    grid-column-gap: 1em;
    padding: 2em;
`

const RightSide = styled.div`
    display: flex;
    flex-direction: column;
`

const HeadingDiv = styled.div`
    display: flex;
    vertical-align: middle;
    margin-bottom: 1em;
    color: white;
`

const IconDiv = styled.div`
    margin-left: 12px;
    font-size: 2.25em;
`

const SubscribersCountDiv = styled.div`
    font-size: 1.2em;
`

const Heading = styled.span`
    font-family: "Poppins", "sans-serif";
    font-weight: 600;
    font-size: 2.25em;
    color: ${Colors.white};
`

const ThreadListContainer = styled.div`
    margin-left: 8px;
`

const MyModulesDiv = styled.div`
    display: grid;
    align-items: center;
    padding: 1.25em calc(2em + 20px);
`

const ModuleForumDiv = styled.div`
    display: grid;
    align-items: center;
    padding: 1.25em calc(2em + 20px);
`

const SubscribersPage = () => {
    const { mod } = useParams();

    return (
        <div>
            <NavigationBar/>
            <Background>
                <SubscribersPageWrapper>
                    <div>
                        <HeadingDiv>
                            <Heading>
                                Subscribers
                            </Heading>
                            <IconDiv>
                                <PeopleAltIcon/>
                            </IconDiv>
                            <SubscribersCountDiv>

                            </SubscribersCountDiv>
                        </HeadingDiv>
                        <ThreadListContainer>
                            <ThreadList selectedModule={mod? mod.toString() : ""}/>
                        </ThreadListContainer>
                    </div>
                    <RightSide>
                        <ModuleForumDiv>
                            <ModuleForum selectedModule={mod? mod.toString() : ""}/>
                        </ModuleForumDiv>
                        <MyModulesDiv>
                            <MyModules/>
                        </MyModulesDiv>
                    </RightSide>
                </SubscribersPageWrapper>
            </Background>
        </div>
    )
}

export default SubscribersPage;