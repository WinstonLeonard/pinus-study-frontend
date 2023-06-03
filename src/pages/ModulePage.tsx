import styled from "styled-components";
import { useParams } from "react-router-dom";
import Background from "../components/Background";
import NavigationBar from "../components/Navbar";
import { Colors } from "../constants";
import MyModules from "../components/MyModules";
import ModuleForum, { Button } from "../components/ModuleForum";
import ThreadList from "../components/ThreadList";
import { useSelector } from "react-redux";
import { selectId, selectToken } from "../redux/features/users/userSlice";
import TextEditor from "../components/editor/TextEditor";
import { useState } from "react";

import { isLoggedIn } from "../utils";

const ModulePageWrapper = styled.div`
  display: grid;
  grid-template-columns: 8.5fr 1.5fr;
  grid-column-gap: 2em;
  padding: 2em;
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HeadingDiv = styled.div`
  display: flex;
  vertical-align: middle;
  margin-bottom: 1em;
  width: 100%;
`;

const ForumHeadingDiv = styled.div`
  width: 50%;
`
const Heading = styled.span`
  font-family: "Poppins", "sans-serif";
  font-weight: 600;
  font-size: 2em;
  color: ${Colors.black};
  background: linear-gradient(to bottom, transparent 50%, ${Colors.blue_2_75} 50%);
  padding: 2.5px 5px 2.5px 5px;
`;

const ButtonDiv = styled.div`
  width: 50%;
  display: flex;
  justify-content: end;
`;

const ThreadListContainer = styled.div`
  margin-left: 8px;
`;

const ModulePage = () => {
  const { mod } = useParams();
  const userId = useSelector(selectId);
  const token = useSelector(selectToken);
  const [openTextEditor, setOpenTextEditor] = useState(false);

  const showTextEditor = () => {
    setOpenTextEditor(true);
  };

  const closeTextEditor = () => {
    setOpenTextEditor(false);
  };

  return (
    <div>
      {openTextEditor ? <TextEditor closeTextEditor={closeTextEditor} /> : null}
      <NavigationBar />
      <Background>
        <ModulePageWrapper>
          <div>
            <HeadingDiv>
              <ForumHeadingDiv>
                <Heading>Discussion Forum</Heading>
              </ForumHeadingDiv>
              <ButtonDiv>
                {isLoggedIn(token, userId) ? (
                  <Button onClick={showTextEditor}>+ New Post</Button>
                ) : (
                  <></>
                )}
              </ButtonDiv>
            </HeadingDiv>
            <ThreadListContainer>
              <ThreadList selectedModule={mod ? mod.toString() : ""} />
            </ThreadListContainer>
          </div>
          <RightSide>
            <ModuleForum selectedModule={mod ? mod.toString() : ""} />
            <MyModules />
          </RightSide>
        </ModulePageWrapper>
      </Background>
    </div>
  );
};

export default ModulePage;
