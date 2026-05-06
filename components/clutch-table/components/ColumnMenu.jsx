'use client'

import { Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import PushPinIcon from '@mui/icons-material/PushPin'
import PushPinOutlined from '@mui/icons-material/PushPinOutlined'
import ArrowUpward from '@mui/icons-material/ArrowUpward'
import ArrowDownward from '@mui/icons-material/ArrowDownward'
import ClearAll from '@mui/icons-material/ClearAll'

export function ColumnMenu({ anchorEl, onClose, column, currentPin, onSort, onHide, onPin }) {
  if (!column) return null
  const sortable = column.sortable !== false
  const hideable = column.hideable !== false
  const pinnable = column.pinnable !== false

  return (
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
      {sortable && [
        <MenuItem key="asc" onClick={() => { onSort('asc'); onClose() }}>
          <ListItemIcon><ArrowUpward fontSize="small" /></ListItemIcon>
          <ListItemText>Sort ascending</ListItemText>
        </MenuItem>,
        <MenuItem key="desc" onClick={() => { onSort('desc'); onClose() }}>
          <ListItemIcon><ArrowDownward fontSize="small" /></ListItemIcon>
          <ListItemText>Sort descending</ListItemText>
        </MenuItem>,
        <MenuItem key="clear" onClick={() => { onSort(null); onClose() }}>
          <ListItemIcon><ClearAll fontSize="small" /></ListItemIcon>
          <ListItemText>Clear sort</ListItemText>
        </MenuItem>,
        <Divider key="d1" />,
      ]}

      {pinnable && [
        <MenuItem key="pin-left" selected={currentPin === 'left'}
          onClick={() => { onPin(currentPin === 'left' ? null : 'left'); onClose() }}>
          <ListItemIcon>
            {currentPin === 'left' ? <PushPinIcon fontSize="small" /> : <PushPinOutlined fontSize="small" />}
          </ListItemIcon>
          <ListItemText>Pin left</ListItemText>
        </MenuItem>,
        <MenuItem key="pin-right" selected={currentPin === 'right'}
          onClick={() => { onPin(currentPin === 'right' ? null : 'right'); onClose() }}>
          <ListItemIcon>
            {currentPin === 'right' ? <PushPinIcon fontSize="small" /> : <PushPinOutlined fontSize="small" />}
          </ListItemIcon>
          <ListItemText>Pin right</ListItemText>
        </MenuItem>,
        <Divider key="d2" />,
      ]}

      {hideable && (
        <MenuItem onClick={() => { onHide(); onClose() }}>
          <ListItemIcon><VisibilityOff fontSize="small" /></ListItemIcon>
          <ListItemText>Hide column</ListItemText>
        </MenuItem>
      )}
    </Menu>
  )
}
