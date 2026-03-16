import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [creator, setCreator] = useState(null);

    useEffect(() => {
        const fetchCreator = async () => {
            const { data } = await supabase.from('creators').select();
            
            // The instructions specifically requested using the filter() method
            // Coercing both to strings handles cases where the DB or URL type differs
            const foundCreator = data.filter(c => String(c.id) === String(id))[0];
            setCreator(foundCreator);
        }
        fetchCreator();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this creator?");
        if (confirmDelete) {
            await supabase.from('creators').delete().eq('id', parseInt(id));
            alert("Deleted!");
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
