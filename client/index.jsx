import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';


class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            newUser:{
                name:'',
                age:''
            }
        }
        
    }
    saveUser(newUser){
        console.log('adding user',newUser)
        return fetch('users',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({user:{...newUser,age:parseInt(newUser.age)}})
        })
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
        let {users, newUser} = this.state;
        
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
    <tr><th><button type="button" onClick={()=>{
        let {users,newUser} = this.state;
        if(newUser.name.length<10|| newUser.age.length<2) return;
        this.saveUser(newUser).then(()=>{
            let defaultUser ={
                name:'',
                age:''
            };
            users.push(newUser);
            this.setState({users,newUser:defaultUser});
        })



    }}>Add</button></th>
        <td><input type="text" value={newUser.name||''} onChange={e=>{
            newUser.name = e.target.value;
            this.setState({newUser});

        }}/></td>
        <td><input type="number" value={newUser.age||''} onChange={e=>{
            newUser.age = e.target.value;
            this.setState({newUser});

        }}/></td>
    </tr>
        </tbody>
        </table>
        </>)
    }
}

ReactDOM.render(<App/>,document.getElementById('root'));