import React, {useState } from 'react'
import './Business.css'

const Business = () => {
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [businessData, setBusinessData] = useState(null)
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('https://business-assignment-backend.onrender.com/business-data', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, location}),
            });
            const data = await response.json()
            setBusinessData(data);
        } catch(err) {
            console.error('Error:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleRegenerate = async () => {
        try {
            const res = await fetch(`https://business-assignment-backend.onrender.com/regenerate-headline?name=${name}&location=${location}`)
            const data = await res.json()
            setBusinessData(prev => ({...prev, headline: data.headline}))
        } catch (err){
            console.error('Error:', err)
        }
    }

    return (
        <div className='container'>
            <h1>Local Business Dashboard</h1>
            {!businessData && (
                <form onSubmit={handleSubmit} className='details'>
                    <div className='businessData'>
                        <div className='content'>
                            <span>Business Name</span>
                            <input type='text' className="inputEl" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className='content'>
                            <span>Location</span>
                            <input type='text' className="inputEl" value={location} onChange={(e) => setLocation(e.target.value)} required />
                        </div>
                        <button type='submit' disabled={loading}>
                            {loading ? 'Loading' : 'Submit'}
                        </button>
                    </div>
                </form>
            )}

            {businessData && (
                <div>
                    <h2>{name} in {location}</h2>
                    <p>Rating: {businessData.rating} </p>
                    <p>Reviews: {businessData.reviews} </p>
                    <p>{businessData.headline}</p>
                    <button
                        onClick={handleRegenerate}
                    >
                        Regenerate SEO Headline
                    </button>
                </div>
            )}

        </div>
    )
}

export default Business
