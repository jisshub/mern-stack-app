import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
    // destructure the dispatch.
    const { dispatch } = useWorkoutsContext();
    const handleDelete = async () => {
        // get the specific workout id from the url
        const response = await fetch(`/api/workouts/${workout._id}`, {
            // set the method to delete
            method: 'DELETE'
        });
        // get the json data to be deleted from the response.
        const json = await response.json();
        if (response.ok) {
            console.log('Workout Deleted!', json);
            // dispatch the action to delete the workout.
            dispatch({ type: 'DELETE_WORKOUT', payload: json });
        }
    }
    return (  
        <div className='workout-details'>
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Number of reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleDelete}>Delete</span>
        </div>
    );
}
 
export default WorkoutDetails;