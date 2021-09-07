import React from "react"
import Header from "./components/header/Header";
import { BrowserRouter, Route, Switch} from "react-router-dom"
import ConversationsList from "./components/conversations-list/ConversationsList";
import MembersList from "./components/members-list/MembersList";
import Footer from "./components/footer/Footer";
import ConversationScreen from "./components/conversation-screen/ConversationScreen";



function App() {
  return (

    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path="/conversations">
        <Header backButton="/" />
        <ConversationsList/>
        </Route>

        <Route exact path="/">
          <Header/>
          <MembersList/>
          <Footer/>
        </Route>

        <Route exact path="/conversation/:receiverId">
          <Header backButton="/conversations" />
          <ConversationScreen/>

        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
