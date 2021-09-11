import React from "react"
import Header from "./components/misc/header/Header";
import { Route, Switch } from "react-router-dom"
import ConversationsList from "./components/conversations/conversations-list/ConversationsList";
import MembersList from "./components/member/members-list/MembersList";
import Footer from "./components/misc/footer/Footer";
import ConversationScreen from "./components/conversations/conversation-screen/ConversationScreen";
import MemberDetail from "./components/member/member-detail/MemberDetail";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";


function App() {
  return (

    <div className="App">
      
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
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
