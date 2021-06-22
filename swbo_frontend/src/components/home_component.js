import React, { Component} from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import styles from "../styles/home_style.module.css"
import CreatePostModal from "../components/createPostModal";
import moment from "moment";
import { Text, StyleSheet } from "react-native";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";

class Home extends Component {
    constructor(props) {
    super(props);
    this.state ={
            Post: [],
            user: JSON.parse(localStorage.getItem('user')).user,
            new_post: false,
            activeItem: {},
            showComments: false
        }
    }
    componentDidMount() {
    this.refreshList();
  }
    toggle = () => {
        this.setState({new_post: !this.state.new_post})
    }
    refreshList = () => {
    axios
      .get("/post/")
      .then((res) => this.setState({Post: res.data}))
      .catch((err) => console.log(err));
  };
    handlePostSubmit = (item)=>{
        item["author"] = this.state.user.id
        item["date"] = moment().format("YYYY-MM-DD HH:mm:ss")
        console.log(item)
        this.toggle()
        axios
            .post("/post/create/", item)
            .then((res) => this.refreshList())
            .catch((err) => console.log(err))
    }
    createPost = () => {
        const post = {title: "", content: ""}
        this.setState({activeItem: post, new_post: !this.state.new_post})
    }
    handleAuthor = (item) => {
             axios
                 .get(`/user/${item.author}/`)
                 .then (res => document.getElementById(item.id).innerHTML = "by " + res.data.username)
                 .catch((err) => console.log(err));
    }
    showComments = (item) => {
        this.setState({showComments: true})
        localStorage.setItem('post', JSON.stringify(item))
        console.log(JSON.parse(localStorage.getItem('post')))
    }
    renderItems = () => {
        const { viewCompleted } = this.state;
         const newItems = this.state.Post.filter(
        (item) => item.completed === viewCompleted
    );
    return newItems.map((item) => (
      <li key={item.id} style={{listStyle: "none"}}>
          <div className="col-md-12" style={{textAlign: "left"}}>
              <div className="card mb-4">
                  <div className="card-header">
                      <div className="media flex-wrap w-100 align-items-center">
                          <div className="media-body ml-3" ><Link onClick={() => this.showComments(item)} data-abc="true">{item.title}</Link>
                              <div className="text-muted small" id={item.id}>{this.handleAuthor(item)}</div>
                          </div>
                          <div className="text-muted small ml-3">
                              <div>Adding date <strong>{item.date}</strong></div>
                          </div>
                      </div>
                      <div className="card-body">
                          <p> {
                              item.content.split("\n").map(function (i) {
                                  return (
                                      <span>
                          {i}
                          <br/>
                          </span>
                              )
                          })
                          }</p>

                      </div>
                      <div
                          className="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3">
                          <div className="px-4 pt-3">
                          </div>
                          <div className="px-4 pt-3">
                              <button type="button" className="btn btn-primary"> Reply
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </li>
    ));
  };
    render(){
        if (this.state.showComments === true) {
            this.setState({showComments: false})
            return <Redirect to = "/comments" />;
         }
        return (
            <div className={styles["App"]}>
            <div>
            <h1>FORUM</h1>
            </div>
            <div className="col-6 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button className="btn btn-primary" onClick={this.createPost} style={{float:"right"}} >
                        New Post
                </button>
              </div>
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
                {this.state.new_post ? (
          <CreatePostModal
              activeItem={this.state.activeItem}
              toggle = {this.toggle}
              onSave={this.handlePostSubmit}
          />
        ): null}
        </div>

        )
    }
}

export default Home;