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
        let list_of_most_important = ['Frodo', 'Sam', 'Gandalf', 'Aragorn', 'Legolas', 'Gimli', 'Merry', 'Pippin', 'Boromir', 'Gollum']
        let listOfWords1 = {}
        let listOfWords2 = {}
        let listOfWords3 = {}
        let listOfWords1_end = {}
        let listOfWords2_end = {}
        let listOfWords3_end = {}
        for (let i=0; i<Data.length; i++){
            if(Data[i].book === "The Fellowship Of The Ring"){
                if(Data[i].character in listOfWords1){
                    listOfWords1[Data[i].character] += Data[i].words
                    if (list_of_most_important.includes(Data[i].character)){
                        listOfWords1_end[Data[i].character]  = listOfWords1[Data[i].character]
                    }
                }
                else{
                    listOfWords1[Data[i].character] = Data[i].words
                }
            }
            if(Data[i].book === "The Two Towers"){
                if(Data[i].character in listOfWords2){
                    listOfWords2[Data[i].character] += Data[i].words
                    if (list_of_most_important.includes(Data[i].character)){
                        listOfWords2_end[Data[i].character]  = listOfWords2[Data[i].character]
                    }
                }
                else{
                    listOfWords2[Data[i].character] = Data[i].words
                }
            }
            if(Data[i].book === "The Return Of The King"){
                if(Data[i].character in listOfWords3){
                    listOfWords3[Data[i].character] += Data[i].words
                    if (list_of_most_important.includes(Data[i].character)){
                        listOfWords3_end[Data[i].character]  = listOfWords3[Data[i].character]
                    }
                }
                else{
                    listOfWords3[Data[i].character] = Data[i].words
                }
            }
        }
        console.log(listOfWords1_end)
        this.setState({Characters_words_book1: listOfWords1_end, Characters_words_book2: listOfWords2_end, Characters_words_book3:listOfWords3_end})
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
                    <Plot
                    data ={[
                        {
                            x: Object.keys(this.state.Characters_words_book1),
                            y: Object.values(this.state.Characters_words_book1),
                            type: 'bar',
                            name: 'The Fellowship of the Ring'
                        },
                        {
                            x: Object.keys(this.state.Characters_words_book2),
                            y: Object.values(this.state.Characters_words_book2),
                            type: 'bar',
                            name: 'The Two Towers'
                        },
                        {
                            x: Object.keys(this.state.Characters_words_book3),
                            y: Object.values(this.state.Characters_words_book3),
                            type: 'bar',
                            name: 'The Return of The King'
                        }
                    ]}
                    layout={ {title: 'Words by members of The Fellowship of The ring', legend: {"orientation": "h", "valign": "bottom", 'y': -0.2 }} }
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