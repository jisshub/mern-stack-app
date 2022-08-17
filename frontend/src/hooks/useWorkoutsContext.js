import { WorkoutsContext } from '../context/WorkoutsContext';
import { useReducer } from 'react';

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext);
    if (!context) {
        throw new Error('useWorkoutsContext must be used within a WorkoutsContextProvider');
    }
    return workouts;
}