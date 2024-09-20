import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_URL } from '../constants';
import { Review, ReviewInitialState } from '../redux/features/reviews/reviewSlice';
import ReviewComponent from './ReviewComponent';
import { Colors, ScreenSizes } from '../constants';
import SearchIcon from "@mui/icons-material/Search";


const ReviewWrapper = styled.span`
    display: flex;  
    flex-direction: column;
`

const ReviewComponentWrapper = styled.span`
    margin-top: 1em;
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

const ReviewList = ({ selectedModule, sortType } : { selectedModule : string, sortType: string }) => {
    const [reviews, setReviews] = useState<Review[]>([ReviewInitialState]);
    const [query, setQuery] = useState("");
    const placeholder = "Search reviews here...";
    const [filteredList, setFilteredList] = useState<Review[]>([]);
    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setQuery(e.currentTarget.value);
        setFilteredList(reviews.filter(a => a.Content.toLowerCase().includes(e.currentTarget.value.toLowerCase()) || a.Suggestion.toLowerCase().includes(e.currentTarget.value.toLowerCase())));
        console.log(filteredList);
    };

    const sortList = (sortingtype: string, review: Review[]) => {
        return sortingtype === "Newest"
            ? review.sort((a, b) => b.Timestamp.localeCompare(a.Timestamp))
            : sortingtype === "Latest"
            ? review.sort((a, b) => a.Timestamp.localeCompare(b.Timestamp))
            : sortingtype === "Difficulty ⇊"
            ? review.sort((a, b) => b.Difficulty-a.Difficulty)
            : sortingtype === "Difficulty ⇈"
            ? review.sort((a, b) => a.Difficulty-b.Difficulty)
            : sortingtype === "Workload ⇊"
            ? review.sort((a, b) => b.Workload-a.Workload)
            : sortingtype === "Workload ⇈"
            ? review.sort((a, b) => a.Workload-b.Workload)
            : sortingtype === "Semester Taken ⇊"
            ? review.sort((a, b) => b.SemesterTaken.localeCompare(a.SemesterTaken))
            : review.sort((a, b) => a.SemesterTaken.localeCompare(b.SemesterTaken))
    }
    const fetchReviews = () => {
        fetch(API_URL + `/review/${selectedModule.toUpperCase()}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setReviews(data.review.map((r: any) => ({
                    ...r,
                    Comments: []
                })))
                setFilteredList(sortList(sortType, data.review?data.review:[]));
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchReviews();
    }, [selectedModule, sortType])  // Trigger the fetch when selectedModule changes

    const renderReviewList = () => {
        console.log(reviews);

        return (
            <ReviewWrapper>
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
                {reviews.length === 1 && reviews[0] === ReviewInitialState || reviews.length === 0
                    ? null
                    : filteredList.map(review => (
                        <ReviewComponentWrapper>
                            <ReviewComponent review={review}/>
                        </ReviewComponentWrapper>
                    ))
                }
            </ReviewWrapper>
        )
    }

    return renderReviewList();
}

export default ReviewList;
