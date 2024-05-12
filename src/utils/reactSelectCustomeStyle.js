export const customSelectStyles = {
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    color: state.isSelected && "#262626",
    backgroundColor: state.isSelected && "#FF9B44",
    "&:hover": {
      backgroundColor: "#FF9B44",
      color: "#262626",
    },
  }),
  // To increase the height of the control wrapper
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "transparent",
    minHeight: '44px', // Set the desired height here
    border: state.isFocused ? '1px solid #E3E3E3' : '1px solid #E3E3E3',
    boxShadow: state.isFocused ? 'none' : 'none',
    '&:hover': {
      border: state.isFocused ? '1px solid #E3E3E3' : '1px solid #E3E3E3',
    },
  })
}