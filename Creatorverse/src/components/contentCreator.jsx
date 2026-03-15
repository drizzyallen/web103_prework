const ContentCreator = ({ name, url, description, imageURL }) => {
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
                {url && (
                    <a href={url} target="_blank" rel="noopener noreferrer" role="button">
                        Visit Channel
                    </a>
                )}
            </footer>
        </article>
    );
};

export default ContentCreator;