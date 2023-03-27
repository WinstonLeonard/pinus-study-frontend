import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Navbar, Background, ThreadComponent } from "../components";
import { Colors } from "../constants";
import MyModules from "../components/MyModules";
import ModuleForum, { RedButton } from "../components/ModuleForum";
import { API_URL } from "../constants";
import { Thread, ThreadInitialState } from "../features/threads/threadSlice";
import CommentList from "../components/comments/CommentList";
import ReplyTextEditor from "../components/editor/ReplyTextEditor";

// Uncomment display grid once my module component is done
const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 8.5fr 1.5fr;
  grid-column-gap: 1em;
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

const MyModulesDiv = styled.div`
  display: grid;
  align-items: center;
  padding: 1.25em calc(2em + 20px);
`;

const ModuleForumDiv = styled.div`
  display: grid;
  align-items: center;
  padding: 1.25em calc(2em + 20px);
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
`;

/** THREAD-PAGE THREAD ONLY Å*/
const ThreadContainerDiv = styled.div`
  background-color: ${Colors.white};
  width: 50vw;
  border-radius: 20px;
  border: none;
  padding: 1.5em;
  text-align: left;
  font-size: 12px;
  margin: 1em 0;
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

  console.log(threadId);

  if (!threadId) {
    return <div></div>; // Handle invalid question page here. Probly some 404 page or such
  }

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

  //   useEffect(() => {
  //     fetchThreadData();
  //   }, [])

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
            {thread.Comments ? (
              <CommentList comments={thread.Comments} level={0} />
            ) : (
              <ThreadContainerDiv>
                <MediumText>
                No replies yet :( Be the first to reply!
                    </MediumText>
                <ReplyTextEditor id={thread.Id} />
              </ThreadContainerDiv>
            )}
          </div>
          <RightSide>
            <MyModulesDiv>
              <MyModules />
            </MyModulesDiv>
          </RightSide>
        </MainContainer>
      </Background>
    </>
  );
};

export default QuestionPage;
