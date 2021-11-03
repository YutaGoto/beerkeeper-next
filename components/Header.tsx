import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React from "react";
import useStorage from "../hook/useStorage";
import { useToken } from "../hook/useToken";

const Header = () => {
  const {removeItem} = useStorage()
  const {token} = useToken()
  const router = useRouter()

  const handleLogout = () => {
    removeItem('token')
    router.replace('/login')
  }

  if (token) {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Event
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Log out</Button>
        </Toolbar>
      </AppBar>
    )
  } else {
    return <></>
  }
}

export default Header
