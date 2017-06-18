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

    this.state = {
      similarUsers: []
    }

    // this.findThreeSimilar = this.findThreeSimilar.bind(this)

  }


  render() {
    let usersList = this.props.usersList;
    let selectedUser = this.props.selectedUser;
    let arrOfChosen = [];

    let findThreeSimilar = () => {

      console.log("SELECTED USER: ", this.props.selectedUser)

      while (arrOfChosen.length < 2) {

        let chosen = usersList[Math.floor(Math.random() * usersList.length)];
        if ((chosen.name != selectedUser.name) && (arrOfChosen.indexOf(chosen) === -1)) {
          console.log("CHOSEN: ", chosen)
          arrOfChosen.push(chosen);
        }
      }

      return arrOfChosen

    }

    return (
      <div id="main">
        <h3>You Might Like:</h3>
        <div>
          {usersList && selectedUser && findThreeSimilar() && findThreeSimilar().map((person, id) => <span key={id}>{person.name}</span>)}
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