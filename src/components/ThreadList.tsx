import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_URL, Colors } from '../constants';
import { Module, ModuleInitialState } from '../features/modules/moduleSlice';
import ThreadComponent from './ThreadComponent';

const ThreadWrapper = styled.span`
    display: flex;  
    flex-direction: column;
`

const ThreadComponentWrapper = styled.span`
    margin-top:1em;
`
// const ThreadWrapper = styled.span`
//     display: flex;
//     flex-direction: column;
//     margin-top: 1rem; 
// `

const ThreadList = ({ selectedModule } : { selectedModule : string }) => {
    const [module, setModule] = useState<Module>(ModuleInitialState);

    const fetchMod = () => {
        fetch(API_URL + `/module/${selectedModule}`)
            .then(response => response.json())
            .then(data => setModule(data.module))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchMod();
    }, [])

    const renderThreadList = () => {
        const curr_thread = module.Threads
        return (
            <ThreadWrapper>
                {curr_thread.map(thread => {
                    return (
                        <ThreadComponentWrapper>
                            <ThreadComponent threadId={thread.Id}/>
                        </ThreadComponentWrapper>
                    )
                })}
            </ThreadWrapper>
        )
    }

    return renderThreadList();

}

export default ThreadList