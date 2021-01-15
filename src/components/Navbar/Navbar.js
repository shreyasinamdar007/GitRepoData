import { React, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { Card, Col, Image } from "react-bootstrap";
import "./Navbar.css";
import img from "../../pngtree-vector-users-icon-png-image_856952.jpg";

function Navigate() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [sort1, setSort] = useState("");
  const [details, setDetails] = useState();
  const [target, setTarget] = useState();
  const [isTruncated, setIsTruncated] = useState(true);
  const [buttonState, setbuttonState] = useState("Details");
  const [buttonS, setbuttonS] = useState("Details");
  const [totalCount, setTotalCount] = useState();

  const onChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let res = await fetch(`https://api.github.com/search/users?q=${username}`);
    let dataJ = await res.json();
    setUsers(dataJ.items);
    setTotalCount(dataJ.total_count);
    console.log(users);
  };

  let sortHandler = (e) => {
    console.log(e.target.value);
    let t = e.target.value;
    setSort(t);
  };

  return (
    <div>
      <Navbar className="nav" bg="primary" variant="dark">
        <Navbar.Brand href="#home">
          <select onChange={sortHandler} bg="primary">
            {sort1}
            <option value="A-Z">Sort A-Z</option>
            <option value="Z-A">Sort Z-A</option>
          </select>
        </Navbar.Brand>
        <Nav className="mr-auto" />
        <Form inline id="forminline">
          <FormControl
            value={username}
            onChange={onChangeHandler}
            type="text"
            placeholder="Search"
            className="mr-sm-2"
          />
          <Button variant="outline-light" onClick={onSubmitHandler}>
            Search
          </Button>
        </Form>
      </Navbar>

      <h6 id="tot">Total Count: {totalCount}</h6>

      {sort1 === "Z-A"
        ? users
            .map((user, index) => (
              <div id="cdiv">
                <Card width="800px" id="card">
                  <Card.Body data-id={index} id="cbody">
                    <Col id="ccol" xs={1} md={2}>
                      <Image src={user.avatar_url} width="70px" roundedCircle />
                    </Col>
                    <div id="det">
                      <Card.Title id="tit">LoginID: {user.login} </Card.Title>
                      <Card.Text id="text">ID: {user.id}</Card.Text>
                      <Card.Text id="text">
                        Profile URL:{" "}
                        <a href={user.html_url}> {user.html_url} </a>
                      </Card.Text>
                      <Card.Text id="text">
                        Repository URL:{" "}
                        <a href={user.repos_url}> {user.repos_url} </a>
                      </Card.Text>
                      <Card.Text id="text">User Type: {user.type}</Card.Text>
                      <Card.Text id="text">Score: {user.score}</Card.Text>

                      {index === target ? details : null}

                      <button
                        type="button"
                        id={index}
                        class="btn btn-info"
                        onClick={(e) => {
                          let tar = e.target.id;
                          tar = parseInt(tar);
                          setTarget(tar);
                          if (index === tar && isTruncated === true) {
                            setDetails(null);
                          } else if (index === tar && isTruncated === false) {
                            setDetails(
                              <div>
                                <Card.Text id="text">
                                  Followers_URL:
                                  <a href={user.followers_url}>
                                    {user.followers_url}
                                  </a>
                                </Card.Text>
                                <Card.Text id="text">
                                  Following_URL:
                                  <a href={user.followers_url}>
                                    {user.following_url}
                                  </a>
                                </Card.Text>
                              </div>
                            );
                          }
                          console.log(index);
                          setIsTruncated(!isTruncated);
                          console.log(tar);
                          isTruncated
                            ? setbuttonState("Details")
                            : setbuttonState("Collapse");
                        }}
                      >
                        {index === target ? buttonState : buttonS}
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))
            .reverse()
        : users.map((user, index) => (
            <div id="cdiv">
              <Card width="800px" style={{}} id="card">
                <Card.Body data-id={index} id="cbody">
                  <Col id="ccol" xs={1} md={2}>
                    <Image src={user.avatar_url} width="70px" roundedCircle />
                  </Col>
                  <div id="det">
                    <Card.Title id="tit">LoginID: {user.login} </Card.Title>
                    <Card.Text id="text">ID: {user.id}</Card.Text>
                    <Card.Text id="text">
                      Profile URL: <a href={user.html_url}> {user.html_url} </a>
                    </Card.Text>
                    <Card.Text id="text">
                      Repository URL:{" "}
                      <a href={user.repos_url}> {user.repos_url} </a>
                    </Card.Text>
                    <Card.Text id="text">User Type: {user.type}</Card.Text>
                    <Card.Text id="text">Score: {user.score}</Card.Text>
                    {/*  {isTruncated === true ? null : (
                    <Card.Text id="text">Score: {user.score}</Card.Text>
                  )} */}
                    {index === target ? details : null}

                    <button
                      type="button"
                      id={index}
                      className="btn btn-info"
                      onClick={(e) => {
                        let tar = e.target.id;
                        tar = parseInt(tar);
                        setTarget(tar);
                        if (index === tar && isTruncated === true) {
                          setDetails(null);
                        } else if (index === tar && isTruncated === false) {
                          setDetails(
                            <div>
                              <Card.Text id="text">
                                Followers_URL:
                                <a href={user.followers_url}>
                                  {user.followers_url}
                                </a>
                              </Card.Text>
                              <Card.Text id="text">
                                Following_URL:
                                <a href={user.followers_url}>
                                  {user.following_url}
                                </a>
                              </Card.Text>
                            </div>
                          );
                        }
                        console.log(index);
                        setIsTruncated(!isTruncated);
                        console.log(tar);
                        isTruncated
                          ? setbuttonState("Details")
                          : setbuttonState("Collapse");
                      }}
                    >
                      {index === target ? buttonState : buttonS}
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
    </div>
  );
}

export default Navigate;
