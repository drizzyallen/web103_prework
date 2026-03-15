import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [creator, setCreator] = useState(null);

    // Dummy data fallback for now
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
        setCreator(foundCreator);
        
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this creator?");
        if (confirmDelete) {
            // await supabase.from('creators').delete().eq('id', id);
            alert("Deleted! (Simulation)");
            navigate('/');
        }
    };

    if (!creator) return <p>Loading creator...</p>;

    return (
        <div className="container">
            <article>
                <header>
                    {creator.imageURL && (
                        <img 
                            src={creator.imageURL} 
                            alt={`${creator.name}'s profile`} 
                            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }} 
                        />
                    )}
                    <h2 style={{ marginTop: creator.imageURL ? '1.5rem' : '0' }}>{creator.name}</h2>
                </header>
                
                <main>
                    <p>{creator.description}</p>
                    {creator.url && (
                        <p>
                            <strong>Channel/Link: </strong>
                            <a href={creator.url} target="_blank" rel="noopener noreferrer">{creator.url}</a>
                        </p>
                    )}
                </main>
                
                <footer>
                    <div className="grid">
                        <Link to={`/edit/${creator.id}`} role="button" className="secondary">Edit Content Creator</Link>
                        <button onClick={handleDelete} className="contrast">Delete Content Creator</button>
                    </div>
                </footer>
            </article>
        </div>
    );
};

export default ViewCreator;
