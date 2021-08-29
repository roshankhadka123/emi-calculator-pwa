import React, {Component} from 'react';
import {AppBar, Button, IconButton, TextField, Toolbar} from "@material-ui/core";
import logo from "./images/logo.png"
import MoreDetailDailog from "./MoreDetailDailog";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state={
            emi: 0,
            open:false,
            loanAmount: '',
            interestRate: '',
            year: '',
            month: '',
            loanPeriod:'--',
            interestPayable:0,
            totalPayment:0,
            details: [],
            disabledMoreDetails:true

        }
    }
    handleClickOpen = () => {
        this.setState({open: true});
    }
    handleClose = () => {
        this.setState({open: false});
    }

    calculate=()=>{
        let chRate = (this.state.interestRate / 12) / 100
        let months = this.state.year ? this.state.year * 12 : 0
        months += this.state.month ? parseInt(this.state.month) : 0
        let emi = (
            (this.state.loanAmount * chRate * ((1 + chRate) ** months)) / ((1 + chRate) ** months - 1)
        ).toFixed(2)
        let totalPayment = (emi * months).toFixed(2)
        let interest = (totalPayment - this.state.loanAmount).toFixed(2)
        emi=emi=='Infinity'?0:emi
        this.setState({
            emi: emi=='NaN'?0:emi,
            loanPeriod: `${months} months`,
            loanAmount: this.state.loanAmount,
            interestPayable: interest==='NaN'?0:interest,
            totalPayment: totalPayment=='NaN'?0:totalPayment,
            disabledMoreDetails:emi>0?false:true
        })
    }

    calculateEMIDetails(){
        return new Promise((resolve) => {
            console.log("inside details")
            let chRate = (this.state.interestRate / 12) / 100
            let months = this.state.year ? this.state.year * 12 : 0
            months += this.state.month ? parseInt(this.state.month) : 0
            let emi = (
                (this.state.loanAmount * chRate * ((1 + chRate) ** months)) / ((1 + chRate) ** months - 1)
            ).toFixed(2)
            let detailAmount = this.state.loanAmount
            let details = []
            for (let month = 1; month <= months; month++) {
                let detailInterest = (chRate * detailAmount).toFixed(2)
                let detailPrincipal = (emi - detailInterest).toFixed(2)
                let detailBalance = (detailAmount - detailPrincipal).toFixed(2)
                details.push({
                    month: month,
                    interest: detailInterest,
                    principal: detailPrincipal,
                    totalPayable: emi,
                    balance: detailBalance,
                })
                detailAmount = detailBalance
            }
            this.setState({
                details: details,
                open:true
            })

        })
    }

    handleChangeInput=(e)=>{
            this.setState(
        { [e.target.name]: e.target.value },function () {
                    this.calculate()
        }
            )
    }




    render() {
        return (
            <div className={"wrapper"}>
                <nav position="static">

                        <div className={"logo"}>
                            <img src={logo}/>
                            <h3>EMI CALCULATOR</h3>
                        </div>


                </nav>
                <section className={"middle-section"}>
                    <TextField
                        label="Loan Amount"
                        id="outlined-size-medium"
                        defaultValue="Small"
                        variant="outlined"
                        size="medium"
                        type="number"
                        fullWidth
                        className={"text-field"}
                        name={"loanAmount"}
                        value={this.state.loanAmount}
                        onChange={(e)=>{this.setState({loanAmount:e.target.value},function (){
                            this.calculate()
                        })}}
                    />
                    <TextField
                        label="Intrest Rate(%)"
                        id="outlined-size-medium"
                        defaultValue="Small"
                        variant="outlined"
                        size="medium"
                        type="number"
                        fullWidth
                        className={"text-field"}
                        name={"interestRate"}
                        error={this.state.interestRate>100?true:false}
                        helperText={this.state.interestRate>100?"intrest rate is invalid":null}
                        value={this.state.interestRate}
                        onChange={this.handleChangeInput}
                    />
                    <div className="time-section">
                        <TextField
                            label="Year"
                            id="outlined-size-medium"
                            defaultValue="Small"
                            variant="outlined"
                            size="medium"
                            type="number"

                            className={"text-field"}
                            name={"year"}
                            value={this.state.year}
                            onChange={this.handleChangeInput}

                        />
                        <TextField
                            label="Month"
                            id="outlined-size-medium"
                            defaultValue="Small"
                            variant="outlined"
                            size="medium"
                            type="number"

                            error={this.state.month>32?true:false}
                            helperText={this.state.month>32?"month is invalid":null}

                            className={"text-field"}
                            name={"month"}
                            value={this.state.month}
                            onChange={this.handleChangeInput}
                        />

                    </div>
                </section>
                <section>
                    <div className={"emi-monthly"}>
                        <p>EMI<br/> Monthly</p>
                        <div>Rs. {this.state.emi}</div>
                    </div>
                </section>
                <section>
                    <div className={"emi-summary-info"}>
                        <div className={"emi-summary-info-head-txt"}>
                            <h3>LOAN PAYMENT</h3>
                            <p>Summary</p>
                        </div>
                        <div className={"emi-summary-info-txt"}>

                            <div >
                                <span>Loan Period</span>
                                <span> {this.state.loanPeriod}</span>
                            </div>
                            <div >
                                <span>Loan Amount</span>
                                <span> Rs. {Number(this.state.loanAmount)?.toLocaleString('en-IN')}</span>
                            </div>
                            <div >
                                <span>Intrest Payable</span>
                                <span> Rs. {Number(this.state.interestPayable)?.toLocaleString('en-IN')}</span>
                            </div>
                            <div >
                                <span>Total Payment</span>
                                <span>Rs. {Number(this.state.totalPayment)?.toLocaleString('en-IN')}</span>
                            </div>


                        </div>
                    </div>
                </section>
                <section className={"btn-section"}>
                    <Button className={"more-detail-btn"} variant={"contained"} disabled={this.state.disabledMoreDetails}  onClick={() => {
                        this.calculateEMIDetails();

                    }}>
                        More Details
                    </Button>
                </section>
                {this.state.open ?
                    <MoreDetailDailog handleOpen={this.handleClickOpen}
                                        handleClose={this.handleClose}
                                        details={this.state.details}
                    /> : null}
                
            </div>
        );
    }
}

export default HomePage;