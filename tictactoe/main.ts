
import { serve } from "https://deno.land/std@0.106.0/http/server.ts";
import { acceptWebSocket, isWebSocketCloseEvent } from "https://deno.land/std@0.106.0/ws/mod.ts";

const port = 3741;
const server = serve({ port });


let boards = {
  f1: " ",
  f2: " ",
  f3: " ",
  f4: " ",
  f5: " ",
  f6: " ",
  f7: " ",
  f8: " ",
  f9: " ",
};

type board = typeof boards;
let field: board;
let winCombination : number = 0;
let turn: number = 1;
let currTurn: number = 0;
let reset: boolean = false;
console.log(`HTTP webserver running. Access it at:  http://localhost:${port}/`);

const players = new Map<number, WebSocket>(); 

for await (const req of server) {
  if (req.url === "/ws") {
    const { conn, r: bufReader, w: bufWriter, headers } = req;
    acceptWebSocket({ conn, bufReader, bufWriter, headers })
      .then((sock) => handleSocket(sock))
      .catch(async (err) => {
        console.error(`failed to accept websocket: ${err}`);
        await req.respond({ status: 400 });
      });
  } else {
    req.respond({
      headers: new Headers({
        "content-type": "text/html",
      }),
      body: await Deno.readTextFile("index.html"),
    });
  }
}



type Message = { turn: number, field: string };



async function handleSocket(sock: WebSocket) {
  console.log("Socket connected!");
  if (players.size >= 2) {
    await sock.send(JSON.stringify({ error: "Game is full. Only two players are allowed." }));
    sock.close();
    return;
  }
  

  const playerId = players.size + 1;
  players.set(playerId, sock);

  await sock.send(JSON.stringify({ playerNumber: playerId }));

  if (players.size === 2) {
    console.log("Both players connected, starting the game!");

    
    const initialMessage: Message = { turn: 1, field: JSON.stringify(field) };
    for (const playerSock of players.values()) {
      await playerSock.send(JSON.stringify(initialMessage));
    }
  }


  for await (const ev of sock) {
    if (typeof ev === "string") 
    {
        console.log(`Player ${playerId} sent message:`, ev);
        turn = playerId;      
        
        const value = JSON.parse(ev);
        try {
          if (value.reset === true && winCombination !== 0){
            resetGame();
            const message: Message = { turn: 1, field: JSON.stringify(field) };
            for (const playerSock of players.values())
            {
                await playerSock.send(JSON.stringify(message));
            }
            reset = false;
            continue;
          }
        } catch (error) {
          console.log("error");
          
        }
       
        const cache = checkField(value.field, boards);
        console.log(cache);
        console.log(winCombination);
        if (winCombination !== 0){
            if (winCombination === 99){
                const message: Message = { turn: 99, field: value.field };
                for (const playerSock of players.values())
                {
                    await playerSock.send(JSON.stringify(message));
                }
            }
            else{
            const winner:number = 90 +playerId;
            const message: Message = { turn: winner, field: value.field };
            for (const playerSock of players.values())
            {
                await playerSock.send(JSON.stringify(message));
            }
          }
          
          break;
        }
        if(cache != 0){ 
            console.log("wrong move");
        }
        currTurn = getTurn(turn);
        boards = value.field;
        const message: Message = { turn: currTurn, field: boards };
        for (const playerSock of players.values())
        {
            await playerSock.send(JSON.stringify(message));
        }
    }
    else if (typeof ev === "object") 
    {
        const message = JSON.parse(ev.toString());
        console.log(`Received from Player ${playerId}:`, message);
        for (const playerSock of players.values()) 
        {
            await playerSock.send(JSON.stringify(message));
        }
    } 
    else if (isWebSocketCloseEvent(ev)) 
    {
        console.log(`Player ${playerId} disconnected`);
        players.delete(playerId);
    }
  }
}
function checkField(field: board, intitialField: board){
    console.log(field);
    console.log(intitialField);
    const s1 = field.f1; const s2 = field.f2; const s3 = field.f3; const s4 = field.f4; const s5 = field.f5; const s6 = field.f6; const s7 = field.f7; const s8 = field.f8; const s9 = field.f9;
    const f1 = intitialField.f1; const f2 = intitialField.f2; const f3 = intitialField.f3; const f4 = intitialField.f4; const f5 = intitialField.f5; const f6 = intitialField.f6; const f7 = intitialField.f7; const f8 = intitialField.f8; const f9 = intitialField.f9;
    const initialStrings = [f1, f2, f3, f4, f5, f6, f7, f8, f9];
    const strings = [s1, s2, s3, s4, s5, s6, s7, s8, s9];
    for (const str in strings){

        if(initialStrings[str] !== " "){
            if (strings[str] != initialStrings[str]){
                console.log("cheating detected");
                return 12;
            }
        }
        
    }
    let differences = 0;
    for (let i = 0; i < 9; i++) {
        if (strings[i] !== initialStrings[i]) 
        {
            differences++;
        }
    }
    if (differences > 1) 
    {
        console.log(differences);
        console.log("illegal move");
        return 16; 
    }

  
  if (checkWinCondition(field)){
    console.log("win condition met");
  }
  if(checkDraw(strings)){
    console.log("draw condition met");
  }
  field = intitialField;
  return 0;
}

function checkWinCondition(field:board):boolean 
{
  if (field.f1 === field.f2 && field.f2 === field.f3 && field.f1 !== " ") 
  {
    winCombination = 1;
    return true;
  } 
  else if (field.f4 === field.f5 && field.f5 === field.f6 && field.f4 !== " ")
  {
    winCombination = 2;
    return true;
  }
  else if (field.f7 === field.f8 && field.f8 === field.f9 && field.f7 !== " ")
  {
    winCombination = 3;
    return true;
  }
  else if (field.f1 === field.f4 && field.f4 === field.f7 && field.f1 !== " ")
  {
    winCombination = 4;
    return true;
  }
  else if (field.f2 === field.f5 && field.f5 === field.f8 && field.f2 !== " ")
  {
    winCombination = 5;
    return true;
  }
  else if (field.f3 === field.f6 && field.f6 === field.f9 && field.f3 !== " ")
  {
    winCombination = 6;
    return true;
  }
  else if (field.f1 === field.f5 && field.f5 === field.f9 && field.f1 !== " ")
  {
    winCombination = 7;
    return true;
  }
  else if (field.f3 === field.f5 && field.f5 === field.f7 && field.f3 !== " ")
  {
    winCombination = 8;
    return true;
  }	
  return false;

}
function getTurn(turn: number): number
{
    if (turn === 1)
    {
        return 2;
    }
    else
    {
        return 1;
    }
}

function checkDraw(strings: string[]): boolean
{
  for (const str in strings) 
  {
    if (strings[str] === " ") 
    {
      
      return false;
    }
  }
  if (winCombination !== 0){
    return false;
  }
  console.log("draw condition met");
  winCombination = 99;
  return true;
}

async function resetGame(){
  field = {
    f1: " ",
    f2: " ",
    f3: " ",
    f4: " ",
    f5: " ",
    f6: " ",
    f7: " ",
    f8: " ",
    f9: " ",
  };
  winCombination = 0;
  turn = 1;
  currTurn = 1;
  reset = true;
  const message = {reset: true};
  for (const playerSock of players.values())
    {
        await playerSock.send(JSON.stringify(message));
    }
}