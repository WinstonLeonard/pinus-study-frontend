import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_URL, Colors } from '../../constants';
import { Thread, ThreadInitialState } from '../../features/threads/threadSlice';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

export type ThreadType = "MODULE_PAGE" | "THREAD_PAGE";

const VerticalCenterAlignLayout = styled.div`
    display: flex;
    align-items: center;
`

const ThreadContainerButton = styled.button`
    background-color: ${Colors.white};
    width: 50vw;
    border-radius: 20px;
    border: none;
    padding: 1.5em;
    text-align: left;
    font-size: 12px;

    :hover {
        background-color: ${Colors.white_accent};
    }
`

const ThreadContainerDiv = styled.div`
    background-color: ${Colors.white};
    width: 50vw;
    border-radius: 20px;
    border: none;
    padding: 1.5em;
    text-align: left;
    font-size: 12px;
`

const StyledQuestionTitle = styled.span`
    font-family: 'Poppins-Medium', sans-serif;
    font-size: 1.875em; 
`

const Text = styled.span`
    font-size: 1.25em; 
`

const RegularText = styled(Text)`
    font-family: 'Poppins', sans-serif;
`

const MediumText = styled(Text)`
    font-family: 'Poppins-Medium', sans-serif;
`

const ReplyText = styled(MediumText)`
    :hover {
        text-decoration: underline;
    }
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

const ThumbButton = styled.button`
    border: none;

    :hover {
        background-color: ${Colors.white_accent};
    }
`

/**
 * Thread preview shown on the Module Page.
 * 
 * @param threadId The thread id to fetch the data.
 * @param threadType The type of thread to be rendered.
 */
const ThreadComponent = ({threadId , type} : {threadId : number, type? : ThreadType}) => {
    const [thread, setThread] = useState<Thread>(ThreadInitialState);
    const [liked, setLiked] = useState<Boolean>(false);
    const [openReply, setOpenReply] = useState<Boolean>(false);

    /* For navigating from module page to thread page */
    // const navigate = useNavigate();

    // const navigateToThreadPage = () => {
    //     navigate("INSERT_PATH_HERE")
    // }

    /**
     * Fetches thread data from the backend.
     */
    const fetchThreadData = () => {
        fetch(API_URL + `/thread/${threadId}`)
            .then((response) => response.json())
            .then((data) => {
                setThread(data.thread);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    /**
     * Fetches liked status from the backend.
     */
    const fetchLikeStatus = () => {
        fetch(API_URL + `/likes/thread/${threadId}/${thread.AuthorId}`)
            .then(response => response.json())
            .then(data => setLiked(data.state))
            .catch(error => console.log(error));
    }

    /**
     * Hook to fetch data.
     */
    useEffect(() => {
        fetchThreadData();
        if (type === "THREAD_PAGE") {
            fetchLikeStatus();
        }
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

    const renderModulePageThread = () => {
        return (
            <ThreadContainerButton>
                <PostedSince>{parseDuration(thread.Timestamp)}</PostedSince>
                <StyledQuestionTitle>{thread.Title}</StyledQuestionTitle>
                <br/>
                <RegularText>Posted by {thread.Username}</RegularText>
                <br/>
                <TextArea>{shortenLongPosts(thread.Content)}</TextArea>
                <br/>
                <CommentOutlinedIcon sx={{fontSize: "1.375em"}}/>
                <RegularText> {thread.Comments || 0}</RegularText>
            </ThreadContainerButton>
        )
    }

    const renderThreadPageThread = () => {
        return (
            <ThreadContainerDiv>
                <PostedSince>{parseDuration(thread.Timestamp)}</PostedSince>
                <StyledQuestionTitle>{thread.Title}</StyledQuestionTitle>
                <br/>
                <RegularText>Posted by {thread.Username}</RegularText>
                <br/>
                <TextArea>{thread.Content}</TextArea>
                <br/>
                <VerticalCenterAlignLayout>
                    <ThumbButton>
                        {liked? <ThumbUpIcon/> : <ThumbUpOutlinedIcon/>}
                    </ThumbButton>
                    {/* &#8195; (Em Space) and &#8196; (Three-Per-Em Space) are Unicode spaces. */}
                    <MediumText>&#8196;{thread.LikesCount}&#8195;</MediumText>
                    <ThumbButton>
                        <ThumbDownIcon></ThumbDownIcon>
                    </ThumbButton>
                    <MediumText>&#8196;{thread.DislikesCount}&#8195;</MediumText>
                    <ModeCommentOutlinedIcon></ModeCommentOutlinedIcon>
                    <MediumText>&#8196;</MediumText>
                    <ReplyText onClick = {() => setOpenReply(true)}>Reply</ReplyText>
                    {openReply ? "" : ""}
                </VerticalCenterAlignLayout>
            </ThreadContainerDiv>
        )
    }

    switch(type) {
        case "THREAD_PAGE":
            return renderThreadPageThread();
        case "MODULE_PAGE":
            return renderModulePageThread();
        default:
            return renderModulePageThread();
    }
}

export default ThreadComponent;