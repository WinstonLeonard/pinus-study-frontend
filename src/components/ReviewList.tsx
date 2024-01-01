import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_URL } from '../constants';
import { Module, ModuleInitialState } from '../redux/features/modules/moduleSlice';
import ReviewComponent from './ReviewComponent';

const ReviewWrapper = styled.span`
    display: flex;  
    flex-direction: column;
`

const ReviewComponentWrapper = styled.span`
    margin-top:1em;
`
// const ReviewWrapper = styled.span`
//     display: flex;
//     flex-direction: column;
//     margin-top: 1rem; 
// `

const ReviewList = ({ selectedModule } : { selectedModule : string }) => {
    const [module, setModule] = useState<Module>(ModuleInitialState);
    // const [noReviewsFound, setNoReviewsFound] = useState<Boolean>(true);

    const fetchMod = () => {
        fetch(API_URL + `/module/${selectedModule.toUpperCase()}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setModule(data.module)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchMod();
    }, [])

    const renderReviewList = () => {
        const curr_review = module.Reviews;
        console.log(curr_review);

        return (
            <ReviewWrapper>
                {module === (ModuleInitialState) || curr_review === null 
                    ? null
                    : curr_review.sort((a, b) => b.Timestamp.localeCompare(a.Timestamp)).map(review => {
                        return (
                            <ReviewComponentWrapper>
                                <ReviewComponent reviewId={review.Id}/>
                            </ReviewComponentWrapper>
                        )
                    })
                }
            </ReviewWrapper>
        )
    }

    return renderReviewList();

}

export default ReviewList;