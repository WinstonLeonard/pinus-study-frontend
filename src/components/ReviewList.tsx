import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_URL } from '../constants';
import { Review, ReviewInitialState } from '../redux/features/reviews/reviewSlice';
import ReviewComponent from './ReviewComponent';

const ReviewWrapper = styled.span`
    display: flex;  
    flex-direction: column;
`

const ReviewComponentWrapper = styled.span`
    margin-top: 1em;
`

const ReviewList = ({ selectedModule } : { selectedModule : string }) => {
    const [reviews, setReviews] = useState<Review[]>([ReviewInitialState]);

    const fetchReviews = () => {
        fetch(API_URL + `/review/${selectedModule.toUpperCase()}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setReviews(data.review.map((r: any) => ({
                    ...r,
                    Comments: []
                })))
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchReviews();
    }, [selectedModule])  // Trigger the fetch when selectedModule changes

    const renderReviewList = () => {
        console.log(reviews);

        return (
            <ReviewWrapper>
                {reviews.length === 1 && reviews[0] === ReviewInitialState || reviews.length === 0
                    ? null
                    : reviews.sort((a, b) => b.Timestamp.localeCompare(a.Timestamp)).map(review => (
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
