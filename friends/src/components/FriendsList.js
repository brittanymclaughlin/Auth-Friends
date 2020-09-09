import React from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";
import styled from 'styled-components';
import image from '../images/friends1.jpg';

class FriendsList extends React.Component {
    state = {
        friends: [],
        form: {
            name: "",
            age: "",
            email: ""
        },
        edit: false
    };

    componentDidMount(){
        this.fetchFriends();
    }


    fetchFriends = () => {
        axiosWithAuth()
        .get("api/friends")
        .then(res => {
            this.setState({
                friends: res.data
            })
        })
        .catch(err => console.log({err}))
    }


    addFriend = (e) => {
        console.log("testfriendform", this.state.form)
        e.preventDefault();
        axiosWithAuth()
        .post("api/friends", this.state.form)
        .then(res => {
            console.log("test AddFriend function", res)
            this.setState({
                ...this.state.friends,
                friends: res.data,
                form: {
                    name: "",
                    age: "",
                    email: ""
                }
            })
        })
        .catch(err => console.log({err}))
    }


    moreInfo = (id) => {
        axiosWithAuth()
        .get(`api/friends/${id}`)
        .then(res => {
            this.setState({friend: res.data})
            
        })
        .catch(err => console.log({err}))
    }


    handleChanges = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }


    handleEdit = e => {
        this.setState({
            friend: {
                ...this.state.friend,
                [e.target.name]: e.target.value
            }
        })
    }



    deleteFriend = id => {
        axiosWithAuth()
        .delete(`api/friends/${id}`)
        .then(res => {
            // console.log("testfriend", res)
            this.setState({friends: this.state.friends.filter(friend => friend.id !== id)})
        })
        .catch(err => console.log({err}))
    
    }



    editFriend = e => {
     this.setState({edit: !this.state.edit})
    }


    saveEdit = e => {
        e.preventDefault();
        console.log("testFriendEdit", this.state.friend)
        axiosWithAuth()
        .put(`api/friends/${this.state.friend.id}`, this.state.friend)
        .then(res => {
            this.setState({
                edit: false
            })

        })
        .catch(err => console.log({err}))

    }

    render(){
        return(
            <FriendList>
                <h1>Friends</h1>
               <img src={image} />
               <div className="list">
                {
                    this.state.friends.map( (friend) => {
                        return(
                            <div key={friend.id}>
                                <h4>Name: {friend.name}</h4>
                                {(!this.state.friend || this.state.friend.id !== friend.id) ? <button onClick={() => this.moreInfo(friend.id)}>More Info</button> : null}
                                
                                
                                {(this.state.friend && friend.id === this.state.friend.id) ? 
                                    <div>
                                        <form>
                                        <label htmlFor="age">
                                            <input 
                                                type="number"
                                                placeholder="age"
                                                name="age"
                                                id="age"
                                                value={this.state.friend.age}
                                                onChange={this.handleEdit}
                                                disabled={!this.state.edit}

                                            />
                                        </label>
                                        <label htmlFor="email">
                                            <input 
                                                type="text"
                                                placeholder="email"
                                                name="email"
                                                id="email"
                                                value={this.state.friend.email}
                                                onChange={this.handleEdit}
                                                disabled={!this.state.edit}
                                            />
                                        </label>
                                        <button onClick={this.saveEdit} disabled={!this.state.edit}>Save</button>
                                        </form>
                                        
                                        <button onClick={() => this.deleteFriend(friend.id)}>Delete</button>
                                        <button onClick={() => this.editFriend()}>Edit</button>
                                    </div> : null
                                }

                            </div>
                        )
                    }) 
                }
                </div>
             <div className="addForm">
                <h4>Add a new friend!</h4>
                <form>
                    <label htmlFor="name">
                        <input 
                            type="text"
                            placeholder="name"
                            name="name"
                            id="name"
                            value={this.state.form.name}
                            onChange={this.handleChanges}

                        />
                    </label>
                    <br/>
                    <br/>
                    <label htmlFor="age">
                        <input 
                            type="number"
                            placeholder="age"
                            name="age"
                            id="age"
                            value={this.state.form.age}
                            onChange={this.handleChanges}
                        />
                    </label>
                    <br/><br/>
                    <label>
                        <input 
                            type="email"
                            placeholder="email"
                            name="email"
                            id="email"
                            value={this.state.form.email}
                            onChange={this.handleChanges}
                        />
                    </label><br/><br/>
                    <button onClick={this.addFriend}>Add New Friend</button>    
                </form>
                </div>
            </FriendList>
        )   
    }
}
const FriendList = styled.div`
    display:flex;
    flex-direction:column;
    margin:0 auto;
    width:100vw;
    text-align:center; 
        .list{
            display:flex;
            flex-wrap:wrap;
            margin:0 auto;

            div{
                margin:2%;
                border:1px solid white;
                padding:1%;
                width:26vw;
            }
        }
            
        img{
            width:95vw;
        }
        .addForm{
            background-color:white;
            color:black;
            width:30%;
            opacity:0.8;
            padding:2%;
            border-radius:5px;
            margin:0 auto;

            h4{
                margin-top:0;
            }
        }
    `
export default FriendsList;