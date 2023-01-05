import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_URL, Colors } from '../../constants';
import { Thread, ThreadInitialState } from '../../features/threads/threadSlice';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';

const ThreadContainer = styled.button`
    background-color: ${Colors.white};
    width: 50vw;
    border-radius: 20px;
    border: none;
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

const RegularText = styled.span`
    font-family: 'Poppins', sans-serif;
    font-size: 1.25em; 
`
const PostedSince = styled(RegularText)`
    float: right;
`
const TextArea = styled.span`
    display: inline-block;
    font-family: 'Poppins-Medium', sans-serif;
    font-size: 1.5em; 
    margin-top: 0.5em;
    margin-bottom: 0.5em;
`

/**
 * Thread preview shown on the Module Page.
 * 
 * @param threadId The thread id to fetch the data.
 */
const ModulePageThread = ({threadId} : any) => {
    const [thread, setThread] = useState<Thread>(ThreadInitialState);

    /**
     * Hook to fetch thread data.
     */
    useEffect(() => {
        fetch(API_URL + `/thread/${threadId}`)
            .then((response) => response.json())
            .then((data) => {
                setThread(data.thread);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    /**
     * Shortens the content to max. 150 characters to prevent the 
     * post preview from being too long.
     * 
     * @param content The full content of the thread.
     * @returns The shortened content of the thread.
     */
    const shortenLongPosts = (content : string) : string => {
        if (content.length > 150) {
            return content.substring(0, 150) + "...";
        }
        return content;
    }

    return (
        <ThreadContainer>
            <PostedSince>4d</PostedSince>
            <StyledQuestionTitle>{thread.Title}</StyledQuestionTitle>
            <br/>
            <RegularText>Posted by {thread.Username}</RegularText>
            <br/>
            <TextArea>{shortenLongPosts(thread.Content)}</TextArea>
            <br/>
            <CommentOutlinedIcon sx={{fontSize: "1.375em"}}/>
            <RegularText> {thread.Comments || 0}</RegularText>
        </ThreadContainer>
    )
}

export default ModulePageThread;