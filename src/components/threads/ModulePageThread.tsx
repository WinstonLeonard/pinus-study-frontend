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

    /**
     * Parses the timestamp to produce the duration since the
     * thread was made.
     * 
     * @param timestamp The timestamp fetched from the database.
     * @returns The duration since the thread.
     */
    const parseDuration = (timestamp : string) : string => {
        const parsedTimestamp = Date.parse(timestamp);
        const datePosted = new Date(parsedTimestamp);
        const durationInMillieconds = Date.now().valueOf() - datePosted.valueOf();
        const seconds = Math.floor(durationInMillieconds / 1000);

        // years are defined as 365 days + 1/4 days to account for leap year
        const years = Math.ceil(seconds / 31557600);

        // months are standardized to 30 days
        const months = Math.ceil(seconds / 2628288);
        const days = Math.ceil(seconds / 86400);
        const hours = Math.ceil(seconds / 3600);
        const minutes = Math.ceil(seconds / 60);

        if (years >= 1) {
            return years + "y";
        } else if (months >= 1) {
            return months + "mo";
        } else if (days >= 1) {
            return days + "d";
        } else if (hours >= 1) {
            return hours + "h";
        } else if (minutes >= 1) {
            return minutes + "m";
        } else {
            return seconds + "s";
        }
    }

    return (
        <ThreadContainer>
            <PostedSince>{parseDuration(thread.Timestamp)}</PostedSince>
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