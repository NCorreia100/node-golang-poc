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
            this.setState({users:JSON.parse(users)})
        }).catch(err=>console.warn('Failed to retrieve users',err));
    }
    render(){
        let {users} = this.state;
        
        return (<>
        <h1>Node - Go POC </h1>
        <table>
        <thead className="mt-5"><tr><th>user ID</th><th>name</th><th>age</th></tr></thead>
        <tbody>
        {users.length===0?
        (<tr className="mt-5"><th>Loading users..</th></tr>)
        : users.map(user=>{
            let {id,name,age} = user;
           return <tr key={id} className="mt-5"><td>{id}</td><td>{name}</td><td>{age}</td></tr>
    })}
        </tbody>
        </table>
        </>)
    }
}

ReactDOM.render(<App/>,document.getElementById('root'));