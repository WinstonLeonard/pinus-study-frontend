import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_URL } from '../constants';
import { Module, ModuleInitialState } from '../redux/features/modules/moduleSlice';
import ThreadComponent from './ThreadComponent';
import { Thread } from '../redux/features/threads/threadSlice';
import { Colors, ScreenSizes } from '../constants';
import SearchIcon from "@mui/icons-material/Search";

const ThreadWrapper = styled.span`
    display: flex;  
    flex-direction: column;
`

const ThreadComponentWrapper = styled.span`
    margin-top:1em;
`
const SearchBarContainer = styled.span`
  padding: 0.5rem 1rem;
  border: 1px solid ${Colors.dark_grey};
  box-shadow: 3px 3px 0 ${Colors.blue_2},
        3px 3px 0 1px ${Colors.dark_grey};
  background: ${Colors.white};
  border-radius: 25px;
  align-items: center;
  display: flex;
  gap: 0.5rem;
`;

const SearchBar = styled.input`
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  border: none;
  background: ${Colors.white};
  color: ${Colors.dark_grey};
  width: 60vw;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${Colors.light_grey};
    font-style: italic;
  }

  ${ScreenSizes.medium_below} {
    width: 60vw;
    ::placeholder {
      content: "Search modules";
    }
  } 
`;
// const ThreadWrapper = styled.span`
//     display: flex;
//     flex-direction: column;
//     margin-top: 1rem; 
// `

const ThreadList = ({ selectedModule, sortType } : { selectedModule : string, sortType: string }) => {
    // const [noThreadsFound, setNoThreadsFound] = useState<Boolean>(true);
    const [module, setModule] = useState(ModuleInitialState);
    const [query, setQuery] = useState("");
    const placeholder = "Search threads here...";
    const [filteredList, setFilteredList] = useState<Thread[]>([]);
    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setQuery(e.currentTarget.value);
        setFilteredList(module.Threads.filter(a => a.Title.toLowerCase().includes(e.currentTarget.value.toLowerCase())));
        console.log(filteredList);
    };
    const fetchMod = () => {
        fetch(API_URL + `/module/${selectedModule?.toString().toUpperCase()}`)
            .then(response => response.json())
            .then(data => {
              console.log(data);
              setModule(data.module);
              setFilteredList(sortList(sortType, data.module.Threads?data.module.Threads:[]));
            })
        .catch(error => console.log(error))
    }
    const sortList = (sortingtype: string, threads: Thread[]) => {
        return sortingtype === "Newest"
            ? threads.sort((a, b) => b.Timestamp.localeCompare(a.Timestamp))
            : sortingtype === "Latest"
            ? threads.sort((a, b) => a.Timestamp.localeCompare(b.Timestamp))
            : sortingtype === "Replies"
            ? threads.sort((a, b) => b.CommentsCount - a.CommentsCount)
            : sortingtype === "Likes"
            ? threads.sort((a, b) => b.LikesCount - a.LikesCount)
            : threads.sort((a, b) => b.DislikesCount - a.DislikesCount);
    }
    useEffect(() => {
        fetchMod();
    }, [])
    
    const check = sortList(sortType, module.Threads?module.Threads:[]).filter(a => a.Title.toLowerCase().includes(query.toLowerCase()));
    if (check.length !== filteredList.length) {
        setFilteredList(check);
    } else {
        for (let i = 0; i < check.length; i++) {
            if (check[i] !== filteredList[i]) {
                setFilteredList(check);
            }
        }
    }
    const renderThreadList = () => {
        if (module === (ModuleInitialState) || !module.Threads || module.Threads.length === 0) {
            return <ThreadWrapper />;
        }
        return (
            <ThreadWrapper>
                <SearchBarContainer>
                    <SearchIcon color="disabled" />
                    <SearchBar
                        id="search-bar"
                        type="text"
                        value={query}
                        onChange={onChange}
                        placeholder={placeholder}
                        />
                </SearchBarContainer>
                {
                    filteredList.map(thread => {
                        console.log(thread);
                        return (
                            <ThreadComponentWrapper>
                                <ThreadComponent threadId={thread.Id} threadComponent={thread}/>
                            </ThreadComponentWrapper>
                        )
                    })
                }
            </ThreadWrapper>
        )
    }
    return renderThreadList();

}

export default ThreadList