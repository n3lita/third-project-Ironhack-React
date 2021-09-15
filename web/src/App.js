import React from "react"
import Header from "./components/misc/header/Header";
import { Route, Switch, Redirect } from "react-router-dom"
import MembersList from "./components/member/members-list/MembersList";
import Footer from "./components/misc/footer/Footer";
//import ConversationScreen from "./components/conversations/conversation-screen/ConversationScreen";
import MemberDetail from "./components/member/member-detail/MemberDetail";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import Conversations2 from "./components/messenger/conversations2-list/conversations2";
import ChatBox from "./components/messenger/chatbox/Chatbox";
import GoogleCallback from "./components/auth/GoogleCallback";
import PrivateRoute from "./components/guards/PrivateRoute";


function App() {
  return (

    <div className="App">
      
      <Switch>
        <PrivateRoute exact path="/conversations">
        <Header backButton="/" />
        <Conversations2/>
        </PrivateRoute>

        <PrivateRoute exact path="/">
          <Header/>
          <MembersList/>
          <Footer/>
        </PrivateRoute>

        <PrivateRoute exact path="/conversations/:conversationId">
          <Header backButton="/conversations" />
          <ChatBox/>
        </PrivateRoute>

        <PrivateRoute exact path="/members/:id" component={MemberDetail} />
        
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/google/cb" component={GoogleCallback}/>
        <Redirect to="/"/>
      </Switch>
    </div>
  );
}

export default App;
