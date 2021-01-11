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
  Form,
  FormGroup,
  Label,
  Input,
  ModalHeader,
  Modal,
} from "reactstrap";
import { Link } from "react-router-dom";

class CommentForm extends Component {

  constructor(props) {
    super(props);
      this.state= {
        isModalOpen: false
      };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
    
  render() {
    return (
      <React.Fragment>
          <Button className="fa fa-lg fa-pencil" outline onClick={this.toggleModal}> Submit Comment</Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.tootleModal}>
                                
                <FormGroup>
                  <Label for="Control.select">Rating</Label>
                  <Input type="select" name="select" id="rating-selected">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for=".Control.text">Author</Label>
                  <Input type="text" name="text" id="author" />
                </FormGroup>
                <FormGroup>
                  <Label for=".Control.text">Comments</Label>
                  <Input type="textarea" rows="6" name="text" id="comment" />
                </FormGroup>
                <br/>
                <Button type="submit" value="submit" color="primary" onClick={CampsiteComment()}>Submit</Button>
              </Form>
            </ModalBody>
          </Modal>
      </React.Fragment>
    );
  }
}

function CampsiteComment(submit) {
  alert("rating", "author", "comment");
}

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((comment) => {
          return (
            <div>
              <p>{comment.text}</p>
              <p>
                {comment.author}{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(comment.date)))}
              </p>
            </div>
          );
        })}
        <CommentForm />
      </div>
    );
  }
  return <div />;
}

function CampsiteInfo(props) {
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
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  }
  return <div />;
}

export default CampsiteInfo;
