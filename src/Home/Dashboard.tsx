import React, { useEffect, useState } from "react";
import Board from "../Components/Board/Board";
import "./Dashboard.css";
import CustomInput from "../Components/CustomInput/CustomInput";
import { ICard, IBoard } from "../Interfaces/Kanban";
import { fetchBoardList, updateLocalStorageBoards } from "../Helper/APILayers";
import { useNavigate } from 'react-router-dom'
import md5 from "md5"; // Import the md5 library


function Dashboard() {
  const [boards, setBoards] = useState<IBoard[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const boards: IBoard[] = await fetchBoardList();
    setBoards(boards);
  }
  const [targetCard, setTargetCard] = useState({
    boardId: 0,
    cardId: 0,
  });

  const addboardHandler = (name: string) => {
    const tempBoardsList = [...boards];
    tempBoardsList.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
    setBoards(tempBoardsList);
  };

  const removeBoard = (boardId: number) => {
    const boardIndex = boards.findIndex((item: IBoard) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    tempBoardsList.splice(boardIndex, 1);
    setBoards(tempBoardsList);
  };

  const addCardHandler = (boardId: number, title: string) => {
    const boardIndex = boards.findIndex((item: IBoard) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    tempBoardsList[boardIndex].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      tasks: [],
      desc: "",
    });
    setBoards(tempBoardsList);
  };

  const removeCard = (boardId: number, cardId: number) => {
    const boardIndex = boards.findIndex((item: IBoard) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    const cards = tempBoardsList[boardIndex].cards;

    const cardIndex = cards.findIndex((item) => item.id === cardId);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoardsList);
  };

  const updateCard = (boardId: number, cardId: number, card: ICard) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    const cards = tempBoardsList[boardIndex].cards;

    const cardIndex = cards.findIndex((item) => item.id === cardId);
    if (cardIndex < 0) return;

    tempBoardsList[boardIndex].cards[cardIndex] = card;

    setBoards(tempBoardsList);
  };

  const onDragEnd = (boardId: number, cardId: number) => {
    const sourceBoardIndex = boards.findIndex(
      (item: IBoard) => item.id === boardId,
    );
    if (sourceBoardIndex < 0) return;

    const sourceCardIndex = boards[sourceBoardIndex]?.cards?.findIndex(
      (item) => item.id === cardId,
    );
    if (sourceCardIndex < 0) return;

    const targetBoardIndex = boards.findIndex(
      (item: IBoard) => item.id === targetCard.boardId,
    );
    if (targetBoardIndex < 0) return;

    const targetCardIndex = boards[targetBoardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cardId,
    );
    if (targetCardIndex < 0) return;

    const tempBoardsList = [...boards];
    const sourceCard = tempBoardsList[sourceBoardIndex].cards[sourceCardIndex];
    tempBoardsList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
    tempBoardsList[targetBoardIndex].cards.splice(
      targetCardIndex,
      0,
      sourceCard,
    );
    setBoards(tempBoardsList);

    setTargetCard({
      boardId: 0,
      cardId: 0,
    });
  };

  const onDragEnter = (boardId: number, cardId: number) => {
    if (targetCard.cardId === cardId) return;
    setTargetCard({
      boardId: boardId,
      cardId: cardId,
    });
  };

  useEffect(() => {
    updateLocalStorageBoards(boards);
  }, [boards]);






  const [isCardHidden, setCardHidden] = useState(true);

  const toggleCard = () => {
    setCardHidden(!isCardHidden);
  };








  const [logindata, setLoginData] = useState<{ name: string; email: string; date: string }[]>([]);

  


    const history = useNavigate();

    const [show, setShow] = useState(false);

    const todayDate = new Date().toISOString().slice(0, 10);
  

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const Birthday = () => {
      const getuser = localStorage.getItem("user_login");
      if (getuser && getuser.length) {
        const user = JSON.parse(getuser);
        setLoginData(user);
  
        const userbirth = logindata.some((el) => el.date === todayDate);
  
        if (userbirth) {
          setTimeout(() => {
            console.log("ok");
            handleShow();
          }, 3000);
        }
      }
    };
  
    const userlogout = () => {
      localStorage.removeItem("user_login");
      history("/");
    };
  
    useEffect(() => {
      Birthday();
    }, []);
  
  return (
    <div className="app">
     <nav>
      {/* Logo */}
      <ul>
          <h3 style={{color: 'black'}}>Collaborative Task Management App</h3>

        {/* Profile Image */}
        <a href="#" className="display-picture" onClick={toggleCard}>
        <img src={`https://www.gravatar.com/avatar/${md5(logindata[0]?.email || "")}`} alt="Gravatar" />
        </a>
      </ul>

      {/* Card */}
      <div className={`card1 ${isCardHidden ? 'hidden' : ''}`}>
        <ul>
          {/* MENU */}
          <li>
            <a href="#">{logindata[0]?.name}</a>
          </li>
          <li>
            <a onClick={userlogout} href="#">Log Out</a>
          </li>
        </ul>
      </div>
    </nav>
      <div className="app-boards-container">
        <div className="app-boards">
        <div className="app-boards-last">
            <CustomInput
              displayClass="app-boards-add-board"
              editClass="app-boards-add-board-edit"
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              onSubmit={addboardHandler}
            />
          </div>
          {/* {boards.map((item) => (
            <Board
              key={item.id}
              board={item}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(item.id)}
              removeCard={removeCard}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
              updateCard={updateCard}
            />
          ))} */}
          {boards.slice().reverse().map((item) => (
  <Board
    key={item.id}
    board={item}
    addCard={addCardHandler}
    removeBoard={() => removeBoard(item.id)}
    removeCard={removeCard}
    onDragEnd={onDragEnd}
    onDragEnter={onDragEnter}
    updateCard={updateCard}
  />
))}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
