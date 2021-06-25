import React, { Component} from "react";
import "../styles/home_style.module.css"
import Navbar_component from "./Navbar_component";
import axios from "axios";
import Plot from 'react-plotly.js';
class Default extends Component{
    constructor(props) {
    super(props);
    this.state ={
            Characters_by_race: [],
            Characters_words_book1: [],
            Characters_words_book2: [],
            Characters_words_book3: [],
        }
    }
    componentDidMount() {
    this.handleCharacters();
    this.handleWords();
  }
  handleCharacters = () => {
    axios
      .get("/characters/")
      .then((res) => this.getCharactersByRace(res.data))
      .catch((err) => console.log(err));

  };
    handleWords = () => {
        axios
            .get("/characters_words/")
            .then((res) => this.getCharactersWords(res.data))
            .catch((err) => console.log(err));
    }
    getCharactersByRace = (Characters) => {
        let listOfCharacters = {}
        for (let i=0; i< Characters.length; i++) {

            if (Characters[i].race in listOfCharacters) {
                listOfCharacters[Characters[i].race] += 1
            } else {
                listOfCharacters[Characters[i].race] = 1
            }
        }
        this.setState({Characters_by_race: listOfCharacters})
    }

    getCharactersWords = (Data) => {
        let listOfWords1 = {}
        let listOfWords2 = {}
        let listOfWords3 = {}

    }
    render(){
        return (
            <div>
                <Navbar_component/>
            <form>
                <h3>LOTR</h3>
                </form>
                 <div className="col-6 mx-auto p-0">
            <div className="card p-3" style={{boxShadow: " 0 0 1em rgb(150,200,214)"}}>
              <div className="mb-4">

                <Plot
                    data ={[
                        {
                            x: Object.keys(this.state.Characters_by_race),
                            y: Object.values(this.state.Characters_by_race),
                            type: 'bar',
                        },
                    ]}
                    layout={ {title: 'Character race'} }
                    useResizeHandler={true}
                    style = {{ width: '100%', height: '100%'}}
                    />
            </div>
            </div>
        </div>
        </div>
        )
    }
}
export default Default;