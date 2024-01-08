const zIndex = {
  // z-indexes for mobileStepper, fab and speedDial not set in styleguide.
  // Currently, they follow the mui standards: https://mui.com/material-ui/customization/z-index/
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  // ----------------------------------------

  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,

  // MUI doesn't support adding a new variable for z-index. So, these are set from the component level.
  // Commented intentionally
  // popover: 1450
  // dropdown: 1050
};

export default zIndex;
