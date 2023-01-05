import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_URL, Colors } from '../../constants';
import { Thread, ThreadInitialState } from '../../features/threads/threadSlice';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';

const ThreadContainer = styled.div`
    background-color: ${Colors.white};
    width: 50vw;
    border-radius: 20px;
    padding: 1.5em;
    text-align: left;

    :hover {
        background-color: ${Colors.white_accent};
    }
`

const StyledQuestionTitle = styled.span`
    font-family: 'Poppins-Medium', sans-serif;
    font-size: 1.875em; 
`

const PostedBy = styled.span`
    font-family: 'Poppins', sans-serif;
    font-size: 1.25em; 
`
const PostedSince = styled(PostedBy)`
    float: right;
`
const TextArea = styled.span`
    font-family: 'Poppins-Medium', sans-serif;
    font-size: 1.5em; 
`

const ModulePageThread = () => {
    const [thread, setThread] = useState<Thread>(ThreadInitialState);

    // Hook to fetch data
    useEffect(() => {
        fetch(API_URL + "/thread/2")
            .then((response) => response.json())
            .then((data) => {
                setThread(data);
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <ThreadContainer>
            <PostedSince>4d</PostedSince>
            <StyledQuestionTitle>Question Title</StyledQuestionTitle>
            <br/>
            <PostedBy>Posted by @why_am_i_still_here</PostedBy>
            <br/>
            <TextArea>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum bibendum sem eget neque maximus, sit amet placerat lacus ultrices. Mauris eget maximus turpis</TextArea>
            <br/>
            <CommentOutlinedIcon sx={{fontSize: "1.25em"}}/>
            <PostedBy> 37</PostedBy>
        </ThreadContainer>
    )
}

export default ModulePageThread;