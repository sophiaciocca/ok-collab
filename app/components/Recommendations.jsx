/*WHERE LEFT OFF WITH RECOMMENDATIONS:

Currently have a TypeError, b/c on line 40, am using "chosen.name" and "selectedUser.name",
but they're not defined yet at first. should i be defining that function somewhere else? so confused;
i've reworked this component (dumb vs. smart, passing in function in dispatch vs defining it here, etc.
a whole bunch of times ... how can i make this work???)

*/

import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'



/* -----------------    COMPONENT     ------------------ */

class Recommendations extends Component {
  constructor(props) {
    super(props)

    this.findThreeSimilar = this.findThreeSimilar.bind(this)

  }

  findThreeSimilar(usersList, selectedUser) {

    let arrOfChosen = [];
    let chosen = {name: ""};

    console.log("SELECTED USER: ", selectedUser)



    if (selectedUser.name && chosen) {

      while (arrOfChosen.length < 3) {

        chosen = usersList[Math.floor(Math.random() * usersList.length)];

        // console.log("IN THE WHILE ABOVE THE IF. what is chosen.name?", chosen.name) //Jenny Wu (obj)
        // console.log("IN THE WHILE ABOVE THE IF. what is selectedUser.name?", selectedUser.name) //Rob'n Delaine (obj)
        // console.log("is chosen.name not-equal to selectedUser.name? (should be true for it to work", (chosen.name != selectedUser.name))
        // console.log("is arrOfChosen.indexOf(chosen) == -1? (should be TRUE for it to work)", arrOfChosen.indexOf(chosen) == -1)
        console.log("what is arrOfChosen.indexOf(chosen)???", arrOfChosen.indexOf(chosen))

        if ((chosen.name != selectedUser.name) && (arrOfChosen.indexOf(chosen) < 0)) {
          console.log("MADE IT INTO THE IF")
          console.log("chosen: ", chosen)
          arrOfChosen.push(chosen)
          console.log("ARR OF CHOSEN: ", arrOfChosen)
        }

      }
    }
    console.log("FINAL ARRAY OF CHOSEN: ", arrOfChosen)
    return arrOfChosen

  }


  render() {
    let usersList = this.props.usersList || [];
    let selectedUser = this.props.selectedUser || {};

    return (
      <div id="main">
        <h3>Similar Users:</h3>
        <div>
          {console.log("findThreeSimilar from the return statement???", this.findThreeSimilar(usersList, selectedUser))}
          {this.findThreeSimilar(usersList, selectedUser).map((person, id) => {
            {console.log("person???", person)}
            return <span key={id}><Link to={`/users/${person.id}`}><img className="rec-photo" src={person.photoUrl}/></Link></span>
          })}
        </div>
      </div>

    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ users }) => ({ usersList: users.usersList, selectedUser: users.selectedUser })

// const mapDispatchToProps = (dispatch) => {
//   return {
//     findThreeSimilar: (currentUser) => {

//       return [{name: 'sophia'}, {name: 'edwin'}, {name: 'jenny'}]
//       /*
//       1) Find similar people based on skills (or, for now, just pick three randomly)

//       2) Take three of those similar people and put them in an array

//       3) Return that array

//       */
//     }
//   }
// }

export default connect(mapStateToProps, null)(Recommendations)