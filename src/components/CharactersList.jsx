import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import Box from '@mui/material/Box';
import { memo } from 'react';

const CharactersList = memo(({ results }) => {

  const { themeContext } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/heroes/${id}`);
  };

  const rows = results.map((character) => ({
    id: character.id,
    name: character.name,
    status: character.status,
  }));

  return (
    <Box sx={{  height: '70vh' }}>
      <DataGrid
        sx={{
          '& .MuiDataGrid-row': {
            backgroundColor: themeContext.palette.background.paper,
            color: themeContext.palette.text.primary,
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: themeContext.palette.hoverColor.main,
          },
        }}
        rows={rows}
        columns={[
          { field: 'id', headerName: 'ID', width: 90 },
          { field: 'name', headerName: 'Name', width: 200 },
          { field: 'status', headerName: 'Status', width: 100 },
        ]}
        pageSize={5}
        onRowClick={(params) => handleRowClick(params.row.id)}
      />
    </Box>
  );
});

export default CharactersList;
