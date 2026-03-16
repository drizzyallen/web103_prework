import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentCreator from '../components/contentCreator';
import { supabase } from '../client';

const ShowCreators = () => {
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        const fetchCreators = async () => {
            const { data } = await supabase.from('creators').select();
            setCreators(data);
        }
        fetchCreators();
    }, []);

    return (
        <div className="container" style={{ marginTop: '2rem' }}>
            {creators && creators.length > 0 ? (
                <div className="grid">
                    {creators.map((creator) => (
                        <div key={creator.id} style={{ marginBottom: '1rem' }}>
                            <ContentCreator
                                id={creator.id}
                                name={creator.name}
                                url={creator.url}
                                description={creator.description}
                                imageURL={creator.imageURL}
                            />
                            <Link to={`/creators/${creator.id}`} role="button" style={{ display: 'block', textAlign: 'center' }}>
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <h2 style={{ color: '#6fb0e0' }}>NO CREATORS YET 😞</h2>
                </div>
            )}
        </div>
    );
};

export default ShowCreators;
