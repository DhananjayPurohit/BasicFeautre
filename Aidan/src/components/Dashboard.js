import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import {MainListItems, SecondaryListItems} from './listItems';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
// import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import GridLayout from 'react-grid-layout';
import { Responsive, WidthProvider } from 'react-grid-layout';
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';
import CloseIcon from '@material-ui/icons/Close';
import vegaEmbed from 'vega-embed';
import Axios from 'axios';

import Dialog from '@material-ui/core/Dialog';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DoneIcon from '@material-ui/icons/Done';
import Fade from '@material-ui/core/Fade';
import Cookies from 'universal-cookie';
import TextField from '@material-ui/core/TextField';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import Autocomplete from '@material-ui/lab/Autocomplete';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

var fuck = true;

const makeid = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return "Untitled_"+result;
}

 //var passenger_url = '/visual/horizon/?r=1';

var uid = makeid(6);
console.log(uid)

var layout1 = {};
// var dashname1 = uid;

var port = "http://192.168.43.8:8080";

// var port = "http://localhost:8080";

const ResponsiveGridLayout = WidthProvider(Responsive);
var datajson = {
  todos: [
    {
      taskID: 'a',
      task: 'Boarding Gates'
    },
    {
      taskID: 'b',
      task: 'Passenger Footfall'
    },
    {
      taskID: 'c',
      task: 'Available Parking'
    }
  ],
  closedTasks: [{
    taskID: 'd',
    task: 'Baggage Belts'
  }],
  draggedTasks: [{
    taskID: 'e',
    task: "Baggage Belts"
  }]
}

// const { todos, closedTasks, draggedTask} = datajson;


function Copyright() {

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 260;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  
}));

export default function Dashboard() {


  const [options, setOptions] = useState([]);

  // fetch(`${port}`+`/upload/v1/load`)
  // .then((res) => res.json())
  // .then((data) => setOptions(data.results))
  // .catch(err => console.error(err));

  const cookies = new Cookies();

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [dashname, setDashname] = useState(uid);


  const [layouts, setLayouts] = useState([
    // {i: 'a', x: 10, y: 0, minH: 2.4, minW: 4},
    // {i: 'b', x: 10, y: 0, minH: 5, minW: 8},
    // {i: 'c', x: 10, y: 0, minH: 5, minW: 8},
    // {i: 'd', x: 10, y: 0, minH: 2.4, minW: 4},
    // {i: 'e', x: 10, y: 0, minH: 2.4, minW: 4},
  ]);





  const onLayoutChange = layout => {
    setLayouts(layout);
    layout1 = layout;
    savedatabase();
  }

  const [todos, setTodos] = useState(datajson.todos);
  const [closedTasks, setClosedTasks] = useState(datajson.closedTasks);
  const [draggedTasks, setDraggedTasks] = useState(datajson.draggedTasks);


  const onDrag = (event, todo) => {
    setDraggedTasks([
      ...draggedTasks,
      todo
    ]);
    var index = todos.findIndex(i => i.taskID == todo.taskID);
    todos.splice(index, 1);
  }

  const onClose = (event, todo) => {
    var index = draggedTasks.findIndex(i => i.taskID == todo.taskID);
    draggedTasks.splice(index, 1);
    // clearInterval(timer);
    // timer = setInterval(redraw, 5000);
    setClosedTasks([
      ...closedTasks,
      todo
    ]);
    
  }

  const onDragAgain = (event, todo) => {
    setDraggedTasks([
      ...draggedTasks,
      todo
    ]);
    var index = closedTasks.findIndex(i => i.taskID == todo.taskID);
    closedTasks.splice(index, 1);
  }

  const onDragOver = () => {

  }
  const onDrop = (event) => {
    // const { completedTasks, draggedTask, todos } = this.state;
    // this.setState({
    //   completedTasks: [...completedTasks, draggedTask],
    //   todos: todos.filter(task => task.taskID !== draggedTask.taskID),
    //   draggedTask: {},
    // });

  }

  
  

  var height, useHeight = useState(0)

  function search(arr, id, p) {
    for (var j = 0; j < arr.length; j = j + 1) {
      if (arr[j].i === id) {
        if (p == "h") {
          console.log(arr[j].h)
          if(arr[j].h > 1){
            return arr[j].h * 350;
          }
          return arr[j].h * 280;
        }
        if(arr[j].w > 1){
          return arr[j].w * 380;
        }
        return arr[j].w * 245;
      }
}
  }

  for(var j=0; j<layout1.length; j=j+1){
    var k = layout1[j].i;
  }

  // function parse(spec, k) {
  //   vegaEmbed.parse.spec(spec, function(error, chart) { chart({el:"#"+k}).update(); });
  // }

  useEffect(() => timer, []);

  const redraw = () => {
    draggedTasks.map(task =>
      {var k = task.taskID;
      fetch(arr[k])
      .then(res => res.json())
      .then(vegaEmbed("#"+k, arr[k], { height: search(layout1, task.taskID, "h"), width: search(layout1, task.taskID, "w") }))
      .catch(err => console.error(err))
      }
    )
        // console.log("hello")
      }

  var timer = setInterval( redraw, 2000);

  

  const savedatabase = () => {

    var data = {user : parseInt(cookies.get('userId')), name: dashname+'.json', content: JSON.stringify(layout1)}
    fetch(`${port}`+`/upload/save`, {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          credentials: "same-origin"
        })
        .then((response) => response.json())
        .then((data) => {
          setLogindone(true);
        })
        .catch((error) => {
          setLogindone(false);
        });

  }


  function MainListItems() {
    return (
      <div draggable={false}>
        {/* <ListItem button draggable={true}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem> */}
        {
          todos.map(todo =>
            <ListItem button
              key={todo.taskID}
              draggable={true}
              onDrag={(event) => onDrag(event, todo)}>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary={todo.task} />
            </ListItem>
          )
        }
        {/* <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItem> */}
      </div>);
  };

  function SecondaryListItems() {
    return (<div>
      <ListSubheader inset>Recent Activities</ListSubheader>
      {closedTasks.map(todo =>
        <ListItem button
          key={todo.taskID}
          draggable={true}
              onDrag={(event) => onDragAgain(event, todo)}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary={todo.task} />
        </ListItem>
      )}

    </div>);
  };

  const [openD, setOpenD] = React.useState(false);

  const handleClickOpen = (event, task) => {

    setOpenD(true);
    var k = task.taskID;
    fetch(arr[k])
    .then(res => res.json())
    .then(vegaEmbed("#vis", arr[k], { height: 500, width: 700 }))
    .catch(err => console.error(err))
   
    

  };
  const handleClose = () => {
    setOpenD(false);
  };
  
  const [logindone, setLogindone] = useState(false);
  const [check, setCheck] = useState(false);
  
  // var options = [];

  // function populateOptions(data){
  //   console.log(data.results)
  //   for(var i = 0; i<data.length; i++){
  //     options.push(data[i].name);
  //     console.log(data[i]);
  //   }
  // }

  // fetch(`${port}`+`/upload/v1/load`)
  // .then((res) => res.json())
  // .then((data) => populateOptions(data.results))
  // .catch(err => console.error(err))

  // console.log(options);

  // const [options, setOptions] = useState([
  //   'None',
  //   'Atria',
  //   'Callisto',
  //   'Dione',
  //   'Ganymede',
  //   'Hangouts Call',
  //   'Luna',
  //   'Oberon',
  //   'Phobos',
  //   'Pyxis',
  //   'Sedna',
  //   'Titania',
  //   'Triton',
  //   'Umbriel',
  // ]);

  

  
  // const ITEM_HEIGHT = 48;
  
  

    const handleDashname = event => {
      setDashname(event.target.value);
    }

  
  const [b, setB] = useState(true);
  setTimeout(() => {  setB(false) }, 2000);

  function DashMenu() {
    return (
      <div style={{ width: 300 }}>
        {/* <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={options.map(option => option)}
          renderInput={params => (
            <TextField {...params} label="freeSolo" margin="normal" variant="outlined" fullWidth />
          )}
        /> */}
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          value={dashname}
          options={options.map(option => option.name)}
          renderInput={params => (
            <TextField
              {...params}
              // label="Search input"
              margin="normal"
              variant="outlined"
              fullWidth
              
              InputProps={{ ...params.InputProps, type: 'search' }}
            />
          )}
        />
      </div>
    );
          }

  const [selectedDateTo, setSelectedDateTo] = React.useState(new Date('2020-02-05T21:11:54'));

  const handleDateChangeTo = date => {
    setSelectedDateTo(date);
  };

  const [selectedDateFrom, setSelectedDateFrom] = React.useState(new Date('2020-02-03T21:11:54'));

  const handleDateChangeFrom = date => {
    setSelectedDateFrom(date);
  };
  
  const [city, setCity] = React.useState("Delhi");

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChangeCity = event => {
    setCity(event.target.value);
  };

  // const [state, setState] = React.useState({
  //   checkedA: true,
  //   checkedB: true,
  // });
  useEffect(
    () => {
  const [RT, handleChangeRT] = useState('/visual/horizon/?r=1')
    });
  const handleChangeRT = () => {
    console.log("FUICK YOU")
    console.log(RT)
    var passenger_url = '';
    if (RT)
    {
      passenger_url = "/visual/horizon/?r=0";
      setUrl(passenger_url);
    }
    else
    {
      passenger_url = "/visual/horizon/?r=1";
      setUrl("/visual/horizon/?r=0")
    }
    setRT(RT => !RT);
  };
console.log(url)



  // const [footfall, setFootfall] = useState(url);

  const arr = {
    "a": `${port}` + `/visual/pieChart/`,
    "b": `${port}` + `${url}`,
    "c": `${port}` + `/visual/heatmap/`,
    "d": `${port}` + `/visual/passenger/`,
    "e": `${port}` + `/visual/passenger/`
  }
  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            AIDAN Dashboard
          </Typography>
         
         <Typography style={{opacity:"0.5", fontSize:"12px", marginTop:"25px", display: (b) ? "block" : "none"}} className={classes.title}>
           {(logindone)?"All Changes Saved !":" Not Authorized to make changes, Login"}</Typography>
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <Button color="inherit" href={`${port}` + '/admin'}>Admin</Button>
          <Button color="inherit" href="/signin">Login</Button>

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
       <DashMenu/>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
         
        </div>
        <Divider />
        <List><MainListItems /></List>
        <Divider />
        <List><SecondaryListItems /></List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}
          onDrop={event => onDrop(event)}
          onDragOver={(event => onDragOver(event))}
        >
          <GridLayout className="layout" layout={layouts} onLayoutChange={onLayoutChange}
          cols={12} rowHeight={435} width={6100}
          // breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          // cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
          >
            {
              draggedTasks.map(task =>
                <Paper key={task.taskID} style={{ display: "table" }}>
                  <div id={task.taskID} style={{ display: "table-row" }}>{task.task}{task.taskID}</div>
                  <IconButton aria-label="" className={classes.closeButton} style={{marginRight:"30px"}} onClick={event => handleClickOpen(event, task)}>
                    <FullscreenIcon />
                  </IconButton>
                  <IconButton aria-label="close" className={classes.closeButton} onClick={event => onClose(event, task)}>
                    <CloseIcon />
                  </IconButton>
                  <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
<Typography className={classes.heading}>{city}{"  "}
{selectedDateTo.getDate() + '/' +  (selectedDateTo.getMonth() + 1)  + '/' +  selectedDateTo.getFullYear()}{" - "}
{selectedDateFrom.getDate() + '/' +  (selectedDateFrom.getMonth() + 1)  + '/' +  selectedDateFrom.getFullYear()}
</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
      <FormControlLabel
        control={
          <Switch
           
            onChange={(e) => {
              handleChangeRT()
            }}
            
            color="primary"
          />
        }
        label="Real-Time"
      />
      <FormControl variant="outlined" className={classes.formControl} style={{marginTop:"20px"}}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          City
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={city}
          onChange={handleChangeCity}
          labelWidth={labelWidth}
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          <MenuItem value="Delhi">Delhi</MenuItem>
          <MenuItem value="Indore">Indore</MenuItem>
          <MenuItem value="Mumbai">Mumbai</MenuItem>
        </Select>
      </FormControl>
      <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Select Date From"
          value={selectedDateTo}
          onChange={handleDateChangeTo}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Select Date To"
          value={selectedDateFrom}
          onChange={handleDateChangeFrom}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        
        {/* <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /> */}
        {/* <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        /> */}
      </Grid>
    </MuiPickersUtilsProvider>
        </ExpansionPanelDetails>
      </ExpansionPanel></Paper>
                  )

            }
          </GridLayout>
        </Container>
      </main>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openD}
      // fullWidth="true"
      maxWidth="true"
      >
      <Paper>
        <center>
        <div id="vis"></div>
        </center>
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                    <FullscreenExitIcon/>
                  </IconButton>
      </Paper>
      </Dialog>
      <div id="a" style={{display:"none"}}></div>
      <div id="b" style={{display:"none"}}></div>
      <div id="c" style={{display:"none"}}></div>
      <div id="d" style={{display:"none"}}></div>
      <div id="e" style={{display:"none"}}></div>
    </div>
  );
}
