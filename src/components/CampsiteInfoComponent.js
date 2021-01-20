import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ModalBody,
  Label,
  ModalHeader,
  Modal,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
// eslint-disable-next-line 
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <FadeTransform
        in
        transformProps={{
          exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
        <Card>
          <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
          <CardBody>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    </div>
  );
}

function RenderComments({ comments, postComment, campsiteId }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        <Stagger in>
          {
            comments.map(comment => {
              return (
                <Fade in key={comment.id}>
                  <div>
                    <p>
                      {comment.text}<br />
                        -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                    </p>
                  </div>
                </Fade>
              );
            })
          }
        </Stagger>
        <CommentForm campsiteId={campsiteId} postComment={postComment} />
      </div>
    );
  }
}

function CampsiteInfo(props) {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }


  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            campsiteId={props.campsite.Id}
          />
        </div>
      </div>
    );
  }
  return <div />;
}

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      agree: false,
      isModalOpen: false,
      touched: {
        author: false
      },
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen, });
  };

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
  }

  render() {
    return (
      <div>
        <Button
          className="fa fa-lg fa-pencil"
          outline
          color="primary"
          onClick={this.toggleModal}
        >
          Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody dalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <div className='form-group'>
                <Label htmlFor='rating'>Rating</Label>
                <Control.select
                  model='.rating'
                  id='rating'
                  name='rating'
                  placeholder='rating'
                  className='form-control'
                  validators={{
                    // required,
                  }}>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </Control.select>
                <Errors
                  className='text-danger'
                  model='.rating'
                  show='touched'
                  component='div'
                  messages={{
                    required: "Required",
                  }}
                />
              </div>
              <Label htmlFor='author'>Your Name</Label>

              <Control.text
                model='.author'
                id='author'
                name='author'
                placeholder='author'
                className='form-control'
                validators={{
                  // required,
                  minLength: minLength(2),
                  maxLength: maxLength(15),
                }}
              />
              <Errors
                className='text-danger'
                model='.author'
                show='touched'
                component='div'
                messages={{
                  required: "Required",
                  minLength: "Must be at least 2 characters",
                  maxLength: "Must be 15 characters or less",
                }}
              />

              <Label htmlFor='text'>Comment</Label>

              <Control.textarea
                model='.text'
                id='text'
                name='text'
                placeholder='comment'
                className='form-control'
                rows='6'
                validators={{
                  // required,
                }}
              />
              <Errors
                className='text-danger'
                model='.text'
                show='touched'
                component='div'
                messages={{
                  required: "Required",
                }}
              />
              <Button type='submit' color='primary' md={3}>
                Submit
                </Button>
            </LocalForm>
            {/* <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Label htmlFor="rating">Rating</Label>
              <Control
                model=".rating"
                name="rating"
                id="rating"
                className="form-control"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Control>
              <Label htmlFor="author">Author</Label>
              <Control
                model=".author"
                name="author"
                id="author"
                placeholder="your name"
                className="form-control"
                validators={{
                  minLength: minLength(2),
                  maxLength: maxLength(15),
                }}
              />
              <Errors
                className="text-danger"
                model=".author"
                show="touched"
                component="div"
                messages={{
                  minLength: "Must be at least 2 characters",
                  maxLength: "Must be 15 characters or less",
                }}
              />
              <Label htmlFor="Comment">Comments</Label>
              <Control
                rows="6"
                model=".text"
                id="text"
                name="text"
                placeholder="comment"
                className="form-control"
              />
              <Button type="submit" color="primary">
                Send Feedback
              </Button>
            </LocalForm> */}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default CampsiteInfo;