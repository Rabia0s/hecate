import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const products = [
  { id: 1, name: 'HECATE Unisex Parfüm' },
  { id: 2, name: 'HECATE Bitki Esanslı Koku' },
  { id: 3, name: 'HECATE Vegan Friendly' },
  { id: 4, name: 'HECATE Cinsiyetsiz Parfüm' }
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const query = useQuery();
  const searchTerm = query.get('q') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
  }, [searchTerm]);

  return (
    <div className="search-page">
      <h1>Arama Sonuçları</h1>
      {searchTerm ? (
        <>
          <p>{results.length} sonuç bulundu: "{searchTerm}"</p>
          <ul>
            {results.map(p => <li key={p.id}>{p.name}</li>)}
          </ul>
        </>
      ) : (
        <p>Lütfen arama terimi girin.</p>
      )}
    </div>
  );
};

export default SearchPage;
