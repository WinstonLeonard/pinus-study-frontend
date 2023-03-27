import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Navbar, Background, ReplyComponent, ThreadComponent } from ".";
import { Colors } from "../constants";
import MyModules from "../components/MyModules";
import ModuleForum, { RedButton } from "../components/ModuleForum";
import TestComments from "./comments/TestComments";
import { API_URL } from "../constants";
import { Thread, ThreadInitialState } from "../features/threads/threadSlice";
import CommentList from "./comments/CommentList";

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
            {/* { thread.Comments ? <CommentList comments={thread.Comments} level={0} /> : null} */}
            <TestComments />
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
