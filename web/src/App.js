import React from "react"
import Header from "./components/misc/header/Header";
import { Route, Switch, Redirect } from "react-router-dom"
import MembersList from "./components/member/members-list/MembersList";
import Footer from "./components/misc/footer/Footer";
import ConversationScreen from "./components/conversations/conversation-screen/ConversationScreen";
import MemberDetail from "./components/member/member-detail/MemberDetail";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import Conversations2 from "./components/messenger/conversations2-list/conversations2";
import ChatBox from "./components/messenger/chatbox/Chatbox";
import GoogleCallback from "./components/auth/GoogleCallback";


function App() {
  return (

    <div className="App">
      
      <Switch>
        <Route exact path="/conversations">
        <Header backButton="/" />
        <Conversations2/>
        </Route>

        <Route exact path="/">
          <Header/>
          <MembersList/>
          <Footer/>
        </Route>

        <Route exact path="/conversation/:receiverId">
          <Header backButton="/conversations" />
          <ChatBox/>
        </Route>

        <Route exact path="/members/:id" component={MemberDetail} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

{/*         <Route exact path="/chats">
          <ChatBox/>
        </Route> */}
        <Route exact path="/google/cb" component={GoogleCallback}/>
        <Redirect to="/"/>
      </Switch>
    </div>
  );
}

export default App;
