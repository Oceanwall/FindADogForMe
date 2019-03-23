import React, { Component } from "react";
import Pagination from "react-bootstrap/Pagination";
import "./PageComp.css";

class PageComp extends Component {
  constructor(props) {
    super(props);
    this.handleFirst = this.handleFirst.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleLast = this.handleLast.bind(this);
    this.handleCustom = this.handleCustom.bind(this);
  }
  handleFirst() {
    this.props.changePage(1);
  }
  handlePrev() {
    this.props.changePage(this.props.currentPage - 1);
  }
  handleNext() {
    this.props.changePage(this.props.currentPage + 1);
  }
  handleLast() {
    this.props.changePage(this.props.maxPage);
  }
  handleCustom(page) {
    this.props.changePage(page);
  }

  render() {
    return (
      <div class="page-comp">
        <Pagination>
          {this.props.currentPage > 1 && [
            <Pagination.First onClick={this.handleFirst} />,
            <Pagination.Prev onClick={this.handlePrev} />,
            <Pagination.Item
              onClick={evt =>
                this.handleCustom(this.props.currentPage - 1, evt)
              }
            >
              {this.props.currentPage - 1}
            </Pagination.Item>
          ]}
          <Pagination.Item active>{this.props.currentPage}</Pagination.Item>
          {this.props.maxPage > this.props.currentPage && [
            <Pagination.Item
              onClick={evt =>
                this.handleCustom(this.props.currentPage + 1, evt)
              }
            >
              {this.props.currentPage + 1}
            </Pagination.Item>,
            <Pagination.Next onClick={this.handleNext} />,
            <Pagination.Last onClick={this.handleLast} />
          ]}
        </Pagination>
      </div>
    );
  }
}

export default PageComp;
