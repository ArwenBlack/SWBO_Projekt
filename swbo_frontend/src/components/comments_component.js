import React, { Component} from "react";
import "../styles/home_style.module.css"
import {Link} from "react-router-dom";
import axios from "axios";
import CreatePostModal from "./createPostModal";
import CreateCommentModal from "./createCommentModal";
import moment from "moment";
import Navbar_component from "./Navbar_component";
import {Redirect} from "react-router";
class Comments extends Component{
    constructor(props) {
    super(props);
    this.state ={
            user: JSON.parse(localStorage.getItem('user')).user,
            mother_post: JSON.parse(localStorage.getItem('post')),
            comment_create: false,
            activeItem: {},
            just_test: 0,
            Comment_for_post: [],
            redirect: false,
        }
    }
    componentDidMount() {
        this.getComments();
    }
    getComments = () => {
        axios
            .get('/comment/')
            .then((res) => this.getGoodComments(res.data))
            .catch(err => console.log(err))
        console.log(this.state.Comment)
    }

    getGoodComments = (r) => {
        let pom = [];
        for (let i =0 ; i < r.length; i++){
        if (r[i].mother_post === this.state.mother_post.id){
                pom.push(r[i])
            }
        }
        console.log(pom)
        this.setState({Comment_for_post: pom})
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
    handleEdit = (item) =>{
        this.setState({activeItem: item, comment_create: !this.state.comment_create})
    }

    handleCommentSubmit = (item)=>{
        this.toggleC()

        if (item.id){
            axios
                .put(`/comment/edit/${item.id}/`, item)
                .then((res) => this.getComments())
                .catch(err => console.log(err))
            return;
        }
        item["author"] = this.state.user.id
        item["date"] = moment().format("YYYY-MM-DD HH:mm:ss")
        item["mother_post"] = this.state.mother_post.id
        axios
            .post("/comment/create/", item)
            .then((res) => this.getComments())
            .catch((err) => console.log(err))
    }

    handleDelete = (item) => {
        axios
            .delete(`/comment/delete/${item.id}/`)
            .then(res => this.getComments())
            .catch(err => console.log(err))
    }

    renderItems = () => {
        const { viewCompleted } = this.state;
         const newItems = this.state.Comment_for_post.filter(
        (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li key={item.id} style={{listStyle: "none"}}>
          <div className="col-md-12" style={{textAlign: "left"}}>
              <div className="card mb-4" style={{ boxShadow: "5px 5px 5px rgb(91,91,112) "}} >
                  <div className="card-header" >
                      <div className="media flex-wrap w-100 align-items-center" >
                          <div className="media-body ml-3" ><div data-abc="true">Comment for post "{this.state.mother_post.title}"</div>
                              <div className="text-muted small" id={item.id}>{this.handleAuthor(item)}</div>
                          </div>
                          <div className="text-muted small ml-3">
                              <div>Adding date <strong>{item.date}</strong></div>
                          </div>
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
                      <div>{this.state.user.id === item.author &&
                      <div
                          className="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3">
                          <div className="px-4 pt-3">
                          </div>
                          <div className="px-4 pt-3">

                              <button type="button" className="btn btn-danger" style={{margin: "10px"}} onClick={() => {
                                  if (window.confirm('Are you sure to delete this post?')) this.handleDelete(item)
                              }}> Delete
                              </button>
                              <button type="button" className="btn btn-primary" onClick={() => {this. handleEdit(item) } } > Edit
                                    </button>

                          </div>
                      </div>
                      }
                          </div>


              </div>
          </div>
      </li>
    ));
  };


    render(){
        if (this.state.redirect === true) {
            return <Redirect to = "/forum" />;
         }
        return (
            <div className="test">
                <Navbar_component />
                <div>
            <h3>Comments  <button className='btn btn-outline-primary' onClick={() => this.setState({redirect: true})} style={{margin: "10px"}}>Back</button> </h3>
                    </div>
                <div className="col-7 mx-auto p-0" >
             <div className="col-md-12" style={{textAlign: "left"}}>
              <div className="card mb-9" style={{boxShadow: " 0 0 1em rgb(150,200,214)"}}>
                  <div className="card-header">
                      <div className="media flex-wrap w-100 align-items-center">
                          <div className="media-body ml-3" ><a  data-abc="true">{this.state.mother_post.title}</a>
                              <div className="text-muted small" id={this.state.mother_post.id}>{this.handleAuthor(this.state.mother_post)}</div>
                          </div>
                          <div className="text-muted small ml-3">
                              <div>Adding date <strong>{this.state.mother_post.date}</strong></div>
                          </div>
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
                          className="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0  " style={{backgroundColor:"rgb(255, 235, 232)"}}>
                          <div className="px-4 pt-3">
                          </div>
                          <div className="px-4 pt-3 pb-1">
                              <button type="button" className="btn btn-primary" onClick={this.handleCommentCreate}> Reply
                              </button>
                          </div>

                      </div>
                      <div
                          className="card-footer border-top-0 flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3" style={{backgroundColor:"rgb(255, 235, 232)"}}>
                          <div className="">
                          </div>
                          <div className="pt-3">
                              {this.renderItems()}
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