import React from "react"
import Header from "./components/header/Header";
import { BrowserRouter, Route, Switch} from "react-router-dom"
import ConversationsList from "./components/conversations/conversations-list/ConversationsList";
import MembersList from "./components/member/members-list/MembersList";
import Footer from "./components/footer/Footer";
import ConversationScreen from "./components/conversations/conversation-screen/ConversationScreen";
import MemberDetail from "./components/member/member-detail/MemberDetail";



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

        <Route exact path="/members/:id" component={MemberDetail} />

      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
