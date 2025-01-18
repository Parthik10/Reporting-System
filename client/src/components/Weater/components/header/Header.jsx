import { useRef, useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import {
  FaMoon,
  FaSun,
  FaLocationCrosshairs,
  FaLocationDot,
} from "react-icons/fa6";
import { useAppContext } from "../../context/AppContext";
import UseCurrentLocation from "../../Hooks/UseCurrentLocation";
import UseToogleTheme from "../../Hooks/UseToogleTheme";

import { Container, Paper, IconButton, InputBase, Button, Box, List, ListItem, ListItemText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getCurrentLocationWeather, isDisabled } = UseCurrentLocation();
  const { isDarkMode, toggleMode } = UseToogleTheme();
  const {
    setQuery,
    searchResults,
    setSearchResults,
    setLatitude,
    setLongitude,
  } = useAppContext();
  const inputRef = useRef();
  const listRef = useRef();

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const handleSearchInput = useCallback(
    debounce((event) => {
      const query = event.target.value.trim();
      if (query === "" || query.length <= 2) {
        setSearchResults([]);
        return;
      }
      if (query.length > 0) {
        inputRef.current.classList.add("show"); // Add your style if needed
      } else {
        inputRef.current.classList.remove("show");
      }
      setQuery(query);
    }, 1200),
    [setQuery, setSearchResults]
  );

  const handleItemClick = (lat, lon) => {
    setLatitude(lat);
    setLongitude(lon);
    setQuery(null);
    setSearchResults([]);
    setIsSearchOpen(false);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.classList.remove("show");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0",
        gap: 2,
        position: "relative",
        flexWrap: "nowrap",
        mt: 3,
      }}
    >
      {/* Search Bar */}
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "500px",
          maxWidth: "600px",
          flexGrow: 1,
        }}
      >
        <IconButton sx={{ p: "10px" }} onClick={openSearch} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search city..."
          inputRef={inputRef}
          inputProps={{ "aria-label": "search city" }}
          onChange={handleSearchInput}
        />
      </Paper>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <List
          ref={listRef}
          sx={{
            width: "100%",
            maxWidth: 600,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 1,
            maxHeight: 200,
            overflowY: "auto",
            position: "absolute",
            top: "60px",
            left: 0,
          }}
        >
          {searchResults.map((country) => (
            <ListItem
              key={country.lon}
              button
              onClick={() => handleItemClick(country.lat, country.lon)}
            >
              <FaLocationDot style={{ marginRight: "8px" }} />
              <ListItemText
                primary={country.name}
                secondary={`${country.state || ""} ${country.country}`}
              />
            </ListItem>
          ))}
        </List>
      )}

      <Container
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "flex-end",
          alignItems: "center",
          flexGrow: 0,
        }}
        disableGutters
      >
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          startIcon={<MyLocationIcon />}
          onClick={getCurrentLocationWeather}
          disabled={isDisabled}
          sx={{ borderRadius: 50 }}
        >
          Current Location
        </Button>
        {/* <Button
          variant="contained"
          onClick={toggleMode}
          sx={{
            backgroundColor: isDarkMode ? "black" : "white",
            color: isDarkMode ? "white" : "black",
            minWidth: 50,
            padding: "10px",
            borderRadius: "50%",
          }}
        >
          {isDarkMode ? (
            <LightModeIcon sx={{ color: "white" }} />
          ) : (
            <DarkModeIcon sx={{ color: "black" }} />
          )}
        </Button> */}
      </Container>
    </Container>
  );
}

export default Header;
