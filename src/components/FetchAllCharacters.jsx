import { useEffect } from 'react';

const FetchAllCharacters = ({ url, setLoading, setResults, setInfo, info }) => {
    useEffect(() => {
        const fetchAllCharacters = async () => {
            setLoading(true);
            let allCharacters = [];
            let nextUrl = url;

            try {
                while (nextUrl) {
                    const response = await fetch(nextUrl);

                    if (!response.ok) {
                        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
                    }

                    const { info, results } = await response.json();
                    allCharacters = [...allCharacters, ...results];
                    nextUrl = info.next;
                }

                setResults(allCharacters);
                setInfo(info);
            } catch (error) {
                console.error('Error:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllCharacters();
    }, []);

    return null;
};

export default FetchAllCharacters;
