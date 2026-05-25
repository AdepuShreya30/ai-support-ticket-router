import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

function ResultsPage() {
    const location = useLocation();
    const { analysis, ticket } = location.state || {};

    const [guidance, setGuidance] = useState(null);
    const [finalEmail, setFinalEmail] = useState(null);
    const [loading, setLoading] = useState({ guidance: false, email: false });
    const [error, setError] = useState({ guidance: '', email: '' });

    useEffect(() => {
        if (!analysis) {
            // Redirect or show error if state is missing
            // For simplicity, we'll just log it. A real app might navigate back.
            console.error("No analysis data found. Please start from the home page.");
        }
    }, [analysis]);

    const fetchGuidance = async () => {
        setLoading(prev => ({ ...prev, guidance: true }));
        setError(prev => ({ ...prev, guidance: '' }));
        try {
            const response = await axios.post('http://localhost:8000/api/guidance', { ticket, analysis });
            setGuidance(response.data.guidance);
        } catch (err) {
            setError(prev => ({ ...prev, guidance: 'Failed to fetch guidance.' }));
        } finally {
            setLoading(prev => ({ ...prev, guidance: false }));
        }
    };

    const fetchEmail = async () => {
        if (!guidance) {
            setError(prev => ({ ...prev, email: 'Please generate guidance first.' }));
            return;
        }
        setLoading(prev => ({ ...prev, email: true }));
        setError(prev => ({ ...prev, email: '' }));
        try {
            const response = await axios.post('http://localhost:8000/api/email', { ticket, analysis, guidance });
            setFinalEmail(response.data.finalEmail);
        } catch (err) {
            setError(prev => ({ ...prev, email: 'Failed to fetch email.' }));
        } finally {
            setLoading(prev => ({ ...prev, email: false }));
        }
    };

    if (!analysis) {
        return (
            <div className="container">
                <h2>No Data</h2>
                <p>Please <Link to="/">submit a ticket</Link> first.</p>
            </div>
        );
    }

    const guidanceButtonText = analysis.urgency === 'High' ? 'Generate Troubleshooting Steps' : 'Generate Self-Service Guidance';

    return (
        <div className="container">
            <header>
                <h1>Ticket Analysis Results</h1>
                <Link to="/" style={{ color: 'var(--primary-color)' }}>&larr; Submit another ticket</Link>
            </header>

            <main className="results">
                <div className="card">
                    <h3>Initial Analysis</h3>
                    <div className="analysis-grid">
                        <span>Category</span><strong>{analysis.category}</strong>
                        <span>Urgency</span><strong className={`urgency-${analysis.urgency?.toLowerCase()}`}>{analysis.urgency}</strong>
                        <span>Sentiment</span><strong>{analysis.sentiment}</strong>
                    </div>
                </div>

                <div className="card">
                    <h3>Next Steps</h3>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button onClick={fetchGuidance} disabled={loading.guidance}>{loading.guidance ? 'Generating...' : guidanceButtonText}</button>
                        <button onClick={fetchEmail} disabled={loading.email || !guidance}>{loading.email ? 'Generating...' : 'Generate Suggested Email'}</button>
                    </div>
                    {error.guidance && <p className="error-box" style={{ marginTop: '1rem' }}>{error.guidance}</p>}
                    {error.email && <p className="error-box" style={{ marginTop: '1rem' }}>{error.email}</p>}
                </div>

                {guidance && (
                    <div className="card">
                        <h3>{guidanceButtonText.replace('Generate ', '')}</h3>
                        <pre>{guidance}</pre>
                    </div>
                )}

                {finalEmail && (
                    <div className="card">
                        <h3>Suggested Customer Email</h3>
                        <pre>{finalEmail}</pre>
                    </div>
                )}
            </main>
        </div>
    );
}

export default ResultsPage;