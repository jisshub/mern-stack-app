
import {useEffect, useState } from 'react';
import WorkoutDetails from '../component/WorkoutDetails';
import WorkoutForm from '../component/WorkoutForm';

const Home = () => {
    const [workouts, setWorkouts] = useState(null);
    useEffect(() => {
        const fetchWorkouts = async () => {
          const response = await fetch('/api/workouts')
          const json = await response.json()
          const finalData = json.workouts;
          if (response.ok) {
            setWorkouts(finalData);
          }
        }
    
        fetchWorkouts()
      }, [])
    
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