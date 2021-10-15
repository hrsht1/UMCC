import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import UpgradeIcon from '@mui/icons-material/Upgrade';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useHistory } from "react-router";

import EventToTableConverter from "./EventToTableConverter";
import UserToTableConverter from "./UserToTableConverter";
import axios from "axios";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const eventHeadCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Event ID",
    hidden: true,
  },
  {
    id: "event_name",
    numeric: false,
    disablePadding: true,
    label: "Event Name",
  },
  {
    id: "start_Date",
    numeric: true,
    disablePadding: false,
    label: "Start Date",
  },
  { id: "end_Date", numeric: true, disablePadding: false, label: "End Date" },
  {
    id: "event_time",
    numeric: true,
    disablePadding: false,
    label: "Event Duration",
  },
  { id: "category", numeric: true, disablePadding: false, label: "Category" },
  { id: "location", numeric: true, disablePadding: false, label: "Location" },
  {
    id: "active_status",
    numeric: false,
    disablePadding: false,
    label: "Active",
  },
];

const userHeadCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "User ID",
    hidden: true,
  },
  {
    id: "user_id",
    numeric: false,
    disablePadding: true,
    label: "User ID2",
    hidden: true,
  },
  {
    id: "user_email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "user_display_name",
    numeric: false,
    disablePadding: false,
    label: "Display Name",
  },
  {
    id: "isAdmin",
    numeric: false,
    disablePadding: false,
    label: "Admin?",
  },
  {
    id: "authorised",
    numeric: false,
    disablePadding: false,
    label: "Authorised?",
  },
  {
    id: "profile_visible",
    numeric: false,
    disablePadding: false,
    label: "Profile visible?",
  },
  {
    id: "events_created",
    numeric: false,
    disablePadding: false,
    label: "Events created by User",
    hidden: true,
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    tableType,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  var headCells = [];
  if (tableType === "user") {
    headCells = userHeadCells;
  } else {
    headCells = eventHeadCells;
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all rows" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={headCell.hidden ? classes.visuallyHidden : null}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  tableType: PropTypes.string,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, tableTitle, onDeleteClick, onActiveToggle, onAdminToggle, isBookmarkTable } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {tableTitle}
        </Typography>
      )}

      {//options for editing. These should only appear on Admin Tools page, or in Events I've Created on MyPage
      }
      {numSelected > 0 && !isBookmarkTable ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={() => onDeleteClick()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}

      {numSelected > 0 &&
      tableTitle === "Events" &&
      window.location.href.includes("/admin-tools") ? (
        <Tooltip title="Toggle Active">
          <IconButton aria-label="toggle-active" onClick={() => onActiveToggle()}>
            <CheckCircleIcon />
          </IconButton>
        </Tooltip>
      ) : null}

      {numSelected > 0 &&
      tableTitle === "Users" &&
      window.location.href.includes("/admin-tools") ? (
        <Tooltip title="Toggle Authorised: Authorised users automatically have their events set to 'active'.">
          <IconButton aria-label="toggle-active" onClick={() => onActiveToggle()}>
            <CheckCircleIcon />
          </IconButton>
        </Tooltip>
      ) : null}

      {numSelected > 0 &&
      tableTitle === "Users" &&
      window.location.href.includes("/admin-tools") ? (
        <Tooltip title="Toggle Admin" onClick={() => onAdminToggle()}>
          <IconButton aria-label="toggle-active">
            <UpgradeIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable(props) {
  const { inputData, tableType, isBookmarkTable } = props;
  var rows = [];
  var tableTitle = "Events";
  if (tableType === "user") {
    rows = UserToTableConverter(inputData);
    tableTitle = "Users";
  } else {
    rows = EventToTableConverter(inputData);
  }

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("start_date");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleDelete = (event) => {
    if(tableTitle === "Events"){
      selected.forEach((e) => {
        axios.delete(process.env.REACT_APP_MY_URL + "api/events/" + e);
      }
      );
    }
    if(tableTitle === "Users"){
      selected.forEach((u) => {
        axios.delete(process.env.REACT_APP_MY_URL + "api/users/" + u);
      }
      );
    }
    window.location.reload();
  };

  const handleActiveToggle = (event) => {
    console.log("Selected ? ", selected);
    if(tableTitle === "Events"){
      selected.forEach((e) => {
        var isActive = rows.find(r => r.id === e).active_status;
        console.log("isActive ?",isActive);
        if(isActive === "false"){
          axios.put(process.env.REACT_APP_MY_URL + "api/events/" + e, {event_active: "true"});
        }
        else{
          axios.put(process.env.REACT_APP_MY_URL + "api/events/" + e, {event_active: "false"});
        }
      }
      );
    }
    if(tableTitle === "Users"){
      selected.forEach((u) => {
        //uses "category" column to denote "authorised" status from UserToTableConverter
        var isAuthorized = rows.find(r => r.id === u).category;
        if(isAuthorized === "false"){
          axios.put(process.env.REACT_APP_MY_URL + "api/users/" + u, {isAuthorized: true});
        }
        else{
          axios.put(process.env.REACT_APP_MY_URL + "api/users/" + u, {isAuthorized: false});
        }
      }
      );
    }
    window.location.reload();
  };

  const handleAdminToggle = (event) => {
    selected.forEach((u) => {
      var isAdmin = rows.find(r => r.id === u).event_time;
      //uses "event_time" column to denote "isAdmin" status from UserToTableConverter
      if(isAdmin === "false"){
        axios.put(process.env.REACT_APP_MY_URL + "api/users/" + u, {isAdmin: true});
      }
      else{
        axios.put(process.env.REACT_APP_MY_URL + "api/users/" + u, {isAdmin: false});
      }
    });
    window.location.reload();
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          tableTitle={tableTitle}
          onDeleteClick={handleDelete}
          onActiveToggle={handleActiveToggle}
          onAdminToggle={handleAdminToggle}
          isBookmarkTable={isBookmarkTable}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              tableType={tableType}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        className={classes.visuallyHidden}
                      >
                        {row.id}
                      </TableCell>
                      {tableTitle === "Events" ? (<>
                      <TableCell align="right">{row.event_name}</TableCell>
                      <TableCell align="right">{row.start_Date}</TableCell>
                      <TableCell align="right">{row.end_Date}</TableCell>
                      <TableCell align="right">{row.event_time}</TableCell>
                      <TableCell align="right">{row.category}</TableCell>
                      <TableCell align="right">{row.location}</TableCell>
                      <TableCell align="right">{row.active_status}</TableCell>
                      </>) : (<>
                      <TableCell align="right" className={classes.visuallyHidden}>{row.event_name}</TableCell>
                      <TableCell align="right">{row.start_Date}</TableCell>
                      <TableCell align="right">{row.end_Date}</TableCell>
                      <TableCell align="right">{row.event_time}</TableCell>
                      <TableCell align="right">{row.category}</TableCell>
                      <TableCell align="right">{row.location}</TableCell>
                      <TableCell align="right" className={classes.visuallyHidden}>{row.active_status}</TableCell>
                      </>)}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
