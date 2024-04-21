import styled from "styled-components";
import { API_URL, Colors} from "../constants";
import Background from "../components/Background";
import MyModules, { ModuleComponentWrapper } from "../components/MyModules";
import NavigationBar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/users/userSlice";
import { RightSide } from "./ModulePage";
import { ScreenSizes } from "../constants";
import { Thread } from "../redux/features/threads/threadSlice";
import { ThreadComponent } from "../components";

const HomePageWrapper = styled.div`
    display: grid;
    grid-template-columns: 8.5fr 1.5fr;
    grid-column-gap: 2em;
    padding: 2em;

    ${ScreenSizes.medium_below} {
        grid-template-columns: 10fr;
        grid-column-gap: 0.25em;
    }

    ${ScreenSizes.large_up} {
        grid-template-columns: 7fr 3fr;
        grid-column-gap: 2em;
    }

    ${ScreenSizes.extra_huge_up} {
        grid-template-columns: 7fr 3fr;
        grid-column-gap: 2em;
    }
`

const Heading = styled.span`
    font-family: "Poppins", "sans-serif";
    font-weight: 600;
    font-size: 2.25em;
    color: ${Colors.dark_grey};
    background: linear-gradient(to bottom, transparent 50%, ${Colors.blue_2_75} 50%);
    padding: 2.5px 5px 2.5px 5px;

    ${ScreenSizes.extra_small} {
        font-size: 26px;
    }
  
    ${ScreenSizes.small_up} {
        font-size: 28px;
    }
  
    ${ScreenSizes.medium_up} {
        font-size: 30px;
    }
  
    ${ScreenSizes.large_up} {
        font-size: 1.15em;
    }
`

const PopularModulesWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 1em;
    grid-row-gap: 1em;
    margin-top: 0.5em;
    margin-bottom: 2em;
    place-items: center; /* Added property to center items */
    background: ${Colors.green_2};
    border: 2px solid;
    border-color: ${Colors.dark_grey};
    padding: 1vw;
    border-radius: 20px;
     

    ${ScreenSizes.extra_small} {
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 0.25em;
        grid-row-gap: 0.25em;
        border: 1px solid;
        box-shadow: 3px 3px 0 ${Colors.blue_3},
            3px 3px 0 1px ${Colors.dark_grey};
    }
  
    ${ScreenSizes.small_up} {
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 0.5em;
        grid-row-gap: 0.5em;
        border: 2px solid ${Colors.dark_grey};
        box-shadow: 7px 7px 0 ${Colors.blue_3},
            7px 7px 0 2px ${Colors.dark_grey};
    }

    ${ScreenSizes.huge_up} {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 0.75em;
        grid-row-gap: 0.75em;
    }
`;


const DisplayWrapper = styled.span`
    font-family: "Poppins", "sans-serif";
    font-weight: 600;
    font-size: 2em;
`

const WelcomeMessage = styled.div`
    background-color: ${Colors.green_2};
    border-radius: 20px;
    border: 2px solid;
    border-color: ${Colors.dark_grey};
    padding: 1.25em;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 0.75em; 
    margin-top: 0.5em;
    margin-bottom: 0.5em;

    ${ScreenSizes.extra_small} {
        font-size: 0.5em; 
        border: 1px solid;
        box-shadow: 3px 3px 0 ${Colors.blue_3},
            3px 3px 0 1px ${Colors.dark_grey};
    }
  
    ${ScreenSizes.small_up} {
        font-size: 0.625em; 
        border: 2px solid;
        box-shadow: 7px 7px 0 ${Colors.blue_3},
            7px 7px 0 2px ${Colors.dark_grey};
    }
  
    ${ScreenSizes.medium_up} {
        font-size: 0.625em; 
    }
  
    ${ScreenSizes.large_up} {
        font-size: 0.625em; 
    }
  
    ${ScreenSizes.extra_large_up} {
        font-size: 0.7em; 
    }
`

const ThreadWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ThreadComponentWrapper = styled.span`
  margin-top: 1em;
`;

const TextContainer = styled.div`
  margin-top: 0.5em;

  ${ScreenSizes.medium_below} {
    margin-top: 1em;
  }
`;

const MostRecentPosts = styled.span`
  font-family: "Poppins", "sans-serif";
  font-size: 1em;
  font-weight: 600;
  color: ${Colors.dark_grey};
  background: linear-gradient(
    to bottom,
    transparent 50%,
    ${Colors.blue_2_75} 50%
  );
  padding: 2.5px 5px 2.5px 5px;

  ${ScreenSizes.medium_below} {
    font-size: 1em;
  }
`;

const FeedbackLink = styled.a`
  color: ${Colors.hyperlink};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  text-decoration: underline;

  &:hover {
    color: ${Colors.hyperlink_hover};
  }
`;

const HomePage = () => {
    const user = useSelector(selectUser);
    const [modules, setModules] = useState<any[]>([]);
    const [threads, setThreads] = useState<Thread[]>([]);
    const isLoggedIn = () => {
        return user.Id !== 0 && user.Token !== "";
    }
    const fetchMod = () => {
        console.log(user.Id);
        fetch(API_URL + `/follow/thread/${user.Id}`)
            .then(response => response.json())
            .then(data => {
              console.log(data);
              setThreads(data.threads?data.threads:[]);
            })
        .catch(error => console.log(error))
    }
    useEffect(() => {
        fetchMod();
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
            const modules = [...data.module_list];
            setModules(modules);
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
                                Have something you want to improve? Fill in this <FeedbackLink href="https://pinusonline.org/contact">feedback form</FeedbackLink>.
                                <br /><br />
                                Have fun studying!
                            </WelcomeMessage>{
                                threads.length > 0 
                                    ? <ThreadWrapper>
                                        <TextContainer>
                                            <MostRecentPosts>Most Recent Posts</MostRecentPosts>
                                        </TextContainer>
                                        {threads.map((thread) => {
                                        return (
                                            <ThreadComponentWrapper>
                                                <ThreadComponent threadId={thread.Id} type="MODULE_PAGE" threadComponent = {thread} />
                                            </ThreadComponentWrapper>
                                        );
                                        })}
                                    </ThreadWrapper>
                                    :<></>
                            }
                        </DisplayWrapper>
                    </div>
                    <div>
                        <MyModules/>
                    </div>
                </HomePageWrapper>
            </Background>
        </div>
    )
}

export default HomePage;
