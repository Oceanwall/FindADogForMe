import React, { Component } from "react";
import CardDeck from "react-bootstrap/CardDeck";
import NotFound from "./NotFound";
import LoadingImage from "./LoadingImage";
import DogCard from "./DogCard";
import BreedCard from "./BreedCard";
import ActivityCard from "./ActivityCard";
import ShelterCard from "./ShelterCard";

class ModelCardDeck extends Component {
    construct_dogCards() {
        return this.props.dogList.map(dog => {
            return (
            <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
                <DogCard
                dog={dog}
                key={dog.name}
                highlight={this.props.searchParam}
                />
            </div>
            );
        });
    }
    construct_breedCards(start, end) {
        return this.props.breedList.slice(start, end).map(breed => {
            return (
            <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
                <BreedCard breed={breed} highlight={this.props.searchParam} />
            </div>
            );
        });
    }
    construct_activityCards() {
        return this.props.activityList.map(activity => {
          return (
            <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
              <ActivityCard
                activity={activity}
                highlight={this.props.searchParam}
              />
            </div>
          );
        });
    }

    construct_shelterCards() {
        return this.props.shelterList.map(shelter => {
          return (
            <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
              <ShelterCard
                shelter={shelter}
                highlight={this.props.searchParam}
              />
            </div>
          );
        });
    }


    render () {
        let list = [];
        console.log(this.props.shelterList);
        if (this.props.info_loaded) {
            switch(this.props.type) {
                case "Dog":
                    list = this.construct_dogCards(); break;
                case "Breed":
                    let end= this.props.start + 20 < this.props.breedList.length
                        ? this.props.start + 20
                        : this.props.breedList.length
                    list = this.construct_breedCards(this.props.start, end); break;
                case "Activities":
                    list = this.construct_activityCards(); break;
                case "Shelters":
                    list = this.construct_shelterCards(); break;
                default:
                    console.log("Error when rendering Model Card Deck: invalid type provided");
            }
        }
        return (this.props.info_loaded ? (
            (list.length > 0) ? (
                <CardDeck>
                <div class="card-deck">{list}</div>
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
