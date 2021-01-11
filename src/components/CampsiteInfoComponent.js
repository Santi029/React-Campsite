import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  ModalHeader,
  Modal,
} from "reactstrap";
import { Link } from "react-router-dom";
import InputGroupButtonDropdown from "reactstrap/lib/InputGroupButtonDropdown";
import InputGroup from "reactstrap/lib/InputGroup";

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
              <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <ButtonGroup>
                  <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                      Rating
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>1 Star</DropdownItem>
                      <DropdownItem>2 Star</DropdownItem>
                      <DropdownItem>3 Star</DropdownItem>
                      <DropdownItem>4 Star</DropdownItem>
                      <DropdownItem>5 Star</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                {/* <Label htmlFor="username">Rating</Label>
                <Input type="text" id="username" name="username"
                    innerRef={input => this.username = input} /> */}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="author">Author</Label>
                <Input type="text" id="text" name="text"
                    innerRef={input => this.password = input} />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Button innerRef={input => this.remember = input} onClick /> Submit
                </Label>
              </FormGroup>
            </Form>
            </ModalBody>
          </Modal>
      </React.Fragment>
    );
  }
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
