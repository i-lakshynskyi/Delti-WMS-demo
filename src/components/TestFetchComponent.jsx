import React, {useEffect, useState} from 'react';

const TestFetchComponent = () => {
    const [data, setData] = useState(null);
    console.log("data: ", data);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(res => setData(res))
            .catch(err => {
                console.error('Fetch error:', err);
                setData({error: 'Не вдалося отримати дані'});
            });
    }, []);

    return (
        <div className="h-[85vh] overflow-x-auto overflow-y-auto">
            <h3 className="text-lg font-semibold mb-2">Тестове отримання даних:</h3>

            <pre className="bg-gray-100 p-2 w-max">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
};

export default TestFetchComponent;
