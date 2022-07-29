import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ReactTooltip from "@mui/material/Tooltip";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import { Line, Circle } from "rc-progress";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { humanize } from "../../utilities";

import {
  token_count,
  unique_callers,
  user_info,
} from "../../services/auth.service";

import "./dashboard.css";

function Dashboard({ darkTheme }) {
  const [searched, setSearched] = useState("");
  const [dayToken, setDayToken] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [numOfToken, setNumOfToken] = useState([]);
  const [uniqueCallers, setUniqueCallers] = useState([]);
  const [tokenMonthSelected, setTokenMonthSelected] = useState(1);
  const [callerMonthSelected, setCallerMonthSelected] = useState(1);
  const [callerData, setCallerData] = useState([]);
  const [tokenData, setTokenData] = useState([]);

  useEffect(() => {
    setCallerData(initCallers());
    setCallerData(initToken());
  }, []);

  const initCallers = () => {
    return [
      {
        name: "Sun",
        external_callers: 0,
        senders: 0,
        txs: 0,
      },
      {
        name: "Mon",
        external_callers: 0,
        senders: 0,
        txs: 0,
      },
      {
        name: "Tue",
        external_callers: 0,
        senders: 0,
        txs: 0,
      },
      {
        name: "Wed",
        external_callers: 0,
        senders: 0,
        txs: 0,
      },
      {
        name: "Thu",
        external_callers: 0,
        senders: 0,
        txs: 0,
      },
      {
        name: "Fri",
        external_callers: 0,
        senders: 0,
        txs: 0,
      },
      {
        name: "Sat",
        external_callers: 0,
        senders: 0,
        txs: 0,
      },
    ];
  };

  const initToken = () => {
    return [
      {
        name: "Sun",
        count: 0,
        amount: 0,
      },
      {
        name: "Mon",
        count: 0,
        amount: 0,
      },
      {
        name: "Tue",
        count: 0,
        amount: 0,
      },
      {
        name: "Wed",
        count: 0,
        amount: 0,
      },
      {
        name: "Thu",
        count: 0,
        amount: 0,
      },
      {
        name: "Fri",
        count: 0,
        amount: 0,
      },
      {
        name: "Sat",
        count: 0,
        amount: 0,
      },
    ];
  };

  const handleSearch = (event) => {
    setSearched(event.target.value);
  };

  const fetchData = () => {
    // 0x7b69c4f2acf77300025e49dbdbb65b068b2fda7d
    if (validate()) {
      setLoading(true);
      Promise.all([
        user_info({ address: searched }),
        unique_callers({ address: searched }),
        token_count({ address: searched }),
      ])
        .then((resp) => {
          setUserInfo(resp[0].data);
          setUniqueCallers(resp[1].data);
          filterUniqueCallers(resp[1].data, 1);
          setCallerMonthSelected(1);
          setNumOfToken(resp[2].data);
          filterTokens(resp[2].data, 1);
          setTokenMonthSelected(1);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Something went wrong");
        });
    } else {
      toast.error("Invalid input address provided");
    }
  };

  const validate = () => {
    if (searched[0] === "0" && searched[1] === "x" && searched.length === 42)
      return true;

    return false;
  };

  const handleCallersChange = (e) => {
    setCallerMonthSelected(e.target.value);
    filterUniqueCallers(uniqueCallers, e.target.value);
  };

  const handleTokenChange = (e) => {
    setTokenMonthSelected(e.target.value);
    filterTokens(numOfToken, e.target.value);
  };

  const filterUniqueCallers = (data, selectedMonth) => {
    var newCallerData = initCallers();

    data.map((item) => {
      const date = new Date(item.date.date);

      if (date.getMonth() + 1 == selectedMonth) {
        const day = date.getDay();

        newCallerData[day].external_callers += parseInt(item.external_callers);
        newCallerData[day].senders += parseInt(item.senders);
        newCallerData[day].txs += parseInt(item.txs);
      }
    });

    setCallerData(newCallerData);
  };

  const filterTokens = (data, selectedMonth) => {
    var newTokenData = initToken();

    data.map((item) => {
      const date = new Date(item.date.date);

      if (date.getMonth() + 1 == selectedMonth) {
        const day = date.getDay();

        newTokenData[day].count += parseInt(item.count);
        newTokenData[day].amount += parseInt(item.amount);
      }
    });

    setTokenData(newTokenData);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      spacing={4}
      style={{ padding: "3rem" }}
    >
      <Grid item xs={12}>
        <div className="search-wrapper">
          <TextField
            fullWidth
            id="search-bar"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search className={darkTheme && "light-font"} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <Button
                    onClick={() => fetchData()}
                    variant="contained"
                    className={darkTheme && "dark-font"}
                    style={{
                      backgroundColor: "#00E396",
                      borderRadius: "10px",
                      marginRight: "-8px",
                      height: "43px",
                    }}
                  >
                    Search
                  </Button>
                </InputAdornment>
              ),
            }}
            value={searched}
            onChange={handleSearch}
            variant="outlined"
            className={
              darkTheme ? "dark-bg text-box-search" : "text-box-search"
            }
          />
          <Button
            variant="contained"
            className={darkTheme ? "report-scam-btn-dark" : "report-scam-btn"}
          >
            Report Scam
          </Button>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="checked-wrapper">
          <Chip
            avatar={
              <CheckCircleIcon
                className={darkTheme && "dark-font"}
                style={{ color: "#ffffff" }}
              />
            }
            label="Checked"
            className={darkTheme && "dark-font"}
            style={{
              backgroundColor: "#00E396",
              color: "#ffffff",
              paddingInline: "15px",
            }}
          />
        </div>
      </Grid>
      <Grid item md={6}>
        <div className="metadata-accordian">
          <Accordion
            className={
              darkTheme && "table-inner-dark light-font border-radius-dark"
            }
            defaultExpanded={true}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon className={darkTheme && "light-font "} />
              }
              aria-controls="metadata-title"
              id="metadata-header"
            >
              <Typography style={{ fontWeight: "bold" }}>MetaData</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {loading ? (
                <div className="center-loader">
                  <Oval height="40" width="40" color="#00dc74" />
                </div>
              ) : (
                <TableContainer>
                  <Table
                    sx={{ minWidth: 200, paddingInline: "30px" }}
                    aria-label="simple table"
                  >
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                        >
                          Type of Contract:
                          <ReactTooltip title="Type of Contract">
                            <HelpOutlineIcon
                              className={
                                darkTheme ? "help-icon-dark" : "help-icon"
                              }
                              sx={{ fontSize: 13 }}
                            />
                          </ReactTooltip>
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ textAlign: "right" }}
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                        >
                          {userInfo.metaData?.tokenType || "unknown"}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                        >
                          Name:
                          <ReactTooltip title="Name">
                            <HelpOutlineIcon
                              className={
                                darkTheme ? "help-icon-dark" : "help-icon"
                              }
                              sx={{ fontSize: 13 }}
                            />
                          </ReactTooltip>
                        </TableCell>
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                          style={{ textAlign: "right" }}
                        >
                          {userInfo.metaData?.name || "unknown"}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                        >
                          Symbol:
                          <ReactTooltip title="Symbol">
                            <HelpOutlineIcon
                              className={
                                darkTheme ? "help-icon-dark" : "help-icon"
                              }
                              sx={{ fontSize: 13 }}
                            />
                          </ReactTooltip>
                        </TableCell>
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                          style={{ textAlign: "right" }}
                        >
                          {userInfo.metaData?.symbol || "unknown"}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                        >
                          If the contract is verified on etherscan:
                          <ReactTooltip title="verified contract">
                            <HelpOutlineIcon
                              className={
                                darkTheme ? "help-icon-dark" : "help-icon"
                              }
                              sx={{ fontSize: 13 }}
                            />
                          </ReactTooltip>
                        </TableCell>
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                          style={{ textAlign: "right" }}
                        >
                          <div>
                            <CheckCircleIcon
                              style={{ color: "#00E396", padding: "0 3px" }}
                              sx={{ fontSize: "15px" }}
                            />
                            <div
                              style={{
                                display: "inline-block",
                                color: "#00E396",
                              }}
                            >
                              {humanize(userInfo.metaData?.contractVerified) ||
                                "unknown"}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                        >
                          Listed on coin market cap:
                          <ReactTooltip title="Listing">
                            <HelpOutlineIcon
                              className={
                                darkTheme ? "help-icon-dark" : "help-icon"
                              }
                              sx={{ fontSize: 13 }}
                            />
                          </ReactTooltip>
                          <div className="market-cap-link">
                            {userInfo.metaData?.info?.urls?.website.map(
                              (url, index) => (
                                <a
                                  key={index}
                                  href={url || "#"}
                                  style={{ display: "block" }}
                                >
                                  {url || "unknown"}
                                  <OpenInNewIcon sx={{ fontSize: 13 }} />
                                </a>
                              )
                            )}
                          </div>
                        </TableCell>
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                          style={{ textAlign: "right" }}
                        >
                          {humanize(userInfo.metaData?.symbTokenListed) ||
                            "unknown"}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                        >
                          Listed and verified on marketplace (for erc721):
                          <ReactTooltip title="Listing and verification">
                            <HelpOutlineIcon
                              className={
                                darkTheme ? "help-icon-dark" : "help-icon"
                              }
                              sx={{ fontSize: 13 }}
                            />
                          </ReactTooltip>
                        </TableCell>
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                          style={{ textAlign: "right" }}
                        >
                          {humanize(userInfo.metaData?.trustonCertified) ||
                            "unknown"}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          className={darkTheme && "light-font"}
                          component="th"
                          scope="row"
                        >
                          Closer NFT:
                          <ReactTooltip title="Closer NFT">
                            <HelpOutlineIcon
                              className={
                                darkTheme ? "help-icon-dark" : "help-icon"
                              }
                              sx={{ fontSize: 13 }}
                            />
                          </ReactTooltip>
                        </TableCell>
                        <TableCell
                          className={darkTheme && "light-font"}
                          component="th"
                          scope="row"
                          style={{ textAlign: "right" }}
                        >
                          {userInfo.metaData?.nftInfo &&
                          userInfo.metaData?.nftInfo[1] ? (
                            <div>
                              <div>
                                1. {userInfo.metaData?.nftInfo[1][0].name}
                              </div>
                              <div>
                                2. {userInfo.metaData?.nftInfo[1][1].name}
                              </div>
                              <div>
                                3. {userInfo.metaData?.nftInfo[1][2].name}
                              </div>
                            </div>
                          ) : (
                            "unknown"
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </AccordionDetails>
          </Accordion>
        </div>
      </Grid>
      <Grid item md={6}>
        <div className="transactions-accordian">
          <Accordion
            className={
              darkTheme && "table-inner-dark light-font border-radius-dark"
            }
            defaultExpanded={true}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon className={darkTheme && "light-font"} />
              }
              aria-controls="transactions-title"
              id="transactions-header"
            >
              <Typography style={{ fontWeight: "bold" }}>
                Transactions
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {loading ? (
                <div className="center-loader">
                  <Oval height="40" width="40" color="#00dc74" />
                </div>
              ) : (
                <TableContainer>
                  <Table
                    sx={{ minWidth: 200, paddingInline: "30px" }}
                    aria-label="simple table"
                  >
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                        >
                          First Transfer Date:
                          <ReactTooltip title="Transfer Date">
                            <HelpOutlineIcon
                              className={
                                darkTheme ? "help-icon-dark" : "help-icon"
                              }
                              sx={{ fontSize: 13 }}
                            />
                          </ReactTooltip>
                        </TableCell>
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                          style={{ textAlign: "right" }}
                        >
                          {userInfo.transactions?.firstTransferDate ||
                            "unknown"}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                        >
                          Last Transfer Date:
                          <ReactTooltip title="Transfer Date">
                            <HelpOutlineIcon
                              className={
                                darkTheme ? "help-icon-dark" : "help-icon"
                              }
                              sx={{ fontSize: 13 }}
                            />
                          </ReactTooltip>
                        </TableCell>
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                          style={{ textAlign: "right" }}
                        >
                          {userInfo.transactions?.lastTransferDate || "unknown"}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                        >
                          Days Token Transfers:
                          <ReactTooltip title="Token Transfers">
                            <HelpOutlineIcon
                              className={
                                darkTheme ? "help-icon-dark" : "help-icon"
                              }
                              sx={{ fontSize: 13 }}
                            />
                          </ReactTooltip>
                        </TableCell>
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                          style={{ textAlign: "right" }}
                        >
                          {userInfo.transactions?.daysTokenTransfers ||
                            "unknown"}
                        </TableCell>
                      </TableRow>

                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                        >
                          Unique Holders:
                          <ReactTooltip title="Unique Holders">
                            <HelpOutlineIcon
                              className={
                                darkTheme ? "help-icon-dark" : "help-icon"
                              }
                              sx={{ fontSize: 13 }}
                            />
                          </ReactTooltip>
                        </TableCell>
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                          style={{ textAlign: "right" }}
                        >
                          {userInfo.transactions?.holdersCount || "unknown"}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                        >
                          NB Of Transfer:
                          <ReactTooltip title="NB of Transfer">
                            <HelpOutlineIcon
                              className={
                                darkTheme ? "help-icon-dark" : "help-icon"
                              }
                              sx={{ fontSize: 13 }}
                            />
                          </ReactTooltip>
                        </TableCell>
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                          style={{ textAlign: "right" }}
                        >
                          {userInfo.transactions?.nbOfTransfer || "unknown"}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                        >
                          Uniq Senders:
                          <ReactTooltip title="Uniq Senders">
                            <HelpOutlineIcon
                              className={
                                darkTheme ? "help-icon-dark" : "help-icon"
                              }
                              sx={{ fontSize: 13 }}
                            />
                          </ReactTooltip>
                        </TableCell>
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                          style={{ textAlign: "right" }}
                        >
                          {userInfo.transactions?.uniqSenders || "unknown"}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                        >
                          Uniq Receivers:
                          <ReactTooltip title="Uniq Receivers">
                            <HelpOutlineIcon
                              className={
                                darkTheme ? "help-icon-dark" : "help-icon"
                              }
                              sx={{ fontSize: 13 }}
                            />
                          </ReactTooltip>
                        </TableCell>
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                          component="th"
                          scope="row"
                          style={{ textAlign: "right" }}
                        >
                          {userInfo.transactions?.uniqReceivers || "unknown"}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          className={darkTheme && "light-font"}
                          component="th"
                          scope="row"
                        >
                          Ratio:
                          <ReactTooltip title="Ratio">
                            <HelpOutlineIcon
                              className={
                                darkTheme ? "help-icon-dark" : "help-icon"
                              }
                              sx={{ fontSize: 13 }}
                            />
                          </ReactTooltip>
                        </TableCell>
                        <TableCell
                          className={darkTheme && "light-font"}
                          component="th"
                          scope="row"
                          style={{ textAlign: "right" }}
                        >
                          {userInfo.transactions?.ratioSenderReceiver?.toFixed(
                            1
                          ) || "unknown"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </AccordionDetails>
          </Accordion>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="user-info-accordian">
          <Accordion
            className={
              darkTheme && "table-inner-dark light-font border-radius-dark"
            }
            defaultExpanded={true}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="user-info-title"
              id="user-info-header"
            >
              <Typography style={{ fontWeight: "bold" }}>User Info</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {loading ? (
                <div className="center-loader">
                  <Oval height="40" width="40" color="#00dc74" />
                </div>
              ) : (
                <TableContainer>
                  <Table
                    sx={{ minWidth: 200, paddingInline: "30px" }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                        >
                          Owner Balance
                        </TableCell>
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                        >
                          Creation Owner Address
                        </TableCell>
                        <TableCell
                          className={
                            darkTheme && "light-font table-border-dark"
                          }
                        >
                          NB Transaction Owner Address
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          className={darkTheme && "light-font"}
                          component="th"
                          scope="row"
                        >
                          {userInfo.ownerInfo?.balance_usd?.toFixed(0) ||
                            "unknown"}
                        </TableCell>
                        <TableCell
                          className={darkTheme && "light-font"}
                          component="th"
                          scope="row"
                        >
                          {userInfo.ownerInfo?.ownerAddress || "unknown"}
                        </TableCell>
                        <TableCell
                          className={darkTheme && "light-font "}
                          component="th"
                          scope="row"
                        >
                          {userInfo.ownerInfo?.transaction_count || "unknown"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </AccordionDetails>
          </Accordion>
        </div>
      </Grid>
      <Grid item md={6}>
        <div className="token-chart">
          <Paper
            className={
              darkTheme && "table-inner-dark light-font border-radius-dark"
            }
            style={{ padding: "20px" }}
          >
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography style={{ fontWeight: "bold" }}>
                Number of Unique Caller
              </Typography>
              <FormControl style={{ width: "5rem" }}>
                <InputLabel className={darkTheme && "light-font"} id="">
                  Week
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={callerMonthSelected}
                  label="week"
                  onChange={handleCallersChange}
                  className={darkTheme && "light-font"}
                  style={{ border: "1px solid" }}
                >
                  {[...Array(12).keys()].map((item) => (
                    <MenuItem key={item} value={item + 1}>
                      {item + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <BarChart
              width={600}
              height={300}
              data={callerData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barCategoryGap="25%"
            >
              <CartesianGrid vertical={false} />
              <XAxis axisLine={false} tickLine={false} dataKey="name" />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="external_callers" fill="#00E396" />
              <Bar dataKey="senders" fill="#008FFB" />
              <Bar dataKey="txs" fill="#808080" />
            </BarChart>
          </Paper>
        </div>
      </Grid>
      <Grid item md={6}>
        <div className="token-chart">
          <Paper
            className={
              darkTheme && "table-inner-dark light-font border-radius-dark"
            }
            style={{ padding: "20px" }}
          >
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography style={{ fontWeight: "bold" }}>
                Number of Token
              </Typography>
              <FormControl style={{ width: "5rem" }}>
                <InputLabel className={darkTheme && "light-font"} id="">
                  Week
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tokenMonthSelected}
                  label="week"
                  onChange={handleTokenChange}
                  className={darkTheme && "light-font"}
                  style={{ border: "1px solid" }}
                >
                  {[...Array(12).keys()].map((item) => (
                    <MenuItem key={item} value={item + 1}>
                      {item + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <AreaChart
              width={600}
              height={300}
              data={tokenData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E396" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00E396" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#008FFB" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#008FFB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="progressColour" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="15%" stopColor="#0091FF" stopOpacity={0} />
                  <stop offset="100%" stopColor="#0091FF" stopOpacity={1} />
                </linearGradient>
              </defs>
              <XAxis axisLine={false} tickLine={false} dataKey="name" />
              <YAxis axisLine={false} tickLine={false} />
              <CartesianGrid vertical={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#00E396"
                fillOpacity={1}
                fill="url(#colorAmount)"
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#008FFB"
                fillOpacity={1}
                fill="url(#colorCount)"
              />
            </AreaChart>
          </Paper>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="bonus-accordian">
          <Accordion
            className={
              darkTheme && "table-inner-dark light-font border-radius-dark"
            }
            defaultExpanded={true}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="user-info-title"
              id="user-info-header"
            >
              <Typography style={{ fontWeight: "bold" }}>Bonus</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                style={{ padding: "3rem" }}
              >
                <Grid item xs={3}>
                  <Stack>
                    <Typography style={{ fontWeight: "bold" }}>
                      Twitter Sentiment Analysis
                    </Typography>
                    <Line
                      percent={userInfo.bonus?.sentiment?.value || 0}
                      strokeWidth={4}
                      trailWidth={4}
                      strokeColor="#EB5757"
                      style={{ marginTop: "2rem" }}
                    />
                    <Typography style={{ color: "#EB5757", marginTop: "1rem" }}>
                      {humanize(userInfo.bonus?.sentiment?.type) || "unknown"}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={3}>
                  <Typography style={{ fontWeight: "bold" }}>
                    Count number of tweet associated with the address
                  </Typography>
                  <Typography
                    className={darkTheme && "light-font"}
                    style={{ color: "#4F4F4F", marginTop: "1rem" }}
                  >
                    Tweets Associated
                  </Typography>
                  <Typography style={{ fontWeight: "bold" }}>
                    {userInfo.bonus?.tweetNb || "unknown"}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography style={{ fontWeight: "bold" }}>
                    Fiability score{" "}
                  </Typography>

                  <Circle
                    style={{ width: "100px", marginTop: "1rem" }}
                    percent={userInfo.bonus?.trustonScore || 50}
                    strokeWidth={14}
                    trailWidth={14}
                    strokeColor="url(#progressColour)"
                  />
                  <div
                    style={
                      userInfo.bonus?.trustonScore > 0
                        ? { color: "green" }
                        : { color: "red" }
                    }
                    className="progress-text"
                  >
                    {userInfo.bonus?.trustonScore || 0} %
                  </div>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </div>
      </Grid>
    </Grid>
  );
}

export default Dashboard;

// background: "linear-gradient(to top bottom, #430089, #82ffa1)"
