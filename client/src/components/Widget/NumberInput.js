import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useEffect, useState } from "react";

const DecreaseButton = ({ disabled, handleDecrease }) => {
  const handleClick = () => {
    handleDecrease((prev) => +prev - 100);
  };

  return (
    <InputAdornment position="start">
      <IconButton disabled={disabled} onClick={handleClick} sx={{ padding: 0 }}>
        <RemoveIcon />
      </IconButton>
    </InputAdornment>
  );
};

const IncreaseButton = ({ disabled, handleIncrease }) => {
  const handleClick = () => {
    handleIncrease((prev) => +prev + 100);
  };

  return (
    <InputAdornment position="end">
      <IconButton disabled={disabled} onClick={handleClick} sx={{ padding: 0 }}>
        <AddIcon />
      </IconButton>
    </InputAdornment>
  );
};

export default function NumberInput({
  InputProps,
  value,
  disabled,
  onChange,
  ...rest
}) {
  const [currValue, setCurrValue] = useState(value);

  const handleDecrease = useCallback(() => {
    setCurrValue((prev) => +prev - 100);
  }, []);

  const handleIncrease = useCallback(() => {
    setCurrValue((prev) => +prev + 100);
  }, []);

  const handleChange = useCallback((e) => {
    const parsed = +e.target.value;
    if (isNaN(parsed)) {
      return;
    }

    setCurrValue(parsed);
  }, []);

  useEffect(() => {
    setCurrValue(value);
  }, [value]);

  useEffect(() => {
    onChange(currValue);
  }, [currValue, onChange]);

  return (
    <TextField
      value={currValue}
      disabled={disabled}
      onChange={handleChange}
      fullWidth
      InputProps={{
        startAdornment: (
          <DecreaseButton disabled={disabled} handleDecrease={handleDecrease} />
        ),
        endAdornment: (
          <IncreaseButton disabled={disabled} handleIncrease={handleIncrease} />
        ),
        ...InputProps,
      }}
      {...rest}
    />
  );
}
