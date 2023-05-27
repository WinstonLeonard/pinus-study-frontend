import styled from "styled-components";
import { API_URL, Colors, ScreenSizes } from "../constants";
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
    margin-top: 0.5em;
    margin-bottom: 2em;
    place-items: center; /* Added property to center items */
    background: ${Colors.green_2};
    border: 2px solid;
    border-color: ${Colors.dark_grey};
    padding: 1vw;
    border-radius: 20px;

    ${ScreenSizes.extra_small} {
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 0.5em;
        grid-row-gap: 0.5em;
        border: 1px solid;
        box-shadow: 3px 3px 0 ${Colors.blue_3},
            3px 3px 0 1px ${Colors.dark_grey};
    }
  
    ${ScreenSizes.small_up} {
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 0.5em;
        grid-row-gap: 0.5em;
        border: 2px solid ${Colors.dark_grey};
        box-shadow: 7px 7px 0 ${Colors.blue_3},
            7px 7px 0 2px ${Colors.dark_grey};
    }

    ${ScreenSizes.huge_up} {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 1em;
        grid-row-gap: 1em;
    }
`

const ResultsHeadingDiv = styled.div`
    margin-bottom: 1em;
`

const ResultsHeading = styled.span`
    font-family: "Poppins", "sans-serif";
    font-weight: 600;
    font-size: 2.25em;
    color: ${Colors.dark_grey};
    background: linear-gradient(to bottom, transparent 50%, ${Colors.blue_2_75} 50%);
    padding: 2.5px 5px 2.5px 5px;

    ${ScreenSizes.extra_small} {
        font-size: 1.5em;
    }
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
                        {noModulesFound
                            ? null
                            : 
                            <ModuleGridWrapper>
                                {
                                searchResults.map(module => {
                                return (
                                    <Link to={`/module/${module.Id.toLocaleLowerCase()}`} style={{ textDecoration: 'none',  fontSize: '1.5em'}}>
                                        <div key={module.Id}>
                                            <ModuleComponent>{module.Id}</ModuleComponent>
                                        </div>
                                    </Link>
                                );})
                                }   
                            </ModuleGridWrapper>
                        }
                        
                    </div>
                    <MyModules/>
                </ModulePageWrapper>
            </Background>
        </div>
    )
}

export default SearchModulesPage;
