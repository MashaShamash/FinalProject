import React, { useState } from 'react';
import { useAppSelector } from '../../../app/store/store';
import { Profile } from '../types/profileTypes';
import ModalWindowFigureProf from '../../../shared/ui/Modal/ModalFigureCreate';
import ProfileCreateFigure from './ProfileCreateFigure';

type ProfileMyFigureProps={
    profile: Profile
}
const ProfileMyFigure = ({profile}: ProfileMyFigureProps): JSX.Element =>{
    const {user} = useAppSelector((state) => state.auth)
    const {figures} = useAppSelector((state) => state.figures)
    const [active, setActive] = useState<boolean>(false);


return (
<div className=' ProfileMyFigure'>
        <ModalWindowFigureProf active={active} setActive={setActive}>
            <ProfileCreateFigure />
        </ModalWindowFigureProf>
       <button onClick={() => setActive((prev) => !prev)}>Открыть</button>
    <h1>RАРТОЧКИ</h1>
 </div>
 );

}
export default ProfileMyFigure
