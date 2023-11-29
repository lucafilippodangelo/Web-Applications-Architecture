import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';

import {authenticationContext} from "../../reactContext/authenticationContext";
import {
    AppBar,
    Box, Button,
    Divider, Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"

const Navigation = props => {

    const auth = useContext(authenticationContext);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen((prevState) => !prevState);
    };

    let navItems = [
        {
            text: "Surfers",
            to: `/`,
            display: true,
            onClick: () => {}
        },
        {
            text: "My Places",
            to: `/${auth.userId}/surfplacesx`,
            display: auth.isLoggedIn,
            onClick: () => {}
        },
        {
            text: "Add Surf Place",
            to: "/surfplaces/new",
            display: auth.isLoggedIn,
            onClick: () => {}
        },
        {
            text: "Authentication",
            to: "/authenticate",
            display: !auth.isLoggedIn,
            onClick: () => {}
        },
        {
            text: "Log Out",
            to: `/`,
            display: auth.isLoggedIn,
            onClick: auth.logout
        }
    ].filter(i => i.display);

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2}}>
                Surfing
            </Typography>
            <Divider/>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton onClick={item.onClick} component={Link} to={item.to} sx={{textAlign: 'center'}}>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', mb:12 }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Surfing
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button onClick={item.onClick} component={Link} to={item.to} key={item} sx={{ color: '#fff' }}>
                                {item.text}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );

};

export default Navigation;