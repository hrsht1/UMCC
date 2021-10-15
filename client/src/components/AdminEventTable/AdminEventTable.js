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
} from "@material-ui/core";

class AdminEventTable extends Component {
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

  rowActiveChange(row) {
    let datas = this.state.tables;
    datas = datas.map((item) => {
      if (row === item) {
        item.active = !item.active;
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
                  <TableCell align="center">Active</TableCell>
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
                      <TableRow key={row["Event Name"]}>
                        <TableCell align="center">
                          {row["Event Name"]}
                        </TableCell>
                        <TableCell align="center">
                          {row["start date"]}
                        </TableCell>
                        <TableCell align="center">{row["end date"]}</TableCell>
                        <TableCell align="center">{row.category}</TableCell>
                        <TableCell align="center">{row.location}</TableCell>
                        <TableCell align="center">
                          {row["Event Time"]}
                        </TableCell>
                        <TableCell align="center">
                          <Switch
                            checked={row.active}
                            onChange={this.rowActiveChange.bind(this, row)}
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

export default AdminEventTable;
