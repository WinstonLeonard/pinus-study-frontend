import styled from "styled-components";
import { useParams } from "react-router-dom";
import Background from "../components/Background";
import NavigationBar from "../components/Navbar";
import { Colors, ScreenSizes } from "../constants";
import MyModules from "../components/MyModules";
import ModuleForum, { Button } from "../components/ModuleForum";
import ThreadList from "../components/ThreadList";
import ThreadComponent from "../components/ThreadComponent";
import { useSelector } from "react-redux";
import { selectId, selectToken, selectUser } from "../redux/features/users/userSlice";
import TextEditor from "../components/editor/TextEditor";
import { useEffect, useState } from "react";

import { isLoggedIn } from "../utils";

import { API_URL } from "../constants";
import { Thread } from "../redux/features/threads/threadSlice";

const ModulePageWrapper = styled.div`
  display: grid;
  grid-template-columns: 8fr 2fr;
  grid-column-gap: 2em;
  padding: 2em;

  ${ScreenSizes.medium_below} {
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;


  ${ScreenSizes.extra_large_below} {
    padding-right: 2em;
  }
`;

const HeadingDiv = styled.div`
  display: flex;
  vertical-align: middle;
  margin-bottom: 1em;
  width: 100%;

  ${ScreenSizes.medium_below} {
    display: flex;
    flex-direction: column;
  }
`;

const ForumHeadingDiv = styled.div`
  width: 50%;

  ${ScreenSizes.medium_below} {
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
  }
`
const Heading = styled.span`
  font-family: "Poppins", "sans-serif";
  font-weight: 600;
  font-size: 2em;
  color: ${Colors.black};
  background: linear-gradient(to bottom, transparent 50%, ${Colors.blue_2_75} 50%);
  padding: 2.5px 5px 2.5px 5px;

  ${ScreenSizes.medium_below} {
    font-size: 1.5em;
  }
`;

const ButtonDiv = styled.div`
  width: 50%;
  display: flex;
  justify-content: end;

  ${ScreenSizes.medium_below} {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const ThreadListContainer = styled.div`
  margin-left: 8px;
`;

const ThreadWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;


const ThreadComponentWrapper = styled.span`
    margin-top: 1em;
`;

const BookmarkPage = () => {
  const { mod } = useParams();
  const userId = useSelector(selectId);
  const token = useSelector(selectToken);
  const [openTextEditor, setOpenTextEditor] = useState(false);
  const user = useSelector(selectUser);
  const [bookmarkedThreads, setBookmarkedThreads] = useState<Thread[]>([]);

  const showTextEditor = () => {
    setOpenTextEditor(true);
  };

  const closeTextEditor = () => {
    setOpenTextEditor(false);
  };

  const fetchBookmarkStatus = () => {
    fetch(API_URL + `/bookmark/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User's bookmarked threads:")
        setBookmarkedThreads(data.threads);
        console.log(bookmarkedThreads);
        console.log("User's recent threads:")
        console.log(user.RecentThreads);
      })
      .catch((error) => console.log("error fethcing: " + error));
  };

  useEffect(() => {
    fetchBookmarkStatus();
  }, []);

  useEffect(()=> {
    console.log("updated bookmarked threads:")
    console.log(bookmarkedThreads);
  }, [bookmarkedThreads])

  return (
    <div>
      {openTextEditor ? <TextEditor closeTextEditor={closeTextEditor} /> : null}
      <NavigationBar />
      <Background>
        <ModulePageWrapper>
          <div>
            <HeadingDiv>
              <ForumHeadingDiv>
                <Heading>Bookmarked Threads</Heading>
              </ForumHeadingDiv>
            </HeadingDiv>
            
            <ThreadWrapper>
            {bookmarkedThreads.map(thread => {
                            return (
                            <ThreadComponentWrapper>
                                <ThreadComponent threadId={thread.Id} type="MODULE_PAGE"/>
                            </ThreadComponentWrapper>
                            )
                        })}
            </ThreadWrapper>
            {/* <ThreadListContainer>
              <ThreadList selectedModule={mod ? mod.toString() : ""} />
            </ThreadListContainer> */}
          </div>
          <RightSide>
            <MyModules />
          </RightSide>
        </ModulePageWrapper>
      </Background>
    </div>
  );
};

export default BookmarkPage;
