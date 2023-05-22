import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Navbar, Background, ThreadComponent } from "../components";
import { Colors } from "../constants";
import MyModules from "../components/MyModules";
import ModuleForum, { RedButton } from "../components/ModuleForum";
import { API_URL } from "../constants";
import {
  Thread,
  ThreadInitialState,
} from "../redux/features/threads/threadSlice";
import CommentList from "../components/comments/CommentList";
import ReplyTextEditor from "../components/editor/ReplyTextEditor";

// Uncomment display grid once my module component is done
const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 8.5fr 1.5fr;
  grid-column-gap: 2em;
  padding: 2em;
`;

const Heading = styled.div`
  font-family: "Poppins", "sans-serif";
  font-weight: 600;
  font-size: 2.25em;
  color: ${Colors.white};
  padding-bottom: 0.5em;
`;

const SpacingEmptyDiv = styled.div`
  padding-top: 2em;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
`;

/** THREAD-PAGE THREAD ONLY Å*/
const ThreadContainerDiv = styled.div`
  background-color: ${Colors.white};
  width: calc(100% - 2em);
  border-radius: 20px;
  border: none;
  padding: 1.5em;
  text-align: left;
  font-size: 12px;
  margin: 1em 0;
`;

const EditorContainerDiv = styled.div`
  background-color: ${Colors.white};
  width: calc(100% - 2em);
  border-radius: 20px;
  border: none;
  padding: 0.5em 1.5em;
  text-align: left;
  font-size: 12px;
  margin: 1.5em 0;
`;

const MediumText = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: ${Colors.light_grey};
  font-size: 1.6em;
  padding-left: 0.5em;
`;

const QuestionPage = () => {
  const { threadId } = useParams();
  const [thread, setThread] = useState<Thread>(ThreadInitialState);

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
      });
  };

  useEffect(() => {
    fetchThreadData();
  }, []);

  if (!threadId) {
    return <div></div>; // Handle invalid question page here. Probly some 404 page or such
  }

  return (
    <>
      <Navbar />
      <Background>
        <MainContainer>
          <div>
            <Heading>Discussion Forum</Heading>
            <ThreadComponent
              threadId={parseInt(threadId)}
              type="QUESTION_PAGE"
            />
            <SpacingEmptyDiv />
            <Heading>Replies</Heading>
            {thread.Comments && thread.Comments?.length > 0 ? (
              <>
                <CommentList
                  comments={thread.Comments}
                  threadId={thread.Id}
                  level={0}
                />
                <EditorContainerDiv>
                  <ReplyTextEditor id={thread.Id} threadId={thread.Id} />
                </EditorContainerDiv>
              </>
            ) : (
              <ThreadContainerDiv>
                <MediumText>No replies yet. Be the first to reply!</MediumText>
                <ReplyTextEditor id={thread.Id} threadId={thread.Id} />
              </ThreadContainerDiv>
            )}
          </div>
          <RightSide>
            {thread !== ThreadInitialState ? (
              <ModuleForum selectedModule={thread.ModuleId} />
            ) : null}
            <MyModules />
          </RightSide>
        </MainContainer>
      </Background>
    </>
  );
};

export default QuestionPage;
