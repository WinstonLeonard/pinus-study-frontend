import { 
    AuthButton, 
    BlurredBackground, 
    CloseIconDiv, 
    ErrorMessage, 
    ForgetPassword, 
    ModalBackground, 
    ModalDiv, 
    ModalInput, 
    ModalTitle, 
    SwitchModalPrompt 
} from "../authentication_modal/ModalComponents";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { login, selectToken } from '../../redux/features/users/userSlice';
import { LOGIN_URL } from "../../constants";
import CloseIcon from '@mui/icons-material/Close';
import { getUserDetailsRequest } from "../../requests";
import TextEditor from "./TextEditor"

const TextEditorModal = ({cancel, moduleid} : {cancel: () => void, moduleid: string}) => {

    return (
        <BlurredBackground>
            <ModalBackground>
                <CloseIconDiv onClick={cancel}>
                    <CloseIcon/>
                </CloseIconDiv>
                <TextEditor closeTextEditor={cancel} />
            </ModalBackground>
        </BlurredBackground>
    )
}

export default TextEditorModal;
