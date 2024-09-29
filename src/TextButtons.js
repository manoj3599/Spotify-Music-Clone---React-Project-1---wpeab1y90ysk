import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { createTheme, ThemeProvider, alpha, getContrastRatio } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        violet: {
            main: '#7F00F'
        },
    },
});
export default function TextButtons() {
    return (
        <ThemeProvider theme={theme}>
            <Stack direction="row" spacing={2}>
                <Button color="voilet.main">Success</Button>
            </Stack>
        </ThemeProvider>
    );
}
