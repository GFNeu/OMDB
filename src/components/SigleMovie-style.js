import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
  root: {
    marginTop: theme.spacing(3)
  },
  paper: {
    
      display: "flex",
      flexDirection: "column",
      //width: 170,
      height: 400,
      border: "solid white 5px",
    },
  header: {
    boxSizing: "border-box",
    display: "flex",
      flexDirection: "column",
      //width: 170,
      height: 410,
      flexGrow: 1,
      border: "solid white 5px",
      padding: theme.spacing(1)
  },
  title: {
    paddingBottom: theme.spacing(1),
    borderBottom: "solid #e0e0e0 1px",
    marginBottom: theme.spacing(1)
  },
  padding: {
    padding: theme.spacing(1)
  },
  rated: {
    border: "solid 1px",
    padding: "0px 5px",
    borderColor: theme.palette.grey.A200,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[50]
  },
  ratingContainer: {
    boxSizing: "border-box",
    borderTop: "solid #e0e0e0 1px",
    marginTop: theme.spacing(7),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    maxHeight: 50,
    marginBottom: theme.spacing(2)
  },
  rating1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  rating: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderLeft: "solid #e0e0e0 1px",
  },
  ratingLogo: {
    width: "auto",
    height: "auto",
    maxHeight: 35
  },
  plot: {
    boxSizing: "border-box",
    height: "auto",
    border: "solid white 5px",
    padding: theme.spacing(1)
  },
  th5: {
    lineHeight: "1.5rem",
    marginTop: theme.spacing(1)
  },
  th6: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)    
  },
  column:{
    display: "flex",
    flexFlow: "column"
  },
  row1: {
    backgroundColor: theme.palette.grey[50],
    padding: theme.spacing(1)
  },
  row2: {
    padding: theme.spacing(1)
  }

    
  }));

  export default useStyles