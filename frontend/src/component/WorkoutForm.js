import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext();
    const [title, setTitle] = useState('');
    const [load, setLoads] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = {
            title,
            load,
            reps
        }
        // const res = await axios.post('/api/workouts', workout);

        // fetch request to post workout to database
        const res = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await res.json();

        if(!res.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
            throw new Error(json.message)
        }
        if (res.ok) {
            setTitle('');
            setLoads('');
            setReps('');
            setError(null);
            setEmptyFields([]);
            dispatch({type: 'CREATE_WORKOUT', payload: json});
            console.log('Workout Added!', json);
        }
    }
    return ( 
        <form className='create' onSubmit={handleSubmit}>
            <h3>
                Add a New Workout
            </h3>
            <label>
                Exercise Title:
            </label>
            <input 
                type="text" 
                value={title} 
                className={emptyFields && emptyFields.includes('title') ? 'error' : ''}
                onChange={(e) => setTitle(e.target.value)} />
            <label>
                Load (in Kg):
            </label>
            <input 
                type="text" 
                value={load} 
                className={emptyFields && emptyFields.includes('load') ? 'error' : ''}
                onChange={(e) => setLoads(e.target.value)} />
            <label>
                Reps:
            </label>
            <input 
                type="text" 
                value={reps} 
                className={emptyFields && emptyFields.includes('reps') ? 'error' : ''}
                onChange={(e) => setReps(e.target.value)} />
            <button>
                Add Workout
            </button>
            {error && <div className='error'>{error}</div>}
        </form>
     );
}
 
export default WorkoutForm;