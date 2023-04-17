import styled from "styled-components";
import { API_URL, Colors} from "../constants";
import Background from "../components/Background";
import MyModules, { ModuleComponentWrapper } from "../components/MyModules";
import NavigationBar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/users/userSlice";
import { RightSide } from "./ModulePage";

const HomePageWrapper = styled.div`
    display: grid;
    grid-template-columns: 8.5fr 1.5fr;
    grid-column-gap: 1em;
    padding: 2em;
`

const Heading = styled.span`
    font-family: "Poppins", "sans-serif";
    font-weight: 600
    font-size: 2.25em;
    color: ${Colors.white};
`

const PopularModulesWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 1em;
    grid-row-gap: 1em;
    margin-top: 0.5em;
    margin-bottom: 2em;
    place-items: center; /* Added property to center items */
`;


const DisplayWrapper = styled.span`
    font-family: "Poppins", "sans-serif";
    font-weight: 600;
    font-size: 2em;
`

const WelcomeMessage = styled.div`
    background-color: ${Colors.white};
    border-radius: 20px;
    padding: 1.25em;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 0.75em; 
    margin-top: 0.5em;
    margin-bottom: 0.5em;
`

const FeedbackLink = styled.a`
  color: ${Colors.blue};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${Colors.light_blue};
  }
`;

const HomePage = () => {
    const user = useSelector(selectUser);
    const [modules, setModules] = useState<any[]>([]);

    const isLoggedIn = () => {
        return user.Id !== 0 && user.Token !== "";
    }

    useEffect(() => {
        fetch(API_URL + `/module`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                keyword: "",
                page: 1,
            }),
        }).then(response => response.json())
        .then(data => {
            const sortedModules = [...data.module_list].sort((a, b) => b.SubscriberCount - a.SubscriberCount);
            setModules(sortedModules);
        });
    }, []);

    return (
        <div>
            <NavigationBar/>
            <Background>
                <HomePageWrapper>
                    <div>
                        <DisplayWrapper>
                            <Heading>Popular Modules</Heading><br></br>
                            <PopularModulesWrapper>
                                {modules.map(module => (
                                    <ModuleComponentWrapper key={module.Id} moduleCode={module.Id} />
                                ))}
                            </PopularModulesWrapper>
                            <Heading>What is PINUS Study?</Heading>
                            <WelcomeMessage>
                                PINUS Study is a platform built for PINUSians where they can interact and open a discussion thread for modules.
                                <br /><br />
                                Have something you want to improve? Fill in this <FeedbackLink href="https://forms.gle/ye8m37mFog1bQ167A">feedback form</FeedbackLink>.
                                <br /><br />
                                Have fun studying!
                            </WelcomeMessage>
                        </DisplayWrapper>
                    </div>
                    <RightSide>
                        <MyModules />
                    </RightSide>
                </HomePageWrapper>
            </Background>
        </div>
    )
}

export default HomePage;
