import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PanoramaIcon from '@mui/icons-material/Panorama';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { imageList } from "../store/store";

const pages = [];
function HeaderMenu() {
	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
			primary: {
				main: '#1976d2',
			},
		},
	});
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	const navigate = useNavigate();
	const { searchResults, setSearchResults } = imageList();

	const handleLogOut = () => {
		const cookieName = "hash"; // Sileceğiniz çerezin adını buraya yazın
		document.cookie = `${encodeURIComponent(cookieName)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		setSearchResults(""); // searchResults'ı boşalt
		navigate('/');
	}


	return (
		<ThemeProvider theme={darkTheme}>
			<AppBar position="static" style={{ backgroundColor: "#282c34", backgroundImage: "inherit" }}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<PanoramaIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
						<Typography
							variant="h6"
							noWrap
							component="a"
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							Stock Photo App
						</Typography>

						<PanoramaIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
						<Typography
							variant="h5"
							noWrap
							component="a"
							sx={{
								mr: 2,
								display: { xs: 'flex', md: 'none' },
								flexGrow: 1,
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							Stock Photo App
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						</Box>

						<Box sx={{ flexGrow: 0 }}>
							<IconButton onClick={handleLogOut} >
								<ExitToAppIcon />
							</IconButton>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</ThemeProvider>
	);
}
export default HeaderMenu;