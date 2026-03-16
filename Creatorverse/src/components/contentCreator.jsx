import { Link } from 'react-router-dom';

const ContentCreator = ({ id, name, url, description, imageURL }) => {
    return (
        <article className="creator-card">
            <header>
                {imageURL && <img src={imageURL} alt={`${name}'s profile`} style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} />}
                <h3 style={{ marginTop: imageURL ? '1rem' : '0' }}>{name}</h3>
            </header>
            <main>
                <p>{description}</p>
            </main>
            <footer>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {url && (
                        <a href={url} target="_blank" rel="noopener noreferrer" role="button" className="contrast">
                            Visit Channel
                        </a>
                    )}
                    <Link to={`/edit/${id}`} role="button" className="secondary">
                        Edit
                    </Link>
                </div>
            </footer>
        </article>
    );
};

export default ContentCreator;