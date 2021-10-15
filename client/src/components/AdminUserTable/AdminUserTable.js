import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Switch,
  TableSortLabel,
  TablePagination,
  ButtonGroup,
  Button,
} from "@material-ui/core";

export class AdminUserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowsPerPage: this.props.rowsPerPage,
      page: 0,
      order: this.props.order,
      orderBy: this.props.orderBy,
      tableHead: this.props.tableHead,
      tables: this.props.datas,
    };
  }

  setPage(newPage) {
    this.setState({
      page: newPage,
    });
  }

  setRowsPerPage(newPage) {
    this.setState({
      rowsPerPage: newPage,
    });
  }

  handleChangePage(event, newPage) {
    this.setPage(newPage);
  }

  handleChangeRowsPerPage(event) {
    this.setRowsPerPage(event.target.value);
    this.setPage(0);
  }

  setOrder(item) {
    this.setState({
      order: this.state.order === "asc" ? "desc" : "asc",
      orderBy: item,
    });
  }

  userVerifiedChange(row) {
    let datas = this.state.tables;
    datas = datas.map((item) => {
      if (row === item) {
        item.Verified = !item.Verified;
      }
      return item;
    });
    this.setState({
      tables: datas,
    });
  }

  render() {
    return (
      <>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {this.state.tableHead.map((item) => {
                    return (
                      <TableCell align="center" key={item}>
                        <TableSortLabel
                          hideSortIcon={false}
                          active={this.state.orderBy === item}
                          direction={this.state.order}
                          onClick={this.setOrder.bind(this, item)}
                        >
                          {item}
                        </TableSortLabel>
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">Action</TableCell>
                  <TableCell align="center">Verified</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(
                  this.state.tables,
                  getComparator(this.state.order, this.state.orderBy)
                )
                  .slice(
                    this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage +
                      this.state.rowsPerPage
                  )
                  .map((row) => {
                    return (
                      <TableRow key={row.Name}>
                        <TableCell align="center">{row.Name}</TableCell>
                        <TableCell align="center">{row.Email}</TableCell>
                        <TableCell align="center">
                          <ButtonGroup
                            color="primary"
                            aria-label="outlined primary button group"
                          >
                            <Button>Modify</Button>
                            <Button>Delete</Button>
                          </ButtonGroup>
                        </TableCell>
                        <TableCell align="center">
                          <Switch
                            checked={row.Verified}
                            onChange={this.userVerifiedChange.bind(this, row)}
                            name="checkedA"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            className="pagination"
            component="div"
            count={this.state.tables.length}
            rowsPerPageOptions={this.props.pageOptions}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onPageChange={this.handleChangePage.bind(this)}
            onRowsPerPageChange={this.handleChangeRowsPerPage.bind(this)}
          />
        </Paper>
      </>
    );
  }
}
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
