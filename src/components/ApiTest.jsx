import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';

const ApiTest = () => {
    const [publicData, setPublicData] = useState(null);
    const [privateData, setPrivateData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const testConnection = async () => {
            try {
                setIsLoading(true);
                console.log('Testing API connection...');
                
                // Test public endpoint
                const [publicError, publicResponse] = await apiService.get('/test');
                if (publicError) {
                    console.error('Public API Error:', publicError);
                    throw new Error(`Public API Error: ${publicError.response?.status} ${publicError.response?.statusText}`);
                }
                setPublicData(publicResponse.message);

                // Test protected endpoint
                const [privateError, privateResponse] = await apiService.get('/auth-test');
                if (privateError) {
                    console.warn('Protected API Error:', privateError);
                    // Don't throw error for auth test - it's expected to fail if not logged in
                    setPrivateData('Not authenticated');
                } else {
                    setPrivateData(privateResponse.message);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        testConnection();
    }, []);

    if (isLoading) {
        return (
            <div className="p-4 bg-white rounded-lg shadow">
                <h2 className="text-lg font-bold mb-4">Testing API Connection...</h2>
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">API Connection Test</h2>
            
            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <h3 className="font-medium">Public API:</h3>
                    <p>{publicData || 'No response'}</p>
                </div>

                <div>
                    <h3 className="font-medium">Protected API:</h3>
                    <p>{privateData || 'No response'}</p>
                </div>
            </div>
        </div>
    );
};

export default ApiTest;