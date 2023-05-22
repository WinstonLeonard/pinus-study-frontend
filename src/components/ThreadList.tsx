import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_URL } from '../constants';
import { Module, ModuleInitialState } from '../redux/features/modules/moduleSlice';
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
    // const [noThreadsFound, setNoThreadsFound] = useState<Boolean>(true);

    const fetchMod = () => {
        fetch(API_URL + `/module/${selectedModule.toUpperCase()}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setModule(data.module)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchMod();
    }, [])

    const renderThreadList = () => {
        const curr_thread = module.Threads;
        console.log(curr_thread);

        return (
            <ThreadWrapper>
                {module === (ModuleInitialState) || curr_thread === null 
                    ? null
                    : curr_thread.sort((a, b) => b.Timestamp.localeCompare(a.Timestamp)).map(thread => {
                        return (
                            <ThreadComponentWrapper>
                                <ThreadComponent threadId={thread.Id}/>
                            </ThreadComponentWrapper>
                        )
                    })
                }
            </ThreadWrapper>
        )
    }

    return renderThreadList();

}

export default ThreadList