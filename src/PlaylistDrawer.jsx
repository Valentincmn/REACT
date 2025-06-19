import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

import { useState } from "react"

export default function PlaylistDrawer({ playlistTracks, setPlaylistTracks }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)}>

    </Box>
  );

  console.log(playlistTracks)

  return (
    <div className='playlist-drawer'>
      <Button onClick={toggleDrawer(true)}><LibraryMusicIcon /></Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
