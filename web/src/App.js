import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import MembersList from "./components/member/members-list/MembersList";
import MemberDetail from "./components/member/member-detail/MemberDetail";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import Conversations from "./components/conversations/conversations-list/ConversationsList"
import ConversationScreen from "./components/conversations/conversation-screen/ConversationScreen";
import GoogleCallback from "./components/auth/GoogleCallback";
import PrivateRoute from "./components/guards/PrivateRoute";


function App() {
  return (

    <div className="App">

      <Switch>
        <PrivateRoute exact path="/" component={MembersList} />
        <PrivateRoute exact path="/conversations" component={Conversations} />
        <PrivateRoute exact path="/conversations/:conversationId" component={ConversationScreen} />
        <PrivateRoute exact path="/members/:id" component={MemberDetail} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/google/cb" component={GoogleCallback} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
