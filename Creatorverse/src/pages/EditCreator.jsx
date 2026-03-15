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

    // Dummy data fallback matching view/show pages
    const dummyCreators = [
        {
            id: 1,
            name: "Allen",
            url: "https://youtube.com/allen",
            description: "A cool creator who makes tech videos! I love making videos about React, Supabase, and PicoCSS. If you want to learn web development, you are in the right place.",
            imageURL: "https://via.placeholder.com/600x300"
        },
        {
            id: 2,
            name: "Sarah Creates",
            url: "https://twitch.tv/sarah",
            description: "Variety streamer and artist. Join me on my adventures playing indie games and drawing cool digital art!",
            imageURL: "https://via.placeholder.com/600x300"
        },
        {
            id: 3,
            name: "Code Master",
            url: "https://github.com/codemaster",
            description: "Open source contributor and educator. Building tools for developers.",
            imageURL: ""
        }
    ];

    useEffect(() => {
        // We will replace this with an actual Supabase fetch later when the DB is ready
        // const fetchCreator = async () => {
        //     const { data } = await supabase.from('creators').select().eq('id', id).single();
        //     setCreator(data);
        // }
        // fetchCreator();

        const foundCreator = dummyCreators.find(c => c.id === parseInt(id));
        if (foundCreator) {
            setCreator(foundCreator);
        }
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
        
        // await supabase
        //     .from('creators')
        //     .update({ 
        //         name: creator.name, 
        //         url: creator.url, 
        //         description: creator.description, 
        //         imageURL: creator.imageURL 
        //     })
        //     .eq('id', id);

        alert(`Simulated update for ${creator.name}!`);
        navigate('/');
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this creator?");
        if (confirmDelete) {
            // await supabase.from('creators').delete().eq('id', id);
            alert("Deleted! (Simulation)");
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
