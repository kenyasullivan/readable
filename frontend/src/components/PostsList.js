import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { List, Button, Container, Grid, Icon } from "semantic-ui-react";
import Moment from "react-moment";

import { connect } from "react-redux";
import {
  fetchPosts,
  fetchCategories,
  voteForPost,
  sortForPosts
} from "../actions";

import { sortByScore, sortByDate } from "../utils/filters";

class PostsList extends Component {
  //lifecycle method to initial call to API
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }
  onDeleteSubmit() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }
  handleVote(id, vote) {
    this.props.voteForPost(id, vote);
  }

  handlePostSort(method) {
    this.props.sortForPosts(method);
  }

  //helper function to render posts: map over posts and render 1 <li> for each
  //Using and object so use lodash map _.map
  //use post.id as key
  renderPosts() {
    const { posts } = this.props;
    if (posts) {
      const sortPosts = _.sortBy(posts, this.props.sortBy).reverse();
      return sortPosts.map(post => (
        <div className="ui card" key={post.id}>
          <div className="content">
            <i
              className="right floated trash outline icon"
              onClick={this.onDeleteSubmit.bind(this)}
            />
            <Link to={`/posts/edit/${post.id}`}>
              <i className="right floated edit icon" />
            </Link>
            <div className="header">
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </div>
            <div className="card meta">
              Submited{" "}
              <Moment format="MM-DD-YYYY HH:mm">{post.timestamp}</Moment> by{" "}
              {post.author} in {post.category}
            </div>
          </div>
          <div className="extra content">
            <span className="left floated like">
              <i className="comments outline icon" />
              {post.commentCount} Comments
            </span>
            <span className="right floated star">
              <Icon
                name="thumbs outline up"
                size="large"
                onClick={() => this.handleVote(post.id, "upVote")}
              />
              {""}
              <span>
                {" "}
                <b>{post.voteScore}</b>
              </span>
              {""}
              <Icon
                name="thumbs outline down"
                size="large"
                onClick={() => this.handleVote(post.id, "downVote")}
              />
            </span>
          </div>
        </div>
      ));
    }
  }

  renderCategories() {
    const { categories } = this.props;
    if (categories) {
      return categories.map(category => {
        return (
          <List.Item key={category.path}>
            <Link to={`/${category.name}/posts}`}>{category.name}</Link>
          </List.Item>
        );
      });
    }
  }
  render() {
    //console.log(this.props.posts) // test we are receiving posts from state
    const { sortForPosts } = this.props;
    return (
      <div>
        <Container>
          <Grid columns={4}>
            <Grid.Column>
              <Link to="/posts/new">
                {" "}
                <Button primary>Add Post</Button>
              </Link>
            </Grid.Column>
            <Grid.Column>
              {" "}
              <Button
                value="votescore"
                onClick={() => this.handlePostSort("voteScore")}
              >
                Sort By Popularity
              </Button>
              <Button
                value="timestamp"
                onClick={() => this.handlePostSort("timestamp")}
              >
                Sort By Date
              </Button>
            </Grid.Column>
          </Grid>
        </Container>
        <div className="ui container">
          <div className="ui two column grid">
            <div className="twelve wide column">
              {/*Render Posts to the Page*/}
              <h3>Posts</h3>
              <ul className="ui one cards">{this.renderPosts()}</ul>
            </div>
            <div className="four wide column">
              {" "}
              <h3>Category</h3>
              <List divided relaxed size={"big"}>
                <List.Content>{this.renderCategories()} </List.Content>
              </List>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//To consume from Application State use
//return our list of posts for state
function mapStateToProps(state) {
  const { sortBy } = state;
  return {
    sortBy,
    posts: state.posts,
    categories: state.categories.categories
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    // deletePost: id => dispatch(deletePost(id)),
    voteForPost: (id, vote) => dispatch(voteForPost(id, vote)),
    fetchCategories: () => dispatch(fetchCategories()),
    sortForPosts: method => dispatch(sortForPosts(method))
  };
}

//get action creator as prop
export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
