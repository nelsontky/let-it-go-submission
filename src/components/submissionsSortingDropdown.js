import React from 'react';

// Material UI imports
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default class SubmissionsSortingDropdown extends React.Component {
  render() {
    return (
      <FormControl>
        <InputLabel>Sort by</InputLabel>
        <Select
          value={this.props.value}
          autoWidth
          onChange={this.props.handleSorting}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="date">Date (Newest first)</MenuItem>
          <MenuItem value="status">Status</MenuItem>
        </Select>
      </FormControl>
    );
  }
}
