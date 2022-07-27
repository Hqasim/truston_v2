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

  useEffect(() => {
    console.log(searched);
  });

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
          setNumOfToken(resp[2].data);
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

  const handleCallersChange = (e) => {};

  const number_of_unique_caller_data = [
    {
      name: "Mon",
      uv: 2,
      pv: 4,
    },
    {
      name: "Tue",
      uv: 2,
      pv: 1,
    },
    {
      name: "Wed",
      uv: 5,
      pv: 10,
    },
    {
      name: "Mon",
      uv: 2,
      pv: 4,
    },
    {
      name: "Thu",
      uv: 1,
      pv: 1,
    },
    {
      name: "Fri",
      uv: 2,
      pv: 3,
    },
  ];

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
            id="search-bar"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search className={darkTheme && "light-font"} />
                </InputAdornment>
              ),
              endAdornment: (
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
      <Grid item xs={6}>
        <div className="metadata-accordian">
          <Accordion
            className={darkTheme && "dark-bg light-font border-radius-dark"}
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
                            <div style={{ display: 'inline-block', color: "#00E396"}}>
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
                          <div className="market-cap-link">
                            <a href="https://test.org">
                              https://test.org
                              <OpenInNewIcon sx={{ fontSize: 13 }} />
                            </a>
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
      <Grid item xs={6}>
        <div className="transactions-accordian">
          <Accordion
            className={darkTheme && "dark-bg light-font border-radius-dark"}
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
            className={darkTheme && "dark-bg light-font border-radius-dark"}
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
      <Grid item xs={6}>
        <div className="token-chart">
          <Paper className={darkTheme && "dark-bg light-font border-radius-dark"} style={{ padding: "20px" }}>
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Typography style={{ fontWeight: "bold" }}>
                Number of Unique Caller
              </Typography>
              <FormControl style={{ width: "5rem" }}>
                <InputLabel className={darkTheme && "light-font"} id="">Day</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={10}
                  label="Age"
                  onChange={handleCallersChange}
                >
                  <MenuItem value={10}>Mon</MenuItem>
                  <MenuItem value={20}>Tue</MenuItem>
                  <MenuItem value={30}>Wed</MenuItem>
                  <MenuItem value={30}>Thu</MenuItem>
                  <MenuItem value={30}>Fri</MenuItem>
                </Select>
              </FormControl>
            </div>
            <BarChart
              width={600}
              height={300}
              data={number_of_unique_caller_data}
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
              <Bar dataKey="pv" fill="#00E396" />
              <Bar dataKey="uv" fill="#008FFB" />
            </BarChart>
          </Paper>
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className="token-chart">
          <Paper className={darkTheme && "dark-bg light-font border-radius-dark"} style={{ padding: "20px" }}>
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
                <InputLabel className={darkTheme && "light-font"} id="">Day</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Age"
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Mon</MenuItem>
                  <MenuItem value={20}>Tue</MenuItem>
                  <MenuItem value={30}>Wed</MenuItem>
                  <MenuItem value={30}>Thu</MenuItem>
                  <MenuItem value={30}>Fri</MenuItem>
                </Select>
              </FormControl>
            </div>
            <AreaChart
              width={600}
              height={300}
              data={number_of_unique_caller_data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E396" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00E396" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#008FFB" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#008FFB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis axisLine={false} tickLine={false} dataKey="name" />
              <YAxis axisLine={false} tickLine={false} />
              <CartesianGrid vertical={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#00E396"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                dataKey="pv"
                stroke="#008FFB"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </Paper>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="bonus-accordian">
          <Accordion
            className={darkTheme && "dark-bg light-font border-radius-dark"}
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
                    percent={userInfo.bonus?.trustonScore || 0}
                    strokeWidth={4}
                    trailWidth={4}
                    strokeColor="#0091FF"
                  />
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
