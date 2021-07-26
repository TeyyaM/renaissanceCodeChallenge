import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

export default function SimpleAlerts(props) {

  // props.severity can be "error", "warning", "info", or "success"
  const classes = useStyles();
  const { severity, message, open } = props;

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert severity={severity}>
          <AlertTitle>{capitalizeFirstLetter(severity)}</AlertTitle>
          Alert: {message}
        </Alert>
      </Collapse>
    </div>
  );
}