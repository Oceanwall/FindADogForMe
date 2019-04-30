import React, { Component } from "react";
import CardDeck from "react-bootstrap/CardDeck";
import NotFound from "./NotFound";
import LoadingImage from "./LoadingImage";

class ModelCardDeck extends Component {
    render () {
        return (this.props.info_loaded ? (
            (this.props.list && this.props.list.length > 0) ? (
                <CardDeck>
                <div class="card-deck">{this.props.list}</div>
                </CardDeck>
                ) : (
                <NotFound/>
                )
            ) : (
                <LoadingImage></LoadingImage>
            ))
    }
}
export default ModelCardDeck