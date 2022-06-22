import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';

import App from './App';
import theme from './theme/theme';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</>
);
