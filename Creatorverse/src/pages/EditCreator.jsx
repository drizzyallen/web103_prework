import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // State to hold form data
    const [creator, setCreator] = useState({
        name: '',
        url: '',
        description: '',
        imageURL: ''
    });

    useEffect(() => {
        const fetchCreator = async () => {
            const { data } = await supabase.from('creators').select();
            if (data) {
                const foundCreator = data.filter(c => String(c.id) === String(id))[0];
                if (foundCreator) setCreator(foundCreator);
            }
        }
        fetchCreator();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCreator((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updateCreator = async (event) => {
        event.preventDefault();
        const payload = { 
            name: creator.name, 
            description: creator.description,
            // Supabase expects null, not empty strings, for optional URL fields
            url: creator.url === "" ? null : creator.url, 
            imageURL: creator.imageURL === "" ? null : creator.imageURL 
        };

        const { error } = await supabase
            .from('creators')
            .update(payload)
            .eq('id', parseInt(id));
        
        if (error) {
            console.error("Error updating:", error);
            alert(`Error updating creator: ${error.message}`);
        } else {
            console.log("Success updated payload:", payload);
            navigate('/');
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this creator?");
        if (confirmDelete) {
            await supabase.from('creators').delete().eq('id', parseInt(id));
            alert("Deleted!");
            navigate('/');
        }
    };

    return (
        <div className="container">
            <h2>Edit Creator</h2>
            <form onSubmit={updateCreator}>
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

                <div className="grid">
                    <button type="submit">Submit Changes</button>
                    <button type="button" onClick={handleDelete} className="contrast">Delete Creator</button>
                </div>
            </form>
        </div>
    );
};

export default EditCreator;
