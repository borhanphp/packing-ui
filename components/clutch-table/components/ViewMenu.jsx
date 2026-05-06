'use client'

import { useState } from 'react'
import {
  Button, Menu, MenuItem, ListItemIcon, ListItemText, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Tooltip, IconButton,
} from '@mui/material'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import Check from '@mui/icons-material/Check'
import Save from '@mui/icons-material/Save'
import SaveAs from '@mui/icons-material/SaveAs'
import EditIcon from '@mui/icons-material/Edit'
import Star from '@mui/icons-material/Star'
import StarBorder from '@mui/icons-material/StarBorder'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'

export function ViewMenu({
  views, currentId, defaultId, onSelect, onSave, onSaveAs, onRename, onDelete, onSetDefault,
}) {
  const [anchor, setAnchor] = useState(null)
  const [dialogMode, setDialogMode] = useState(null)
  const [dialogValue, setDialogValue] = useState('')

  const closeMenu = () => setAnchor(null)
  const currentName = views.find((v) => v.id === currentId)?.name ?? null

  const openSaveAs = () => { setDialogValue(''); setDialogMode('saveAs'); closeMenu() }
  const openRename = () => { setDialogValue(currentName ?? ''); setDialogMode('rename'); closeMenu() }
  const submit = () => {
    const name = dialogValue.trim()
    if (!name) return
    if (dialogMode === 'saveAs') onSaveAs(name)
    else if (dialogMode === 'rename' && currentId) onRename(currentId, name)
    setDialogMode(null)
  }

  return (
    <>
      <Tooltip title="Saved views">
        <Button size="small" variant="outlined" endIcon={<KeyboardArrowDown />}
          onClick={(e) => setAnchor(e.currentTarget)}
          sx={{ textTransform: 'none', maxWidth: 220, minWidth: 0 }}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {currentName ?? 'View'}
          </span>
        </Button>
      </Tooltip>

      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={closeMenu}
        slotProps={{ paper: { sx: { minWidth: 260 } } }}>
        {views.length === 0 && (
          <MenuItem disabled dense><ListItemText primary="No saved views yet" /></MenuItem>
        )}
        {views.map((v) => (
          <MenuItem key={v.id} selected={v.id === currentId}
            onClick={() => { onSelect(v.id); closeMenu() }} dense>
            <ListItemIcon sx={{ minWidth: 28 }}>
              {v.id === currentId ? <Check fontSize="small" /> : null}
            </ListItemIcon>
            <ListItemText primary={v.name} secondary={v.id === defaultId ? 'default' : undefined} />
            <Tooltip title={v.id === defaultId ? 'Default view' : 'Set as default'}>
              <IconButton size="small" edge="end"
                onClick={(e) => { e.stopPropagation(); onSetDefault(v.id === defaultId ? null : v.id) }}>
                {v.id === defaultId ? (
                  <Star fontSize="small" sx={{ color: 'warning.main' }} />
                ) : (
                  <StarBorder fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={() => { onSave(); closeMenu() }} dense disabled={!currentId}>
          <ListItemIcon><Save fontSize="small" /></ListItemIcon>
          <ListItemText primary="Save changes to this view" />
        </MenuItem>
        <MenuItem onClick={openSaveAs} dense>
          <ListItemIcon><SaveAs fontSize="small" /></ListItemIcon>
          <ListItemText primary="Save as new view…" />
        </MenuItem>
        <MenuItem onClick={openRename} dense disabled={!currentId}>
          <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Rename current" />
        </MenuItem>
        <MenuItem onClick={() => { if (currentId) onDelete(currentId); closeMenu() }}
          dense disabled={!currentId || views.length <= 1}>
          <ListItemIcon><DeleteOutlined fontSize="small" /></ListItemIcon>
          <ListItemText primary="Delete current" />
        </MenuItem>
      </Menu>

      <Dialog open={dialogMode != null} onClose={() => setDialogMode(null)} maxWidth="xs" fullWidth>
        <DialogTitle>{dialogMode === 'saveAs' ? 'Save view as' : 'Rename view'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="View name" fullWidth
            value={dialogValue} onChange={(e) => setDialogValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
            inputProps={{ maxLength: 60 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogMode(null)}>Cancel</Button>
          <Button onClick={submit} variant="contained" disabled={!dialogValue.trim()}>
            {dialogMode === 'saveAs' ? 'Save' : 'Rename'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
