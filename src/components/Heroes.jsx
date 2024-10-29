import React, { useContext } from 'react';
import FetchAllCharacters from './FetchAllCharacters';
import CharactersList from './CharactersList';
import { Outlet } from 'react-router-dom';
import { Typography } from '@mui/material';
import { ThemeContext } from './ThemeContext';
import Box from '@mui/material/Box';

const Heroes = ({setInfo, setResults, loading, setLoading, results, info}) => {
  const { themeContext } = useContext(ThemeContext); 
  const url = 'https://rickandmortyapi.com/api/character';

  return (
    <>
      <Typography 
        variant="h1" 
        component="h1"  
        sx={{ 
          color: themeContext.palette.text.secondary, 
          fontSize: '2.7rem',
          mt: 4,
          mb: 4,
          textAlign: 'center',
        }}
      >
        Character List
      </Typography>
      <FetchAllCharacters
        url={url}
        setInfo={setInfo}
        setResults={setResults}
        setLoading={setLoading}
        info={info}
      />
      {loading ? (
        <Box sx={{height:'100vh'}}>
          Loading...
        </Box>
      ) : (
        <>
          <CharactersList results={results} />
          <Outlet />
        </>
      )}
    </>
  );
};

export default Heroes;
