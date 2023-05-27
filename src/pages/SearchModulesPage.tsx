import styled from "styled-components";
import { API_URL, Colors } from "../constants";
import MyModules, { ModuleComponent } from "../components/MyModules";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Module } from "../redux/features/modules/moduleSlice";
import { Link } from "react-router-dom";
import { Background } from "../components";
import NavigationBar from "../components/Navbar";


const ModulePageWrapper = styled.div`
    display: grid;
    grid-template-columns: 8.5fr 1.5fr;
    grid-column-gap: 1em;
    padding: 2em;
`

const ModuleGridWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 1em;
    grid-row-gap: 1em;
`

const ResultsHeadingDiv = styled.div`
    margin-bottom: 1em;
`

const ResultsHeading = styled.span`
    font-family: "Poppins", "sans-serif";
    font-weight: 600;
    font-size: 2.25em;
    color: ${Colors.black};
`

const ResultsHeadingItalic = styled(ResultsHeading)`
    font-style: italic;
`

const SearchModulesPage = () => {
    const { keyword } = useParams();

    const [searchResults, setSearchResults] = useState<Module[]>([]);
    const [noModulesFound, setNoModulesFound] = useState<Boolean>(true);

    console.log("Keyword: ", keyword)

    const queryDatabase = (page?: number) => {
        fetch(API_URL + `/module`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                keyword: keyword? keyword.toUpperCase() : "",
                page: page? page : 1,
            }),
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.module_list !== null) {
                setSearchResults(data.module_list)
                setNoModulesFound(false);
            } else {
                setNoModulesFound(true);
            }
        });
    }

    useEffect(() => {
        queryDatabase(1);
    }, [keyword])

    return (
        <div>
            <Background>
                <NavigationBar />
                <ModulePageWrapper>
                    <div>
                        <ResultsHeadingDiv>
                            <ResultsHeading>Results for </ResultsHeading>
                            <ResultsHeadingItalic>'{keyword}'</ResultsHeadingItalic>
                        </ResultsHeadingDiv>
                        <ModuleGridWrapper>
                            {noModulesFound
                                ? null
                                : searchResults.map(module => {
                                    return (
                                        <Link to={`/module/${module.Id.toLocaleLowerCase()}`} style={{ textDecoration: 'none',  fontSize: '1.5em'}}>
                                            <div key={module.Id}>
                                                <ModuleComponent>{module.Id}</ModuleComponent>
                                            </div>
                                        </Link>
                                    );
                            })}
                        </ModuleGridWrapper>
                    </div>
                    <MyModules/>
                </ModulePageWrapper>
            </Background>
        </div>
    )
}

export default SearchModulesPage;
