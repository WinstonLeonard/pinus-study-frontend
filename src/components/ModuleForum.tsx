import { useEffect, useState } from "react";
import styled from "styled-components";
import { API_URL, Colors } from "../constants";
import { Module, ModuleInitialState } from "../features/modules/moduleSlice";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

export const RedButton = styled.div`
    font-family: 'Poppins', 'sans-serif';
    color: ${Colors.white};
    background-color: ${Colors.red};
    width: inherit;
    border-radius: 20px;
    font-weight: 700;
    font-size: 1em;
    padding: 8px 0px;
    display: grid;
    place-items: center;
    cursor: pointer;
`

const ForumBackground = styled.div`
    border-radius: 20px;
    width: 17.5vw;
    max-width: 17.5vw;
    height: 45vh;
    padding: 1.5em;
    border: none;
    border-radius: 20px;
    background-color: ${Colors.yellow};
    color: ${Colors.white};
    font-family: 'Poppins', 'sans-serif';
`

const Top = styled.div`
    height: 50%;
    vertical-align: top;
`

const Bottom = styled.div`
    display: grid;
    height: 50%;
    vertical-align: bottom;
    align-content: end;
    gap: 8px;
`

const ForumHeading = styled.div`
    color: ${Colors.white};
    font-weight: 700;
    font-size: 1.8em;
    text-decoration: underline;
`

const ForumDesc = styled.span`
    display: inline;
    whitespace: nowrap;
    color: ${Colors.white};
    font-weight: 500;
    font-size: 1em;
`

const RedLink = styled.a`
    width: 20px;
    color: ${Colors.red};
    font-weight: 500;
    font-size: 1em;
    text-decoration: underline;
`

const SubscriberDiv = styled.div`
    display: flex;
`

const SubscriberDesc = styled.a`
    color: ${Colors.white};
    font-weight: 500;
    font-size: 1em;
    text-decoration: underline;
    margin-left: 0.5em;
`

const ModuleForum = ({ selectedModule } : { selectedModule : string }) => {
    const [module, setModule] = useState<Module>(ModuleInitialState);

    const fetchMod = () => {
        fetch(API_URL + `/module/${selectedModule.toUpperCase()}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setModule(data.module);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchMod();
    }, [])

    return (
        <div>
            <ForumBackground>
                <Top>
                    <ForumHeading>
                        {module.Id} Forum
                    </ForumHeading>
                    <div>
                        <ForumDesc>
                            {module.Name}
                        </ForumDesc>
                    </div>
                    <div>
                        <ForumDesc>
                            {`Link to `}
                            <RedLink href="">
                                resources archive
                            </RedLink>
                        </ForumDesc>
                    </div>
                </Top>
                <Bottom>
                    <SubscriberDiv>
                        <PeopleAltIcon/>
                        <SubscriberDesc href={`/subscribers/${selectedModule}`}>
                            {module.SubscriberCount} subscribers
                        </SubscriberDesc>
                    </SubscriberDiv>
                    <RedButton>
                        Subscribe
                    </RedButton>
                </Bottom>
            </ForumBackground>
        </div>
    );
}

export default ModuleForum;