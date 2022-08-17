
import {useEffect} from 'react';
import WorkoutDetails from '../component/WorkoutDetails';
import WorkoutForm from '../component/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext();
    useEffect(() => {
        const fetchWorkouts = async () => {
          const response = await fetch('/api/workouts')
          const json = await response.json()
          const finalData = json.workouts;
          if (response.ok) {
            dispatch({type: 'SET_WORKOUT', payload: finalData})
          }
        } 
    
        fetchWorkouts()
      }, [dispatch])
    
    return (
        <div className='home'>
            <div className='workouts'>
                {workouts && workouts.map(workout => (
                    <WorkoutDetails workout={workout} key={workout._id} />
                ))}
            </div>
            <WorkoutForm />
        </div>
     );
}
 
export default Home;