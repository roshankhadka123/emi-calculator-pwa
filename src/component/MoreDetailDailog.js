import React, {Component} from 'react';
import {
    AppBar, Button,
    Dialog,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText, Paper,
    Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Toolbar,
    withStyles
} from "@material-ui/core";
import {Close} from "@material-ui/icons";
const styles = theme => ({
    appBar: {
        position: 'relative',
    },

});
class MoreDetailDailog extends Component {
    constructor(props) {
        super(props);
        this.state={
            details:this.props.details
        }
    }
    render() {
        const Transition = React.forwardRef(function Transition(props, ref) {
            return <Slide direction="up" ref={ref} {...props} />;
        });
        const {classes} = this.props;
        return (
            <div>
                <Dialog fullScreen open={this.props.handleOpen} TransitionComponent={Transition}>
                <div className={"dialog-wrapper"}>  <nav>
                  <Button startIcon={ <Close/>} color={"secondary"} onClick={this.props.handleClose}>
                    Close
                  </Button>
                    </nav>
                </div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow className={"table-head"}>
                                    <TableCell>Month</TableCell>
                                    <TableCell align="center" className={"table-head-cell"}>Intrest</TableCell>
                                    <TableCell align="center" className={"table-head-cell"}>Principal</TableCell>
                                    <TableCell align="center" className={"table-head-cell"}>Total Payable</TableCell>
                                    <TableCell align="center" className={"table-head-cell"}>Balance</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.details ? this.state.details.map(( data) =>{return(
                                    <TableRow>
                                        <TableCell align="center">{data.month}</TableCell>
                                        <TableCell align="center">{Number(data.interest)?.toLocaleString('en-IN')}</TableCell>
                                        <TableCell align="center">{Number(data.principal)?.toLocaleString('en-IN')}</TableCell>
                                        <TableCell align="center">{Number(data.totalPayable)?.toLocaleString('en-IN')}</TableCell>
                                        <TableCell align="center"> {Number(data.balance)?.toLocaleString('en-IN')}</TableCell>

                                    </TableRow>
                                )}):null
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>


                </Dialog>

            </div>
        );
    }
}

export default withStyles(styles)(MoreDetailDailog);