import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const AddCreator = () => {
    const navigate = useNavigate();
    
    // State to hold new creator data
    const [creator, setCreator] = useState({
        name: '',
        url: '',
        description: '',
        imageURL: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCreator((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addCreator = async (event) => {
        event.preventDefault();
        
        await supabase
            .from('creators')
            .insert([
                { 
                    name: creator.name, 
                    url: creator.url, 
                    description: creator.description, 
                    imageURL: creator.imageURL 
                }
            ]);
            
        navigate('/'); // Redirect to the ShowCreators home page
    };

    return (
        <div className="container">
            <h2>Add a New Content Creator</h2>
            <form onSubmit={addCreator}>
                <label>
                    Name
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Creator Name" 
                        value={creator.name} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                
                <label>
                    Image URL (Optional)
                    <input 
                        type="url" 
                        name="imageURL" 
                        placeholder="https://..." 
                        value={creator.imageURL} 
                        onChange={handleChange} 
                    />
                </label>

                <label>
                    Description
                    <textarea 
                        name="description" 
                        placeholder="Provide a description of the creator..." 
                        value={creator.description} 
                        onChange={handleChange} 
                        required 
                    />
                </label>

                <label>
                    Social Media Link
                    <input 
                        type="url" 
                        name="url" 
                        placeholder="https://youtube.com/..." 
                        value={creator.url} 
                        onChange={handleChange} 
                    />
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddCreator;
