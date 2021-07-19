import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function App() {
  const data = [
    {
      id: "1",
      time: "9:30 - 2:30",
      title: "Breakfast",
      subtitle: "Welcome",
      subtitle1: "Opening Address By",
      img: "./images/avataaars.png",
      authorName: "Achal Khanna",
      address: "CEO, SHRM India & Business Head - APAC & MENA",
    },
    {
      id: "2",
      time: "9:30 - 2:30",
      title: "Breakfast",
      subtitle: "Welcome",
      subtitle1: "Opening Address By",
      img: "./images/avataaars.png",
      authorName: "Achal Khanna",
      address: "CEO, SHRM India & Business Head - APAC & MENA",
    },
  ];

  const [demoData, setDemoData] = useState(data);
  const [editData, setEditData] = useState("");

  const [title, setTitle] = useState(editData.title);
  const [heading, setHeading] = useState(editData.subtitle);
  const [subHeading, setSubHeading] = useState(editData.subtitle1);
  const [author, setAuthor] = useState(editData.authorName);
  const [address, setAddress] = useState(editData.address);
  const [time, setTime] = useState(editData.time);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const editSubmitHandler = (e) => {
    e.preventDefault();
    const DATA = JSON.parse(localStorage.getItem("EditData"));
    let data = [...demoData];

    // find by id from demoData
    const id = DATA.id;
    const index = data.findIndex((item) => item.id === id);

    let orig = demoData[index];
    let edited = orig;
    edited.title = title;
    edited.subtitle = heading;
    edited.subtitle1 = subHeading;
    edited.time = time;
    edited.authorName = author;
    edited.address = address;
    setDemoData(data);
    setEditData("");
    setTitle("");
    setHeading("");
    setSubHeading("");
    setAuthor("");
    setAddress("");
    setTime("");
    localStorage.removeItem("EditData");
  };

  const cancelEdit = () => {
    setEditData("");
    localStorage.removeItem("EditData");
  }

  return (
    <div className={classes.root}>
      {demoData.map((info) => (
        <>
          <Accordion
            expanded={expanded === `panel${info.id}`}
            onChange={handleChange(`panel${info.id}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>{info.time}</Typography>
              <Typography className={classes.secondaryHeading}>
                {info.title}
              </Typography>
            </AccordionSummary>

            <EditIcon
              className="edit-icon"
              onClick={() => {
                // setOpen(true)
                setEditData(info);
              }}
            />

            <AccordionDetails>
              <h3>{info.subtitle}</h3>
              <h3>{info.subtitle1}</h3>
              <div className="author-info">
                <div>
                  <img src={info.img} alt="author" height={50} />
                </div>
                <div className="about-author">
                  <h4>{info.authorName}</h4>
                  <p>{info.address}</p>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </>
      ))}
      {editData && (
        <>
          {localStorage.setItem("EditData", JSON.stringify(editData))}
          <div>
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={editSubmitHandler}
            >
              <TextField
                id="standard-basic"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                id="standard-basic"
                label="Heading"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />
              <TextField
                id="standard-basic"
                label="Sub Heading"
                value={subHeading}
                onChange={(e) => setSubHeading(e.target.value)}
              />
              <TextField
                id="standard-basic"
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <TextField
                id="standard-basic"
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                id="standard-basic"
                label="Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <button type="submit">Submit</button>
              <button onClick={cancelEdit}>Cancel</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
