import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';


class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            users:[]
        }
        
    }
    componentDidMount(){
        fetch('/users')
        .then(res=>res.json())
        .then(body=>{
            const {users} = body;
            console.log('users',users)
            this.setState({users})
        }).catch(err=>console.warn('Failed to retrieve users',err));
    }
    render(){
        let {users} = this.state;
        
        return (<>
        <h1>Node - Go POC </h1>
        <table>
        <tr className="mt-5"><th>user ID</th><th>name</th><th>age</th></tr>
        {users.length===0?
        (<tr className="mt-5">Loading users..</tr>)
        : users.map(user=>
            <tr key={user.id} className="mt-5">
                <td>{user.id}</td><td>{user.name}</td><td>{user.age}</td>
            </tr>
        )}
        </table>
        </>)
    }
}

ReactDOM.render(<App/>,document.getElementById('root'));