// src/theme.js (or wherever you wish to store your theme)

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: [
            'Pokemon Solid',
            'sans-serif', 
        ].join(','),
    },
});

export default theme;
