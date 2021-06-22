import React, { Component} from "react";
import "../styles/home_style.module.css"
import {Link} from "react-router-dom";
import axios from "axios";
import CreatePostModal from "./createPostModal";
import CreateCommentModal from "./createCommentModal";
import moment from "moment";
class Comments extends Component{
    constructor(props) {
    super(props);
    this.state ={
            user: JSON.parse(localStorage.getItem('user')).user,
            mother_post: JSON.parse(localStorage.getItem('post')),
            comment_create: false,
            activeItem: {},
            just_test: 0
        }
    }
    toggleC = () => {
        this.setState({comment_create: !this.state.comment_create})
    }
    handleAuthor = (item) => {
             axios
                 .get(`/user/${item.author}/`)
                 .then (res => document.getElementById(item.id).innerHTML = "by " + res.data.username)
                 .catch((err) => console.log(err));
    }
    handleCommentCreate = () => {
        const comment = {content: ""}
        this.setState({activeItem: comment, comment_create: !this.state.comment_create})
    }

    handleCommentSubmit = (item)=>{
        item["author"] = this.state.user.id
        item["date"] = moment().format("YYYY-MM-DD HH:mm:ss")
        item["mother_post"] = this.state.mother_post.id
        this.toggleC()
        axios
            .post("/comment/create/", item)
            .then((res) => this.setState({just_test: 1}))
            .catch((err) => console.log(err))
    }
    render(){
        return (
            <div className="test">
            <h3>comments</h3>
                 <div className="col-7 mx-auto p-0">
             <div className="col-md-12" style={{textAlign: "left"}}>
              <div className="card mb-9">
                  <div className="card-header">
                      <div className="media flex-wrap w-100 align-items-center">
                          <div className="media-body ml-3" ><a  data-abc="true">{this.state.mother_post.title}</a>
                              <div className="text-muted small" id={this.state.mother_post.id}>{this.handleAuthor(this.state.mother_post)}</div>
                          </div>
                          <div className="text-muted small ml-3">
                              <div>Adding date <strong>{this.state.mother_post.date}</strong></div>
                          </div>
                      </div>
                      <div className="card-body">
                          <p> {
                              this.state.mother_post.content.split("\n").map(function (i) {
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
                              <button type="button" className="btn btn-primary" onClick={this.handleCommentCreate}> Reply
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
            </div>
                 {this.state.comment_create ? (
                <CreateCommentModal
              activeItem={this.state.activeItem}
              toggle = {this.toggleC}
              onSave={this.handleCommentSubmit}
          />
        ): null}
            </div>
        )
    }
}
export default Comments;