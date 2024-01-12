import styled from "styled-components";
import { useParams } from "react-router-dom";
import Background from "../components/Background";
import NavigationBar from "../components/Navbar";
import { Colors, ScreenSizes } from "../constants";
import MyModules from "../components/MyModules";
import ModuleForum, { Button, SelectBox } from "../components/ModuleForum";
import ThreadList from "../components/ThreadList";
import { useSelector } from "react-redux";
import { selectId, selectToken } from "../redux/features/users/userSlice";
import TextEditor from "../components/editor/TextEditor";
import { useState } from "react";
import { isLoggedIn } from "../utils";

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

const SortByFont = styled.div`
  font-family: "Poppins", "sans-serif";
  font-weight: 600;
  font-size: 1.5em;
  color: ${Colors.dark_grey};
  padding: 5px 5px;
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

const ModulePage = () => {
  const { mod } = useParams();
  const userId = useSelector(selectId);
  const token = useSelector(selectToken);
  const [openTextEditor, setOpenTextEditor] = useState(false);
  const sortedType = ["Newest", "Latest", "Replies", "Likes", "Dislikes"];
  const [sortType, setSortType] = useState(sortedType[0]);

  const showTextEditor = () => {
    setOpenTextEditor(true);
  };

  const closeTextEditor = () => {
    setOpenTextEditor(false);
  };
  const onChange = (e: React.FormEvent<HTMLSelectElement>): void => {
    setSortType(e.currentTarget.value);
    console.log(e.currentTarget.value);
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
                <SortByFont>Sort By:</SortByFont>
                <SelectBox onChange={onChange}>
                  {sortedType.map((label) => {
                    return <option value={label}>{label}</option>
                  })}
                </SelectBox>
                {isLoggedIn(token, userId) ? (
                  <Button onClick={showTextEditor} mobilePadding="10px 20px">+ New Post</Button>
                ) : (
                  <></>
                )}
              </ButtonDiv>
            </HeadingDiv>
            <ThreadListContainer>
              <ThreadList selectedModule={mod ? mod.toString() : ""} sortType={sortType}/>
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
