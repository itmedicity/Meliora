import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/joy/Autocomplete';
import { getNonGoalProjectList, getProjectListWithgoal } from 'src/redux/actions/TmProjectsList.action';

const TmAllGoalsList = ({ goalz, setgoalz, setdueDateGoal }) => {
    const GoalsList = useSelector((state) => state.getGoalsList?.GoalsList);
    const [goalx, setgoalx] = useState([{ tm_goals_slno: 0, tm_goal_name: '', tm_goal_duedate: '' }]);
    const [value, setValue] = useState(goalx[0]);
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (goalz !== 0) {
            let newObj = GoalsList?.find((e) => e.tm_goals_slno === goalz);
            dispatch(getProjectListWithgoal(goalz));
            setValue(newObj);
        } else {
            dispatch(getNonGoalProjectList());
        }
    }, [goalz, GoalsList, dispatch]);

    const Onclick = useCallback((value) => {
        if (value !== null) {
            setValue(value);
            setgoalz(value.tm_goals_slno);
            setdueDateGoal(value.tm_goal_duedate);
        } else {
            setgoalz(0);
        }
    }, [setgoalz, setdueDateGoal]);

    useEffect(() => {
        if (GoalsList.length > 0) setgoalx(GoalsList);
    }, [GoalsList]);

    const isPastDue = (duedate) => {
        const today = new Date();
        const dueDate = new Date(duedate);
        return dueDate < today;
    };

    const filterProps = (props) => {
        const { ownerState, ...restProps } = props;
        return restProps;
    };

    return (
        <Autocomplete
            sx={{
                width: '100%',
                minHeight: 40,
                bgcolor: 'transparent',
                '--Input-radius': '0px',
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
                borderBottom: '2px solid',
                borderColor: 'neutral.outlinedBorder',
                '&:hover': {
                    borderColor: 'neutral.outlinedHoverBorder',
                },
                '&::before': {
                    border: '1px solid var(--Input-focusedHighlight)',
                    transform: 'scaleX(0)',
                    left: 0,
                    right: 0,
                    bottom: '-2px',
                    top: 'unset',
                    transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                    borderRadius: 0,
                },
                '&:focus-within::before': {
                    transform: 'scaleX(1)',
                },
            }}
            value={goalz === 0 ? goalx : value}
            placeholder="Select Goal"
            clearOnBlur
            onChange={(event, newValue) => {
                setValue(newValue);
                Onclick(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            loading={true}
            loadingText="Loading..."
            freeSolo
            isOptionEqualToValue={(option, value) => option.tm_goal_name === value.tm_goal_name}
            getOptionLabel={(option) => option.tm_goal_name || ''}
            options={goalx}
            renderOption={(props, option) => {
                const filteredProps = filterProps(props);
                return (
                    <li
                        {...filteredProps}
                        style={{
                            color: isPastDue(option.tm_goal_duedate) ? 'darkred' : 'inherit',
                            padding: '4px 8px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                        }}
                    >
                        {option.tm_goal_name}
                    </li>
                );
            }}
        />
    );
}

export default memo(TmAllGoalsList)





















// import React, { useCallback, useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import Autocomplete from '@mui/joy/Autocomplete';
// import { getNonGoalProjectList, getProjectListWithgoal } from 'src/redux/actions/TmProjectsList.action';



// const TmAllGoalsList = ({ goalz, setgoalz, setdueDateGoal }) => {

//     const GoalsList = useSelector((state) => state.getGoalsList?.GoalsList)
//     const [goalx, setgoalx] = useState([{ tm_goals_slno: 0, tm_goal_name: '', tm_goal_duedate: '' }])
//     const [value, setValue] = useState(goalx[0]);
//     const [inputValue, setInputValue] = useState('');
//     const dispatch = useDispatch();

//     console.log('goalx', goalx);

//     useEffect(() => {
//         if (goalz !== 0) {
//             let newObj = GoalsList?.find((e) => e.tm_goals_slno === goalz)
//             dispatch(getProjectListWithgoal(goalz))
//             setValue(newObj)
//         }
//         else {
//             getNonGoalProjectList()
//         }
//     }, [goalz, GoalsList, dispatch])



//     const Onclick = useCallback((value) => {
//         if (value !== null) {
//             setValue(value)
//             setgoalz(value.tm_goals_slno)
//             setdueDateGoal(value.tm_goal_duedate)
//         }
//         else {
//             setgoalz(0)
//         }
//         return
//     }, [setgoalz])

//     useEffect(() => {
//         GoalsList.length > 0 && setgoalx(GoalsList)
//     }, [GoalsList])

//     const isPastDue = (duedate) => {
//         const today = new Date();
//         const dueDate = new Date(duedate);
//         return dueDate < today;
//     }

//     return (
//         <Autocomplete
//             sx={{
//                 width: '100%',
//                 minHeight: 40,
//                 bgcolor: 'transparent',
//                 '--Input-radius': '0px',
//                 borderTop: 0,
//                 borderLeft: 0,
//                 borderRight: 0,
//                 borderBottom: '2px solid',
//                 borderColor: 'neutral.outlinedBorder',
//                 '&:hover': {
//                     borderColor: 'neutral.outlinedHoverBorder',
//                 },
//                 '&::before': {
//                     border: '1px solid var(--Input-focusedHighlight)',
//                     transform: 'scaleX(0)',
//                     left: 0,
//                     right: 0,
//                     bottom: '-2px',
//                     top: 'unset',
//                     transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
//                     borderRadius: 0,
//                 },
//                 '&:focus-within::before': {
//                     transform: 'scaleX(1)',
//                 },
//             }}
//             value={goalz === 0 ? goalx : value}
//             placeholder="Select Goal"
//             clearOnBlur
//             onChange={(event, newValue) => {
//                 setValue(newValue);
//                 Onclick(newValue);
//             }}
//             inputValue={inputValue}
//             onInputChange={(event, newInputValue) => {
//                 setInputValue(newInputValue);
//             }}
//             loading={true}
//             loadingText="Loading..."
//             freeSolo
//             isOptionEqualToValue={(option, value) => option.tm_goal_name === value.tm_goal_name}
//             getOptionLabel={option => option.tm_goal_name || ''}
//             options={goalx}
//         />
//     )
// }

// export default TmAllGoalsList

