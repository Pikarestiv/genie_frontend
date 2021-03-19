import React, {useState, useEffect} from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';

import {getApiLink} from '../../utils';

export default ({classes = {}, onChange, className = ''}) => {
  const [selectedUnit, setSelectedUnit] = useState('');
  const [units, setUnits] = useState([]);

  useEffect(() => {
    (async () => {
      await fetch(getApiLink('grant/all/units'))
      .then(res => res.json())
      .then(json => setUnits(json))
      .catch(err => console.error(err));
    })()
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(selectedUnit);
    }
  }, [selectedUnit]);

  return (
    <FormControl className={`${classes.formControl} ${className}`}>
      <InputLabel htmlFor='selected-unit-id'>Paid per</InputLabel>
      <Select
        value={selectedUnit}
        onChange={e => setSelectedUnit(e.target.value)}
        input={<Input name='selected-unit' id='selected-unit-id' />}
      >
        <MenuItem value="">
          <em>Not specified</em>
        </MenuItem>
        {units.length > 0 && units.sort().map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
      </Select>
    </FormControl>
  )
}