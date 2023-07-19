import PropTypes from 'prop-types';
import { Label, Input } from './Filter.styled';

export const Filter = ({ value, onChange }) => {
  return (
    <>
      <Label>
        Find contacts by name
        <Input
          placeholder="Enter name"
          onChange={onChange}
          value={value}
          type="text"
        />
      </Label>
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
