import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Navbar, Background, ReplyComponent, ThreadComponent } from ".";
import { Colors } from "../constants";

// Uncomment display grid once my module component is done
const MainContainer = styled.div`
    /* display: grid;  */
    grid-template-columns: 8.5fr 1.5fr;
    grid-column-gap: 1em;
    padding: 2em;
`;

const Heading = styled.div`
    font-family: "Poppins", "sans-serif";
    font-weight: 600;
    font-size: 2.25em;
    color: ${Colors.white};
    padding-bottom: .5em;
`;

const SpacingEmptyDiv = styled.div`
    padding-top: 2em;
`

const QuestionPage = () => {
    const { threadId } = useParams();

    console.log(threadId);

    if (!threadId) {
        return <div></div>; // Handle invalid question page here. Probly some 404 page or such
    }

    return (
        <>
            <Navbar />
            <Background>
                <MainContainer>
                    <Heading>Discussion Forum</Heading>
                    <ThreadComponent
                        threadId={parseInt(threadId)}
                        type="QUESTION_PAGE"
                    />
                    <SpacingEmptyDiv />
                    <Heading>Replies</Heading>
                    <ReplyComponent commentId={0} />
                </MainContainer>
            </Background>
        </>
    );
};

export default QuestionPage;
