import styled from "styled-components";
import { useParams } from "react-router-dom";
import Background from "../components/Background";
import NavigationBar from "../components/Navbar";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { API_URL, Colors } from "../constants";
import MyModules from "../components/MyModules";
import ModuleForum from "../components/ModuleForum";
import SubscriberComponent from "../components/SubscriberComponent";
import { useEffect, useState } from "react";

const SubscribersPageWrapper = styled.div`
    display: grid;
    grid-template-columns: 8.5fr 1.5fr;
    grid-column-gap: 2em;
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
    height: fit;
`

const IconDiv = styled.div`
    margin-left: 16px;
    font-size: 2.25em;
    display: flex;
    place-items: center;
    color: ${Colors.black};
`

const SubscribersCountDiv = styled.div`
    font-size: 1.2em;
    margin-left: 8px;
    display: flex;
    place-items: center;
    color: ${Colors.black};
`

const Heading = styled.span`
    font-family: "Poppins", "sans-serif";
    font-weight: 600;
    font-size: 2.25em;
    color: ${Colors.black};
`

const SubscribersContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 1em;
    grid-row-gap: 1em;
`

const SubscribersPage = () => {
    const { mod } = useParams();
    // const selectedModule = mod? mod.toString() : ""

    const [subscribers, setSubcribers] = useState([{"Id": "0", "Username": "Loading"}]);

    const fetchSubs = () => {
        fetch(API_URL + `/subscribes/${mod?.toUpperCase()}`)
            .then(response => response.json())
            .then(data => {
                console.log("subs", data)
                setSubcribers(data.users)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchSubs();
    }, [])

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
                                {subscribers ? subscribers.length : 0}
                            </SubscribersCountDiv>
                        </HeadingDiv>
                        <SubscribersContainer>
                            {subscribers 
                                ? subscribers.map((subscriber) => (
                                    <SubscriberComponent subscriberId={subscriber.Id} subscriberUsername={subscriber.Username}/>
                                ))
                                : null
                            }
                        </SubscribersContainer>
                    </div>
                    <RightSide>
                        <ModuleForum selectedModule={mod? mod.toString() : ""}/>
                        <MyModules/>
                    </RightSide>
                </SubscribersPageWrapper>
            </Background>
        </div>
    )
}

export default SubscribersPage;
