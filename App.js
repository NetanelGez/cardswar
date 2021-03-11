import React, { Component } from "react";
import "./App.css";
import HomePage from "./components/HomePage.js";
import GamePage from "./components/GamePage.js";
import WinnerPage from "./components/WinnerPage.js";

export default class App extends Component {
  
  state = {
    mame: "",
    flag: 1,
    playerCardS: [],
    computerCardS: [],
    computerScore: 0,
    playerScore: 0,
    index: 0,
    winerName: "",
  };

  //פונקציה שתעבור ע"י פרופס לקומפוננטה "הום פייג'" כדי שחפיסת הקלפים של השחקן ושל המחשב ישמרו בתוך אפ
  initGame = (n, arrP, arrC) => {
    this.setState({ name: n });
    this.setState({ flag: 2 });
    this.setState({ playerCardS: arrP });
    this.setState({ computerCardS: arrC });
  };

  //פונקציה שתישלח לקומפוננטה "גיימ-פייג'" כדי לעדכן בכל לחיצה על "נקסט" את הניקוד בין השחקנים
  //הפונקציה מקבלת 2 ערכים,הראשון למחשב והשני לשחקן
  addScores = (c, p) => {
    this.setState({ computerScore: this.state.computerScore + c });
    this.setState({ playerScore: this.state.playerScore + p });
    this.setState({ index: this.state.index + 1 });
  };

  again = () => {
    this.setState({ flag: 1 });
    this.setState({ computerScore: 0 });
    this.setState({ playerScore: 0 });
    this.setState({ index: 0 });
  };

  //פונקציה שתעביר אותנו בין המסכים השונים במשחק
  //כל פעם שהדגל יקבל ערך מסויים הוא יציג את הקומפוננטה הרצויה.
  show = () => {
    //אם הדגל הוא 0 תוצג הקומפוננטה של מסך הבית
    if (this.state.flag == 1) {
      return (
        <div>
          <HomePage validName={this.initGame} />
        </div>
      );
    }

    //אם הדגל הוא 1 תוצג הקומפוננטה של מסך המשחק
    if (this.state.flag == 2) {
      //אם האינדקס הוא קטן שווה ל25 (לחיצורת על כפתור נקסט) קוממפוננטת המשחק עדיין תוצג
      if (this.state.index <= 25) {
        return (
          <div>
            {/*נשלח לקומפוננטה באמצעות פרופס את הקלף במקום האינדקס לראות מי ניצח בסיבוב, ואת הפונקציה להוספת הניקוד */}
            <GamePage
              index={this.state.index}
              cardC={this.state.computerCardS[this.state.index]}
              cardP={this.state.playerCardS[this.state.index]}
              addScores={this.addScores}
            />
          </div>
        );
      } else {
        //אחרת- ברגע שאנו בלחיצה ה26 נעדכן את הדגל ל2 כדי שתוצג לנו קומפוננטת הסיום,
        this.setState({ flag: 3 });

        //בדיקות למי הניקוד הסופי יותר גבוה וכך יוצג שמו על במסך
        if (this.state.computerScore > this.state.playerScore) {
          //מחשב ניצח
          this.setState({ winerName: "computer" });
        } else if (this.state.computerScore < this.state.playerScore) {
          //שחקן ניצח
          this.setState({ winerName: this.state.name });
        } else if (this.state.computerScore == this.state.playerScore) {
          //תיקו
          this.setState({ winerName: "draw" });
        }
      }
    }
    if (this.state.flag == 3) {
      return (
        <div>
          <WinnerPage winerName={this.state.winerName} again={this.again} />
        </div>
      );
    }
  };
  render() {
    return <div className="App">{this.show()}</div>;
  }
}
