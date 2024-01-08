import { Theme } from '@mui/material';
import { merge } from 'lodash';

import Alert from './Alert';
import Button from './Button';
import Checkbox from './Checkbox';
import FormControlLabel from './FormControlLabel';
import {
  InputLabel,
  InputBase,
  FormHelperText,
  InputAdornment,
  Select,
} from './input';
import IconButton from './IconButton';
import Table from './Table';
import List from './List';
import Paper from './Paper';
import Popover from './Popover';
import Avatar from './Avatar';
import { Dialog, DialogTitle, DialogContent, DialogActions } from './dialog';
import Divider from './Divider';
import Chip from './Chip';
import Tab from './Tab';
import { CssBaseline } from './CssBaseline';
import Accordion from './Accordion';
import Switch from './Switch';

const ComponentsOverrides = (theme: Theme) =>
  merge(
    CssBaseline(),
    Alert(theme),
    InputLabel(theme),
    InputBase(theme),
    FormHelperText(theme),
    InputAdornment(theme),
    Button(theme),
    Checkbox(),
    FormControlLabel(theme),
    IconButton(theme),
    Table(theme),
    Select(theme),
    List(theme),
    Paper(theme),
    Popover(theme),
    Dialog(theme),
    DialogTitle(theme),
    DialogContent(theme),
    DialogActions(theme),
    Avatar(theme),
    Divider(theme),
    Chip(theme),
    Tab(theme),
    Accordion(theme),
    Switch(theme)
  );

export default ComponentsOverrides;
