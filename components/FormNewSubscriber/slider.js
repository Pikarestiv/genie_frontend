// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Slider from '@material-ui/core/Slider';

// const useStyles = makeStyles(theme => ({
//     root: {
//         width: 300,
//     },
//     margin: {
//         height: theme.spacing(3),
//     },
// }));

// const marks = [
//     {
//         value: 0,
//         label: '< 1 hectare',
//     },
//     {
//         value: 50,
//         label: '1 - 50 hectares',
//     },
//     {
//         value: 100,
//         label: '> 50 hectares',
//     },
// ];

// function valuetext(value) {
//     // console.log(value);
//     return `${value}hec`;
// }

// function valueLabelFormat(value) {
//     return marks.findIndex(mark => mark.value === value) + 1;
// }

// export default function DiscreteSlider() {
//     const classes = useStyles();

//     return (
//         <div className={classes.root}>
//             <Slider
//                 defaultValue={0}
//                 getAriaValueText={valuetext}
//                 aria-labelledby="discrete-slider-custom"
//                 step={50}
//                 valueLabelDisplay="auto"
//                 marks={marks}
//                 value
//             />
//             <div className={classes.margin} />
//         </div>
//     );
// }