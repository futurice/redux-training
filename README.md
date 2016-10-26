# Redux
Arkkitehtuurikirjasto JavaScript-applikaatioille

![](https://camo.githubusercontent.com/9de527b9432cc9244dc600875b46b43311918b59/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6d656469612d702e736c69642e65732f75706c6f6164732f3336343831322f696d616765732f323438343739302f415243482d5265647578322d657874656e6465642d7265616c2d6465636c657261746976652e676966)


**Esimerkkiprojektin alkuun:**
```
git clone git@github.com:futurice/redux-training.git
cd redux-training
git checkout tags/1
npm install
npm start
```


## 1. Termit

#### Tila

Kaikki sovelluksen sisällä oleva tieto. Määrittää esimerkiksi sen, mitä käyttäjä näkee tietyllä ajan hetkellä.
Esimerkiksi valokatkaisijan tila voi olla joko päällä tai pois päältä.

**Pelin tila:**
```js
{
  gameRunning: true,
  points: 120,
  player: {
    health: 20,
    position: {
      x: 245,
      y: 0
    }
  }
}
```

**Websovelluksen tila:**
```js
{
  loggedIn: true,
  user: {
    username: 'rikurouvila'
    firstname: 'Riku'
  },
  currentView: 'feed',
  visibleTweets: [...]
}
```


#### Action

Sovelluksessa tapahtunut tapahtuma, esimerkiksi painikkeen painallus, uusi viesti, näkymän vaihtuminen

```js
{
  type: 'USER_LOGGED_IN',
  payload: {
    username: 'rikurouvila',
    profilePic: '...'
  }
}
```

Reduxissa action mallinnetaan tyypillisesti objektina, jolla on kentät `type` ja `payload`

#### Reducer

Funktio joka saa parametreikseen edellisen tilan ja juuri tapahtuneen tapahtuman ja palauttaa päivitetyn tilan

```js
function myReducer(previousState, action) {
  if(action.type === 'USER_LOGGED_IN') {
    const newState = {
      user: action.payload
    };
    return newState;
  }
}

```

#### Synkronisuus / Asynkronisuus

Esimerkiksi synkroninen funktio palauttaa tuloksen heti sen jälkeen kun sitä kutsutaan
```js
const sum = sumNumbers(1,2); // 3
```

Asynkroninen kutsu palauttaa tuloksen vasta määrittelemättömän ajan jälkeen.
Asynkronisen funktion tunnistaa usein siitä, että sille syötetty viimeinen parametri on "callback" funktio, jota kutsutaan kun toiminto valmistuu.

```js
getUser('rikurouvila', function(error, user) {
  console.log(user);
});
```

Tälläiset funktiot voivat palauttaa myös promise-objektin, mutta perusidea on sama.

```js
getUser('rikurouvila').then(function(user) {
  console.log(user);
});
```


## 2. React komponentin oma tila
<img style="float: right; margin: 20px" src="https://www.dropbox.com/s/xx4r2ufcpz3d37r/clickcount.gif?raw=1">
```javascript
const App = React.createClass({
  getInitialState() {
    return {
      clicks: 0
    };
  },
  onClick() {
    this.setState({
      clicks: this.state.clicks + 1
    });
  },
  render() {
    return (
      <div>
        <h1>Click counter</h1>
        <p>Button clicked {this.state.clicks} times</p>
        <button onClick={this.onClick}>Click here</button>
      </div>
    )
  }
});
```


#### Kun kyseessä on komponentin oma tila (ei sovelluksen tila)

**Esimerkkejä komponentin tilasta:**
  * Dropdown auki/kiinni
  * Tekstikenttään kirjoitettu teksti
  * Sellainen tieto, jota käytetään vain tietyn komponentin sisällä

**Esimerkkejä sovelluksen tilasta:**
  * Onko käyttäjä kirjautunut
  * Käyttäjäprofiilin tiedot
  * Yleisesti ottaen sellainen tieto, jota hyödynnetään ympäri sovellusta

  * ![](https://www.dropbox.com/s/da2bn57z8cuzh92/Screenshot%202016-10-26%2010.57.43.png?raw=1)

**Valmis Click counter komponentti:**
`git checkout tags/2`


## 3. Sovelluksen tilan toteutus Reduxilla


![](https://www.dropbox.com/s/pp6u3a73jqq3wgn/Screenshot%202016-10-26%2011.35.17.png?raw=1)

**Valmis Click counter komponentti, jonka tila tallennetaan sovelluksen (reduxin) tilaan:**

`git checkout tags/3`


## 4. Hakusovellus

**Pohja:** `git checkout tags/4`

![](https://www.dropbox.com/s/pk620qvnlmglmrc/search.gif?raw=1)


#### Sovelluslogiikan paloittelu
Sovelluslogiikka kannattaa pyrkiä erottamaan mahdollisimman pitkälle React-komponenteista ja Reduxin reducereista.

Esimerkiksi tässä sovelluksessa itse haun toteuttava toiminnallisuus voidaan toteuttaa omaan `search.js` moduuliinsa

```js
// services/search.js
export function searchWithTerm(term) {
  // tekee haun annetulla termillä ja palauttaa tuloksen
}
```

#### Redux-logiikan paloittelu
Sillä oikeassa sovelluksessa reducereita ja actioneita voi olla kymmeniä, kannattaa myös yhtä sovelluksen konseptia vastaava logiikka erottaa omaan tiedostoonsa

```js
// ducks/search.js

import { searchWithTerm } from '../services/search';

export function searchAction(searchTerm) {
  return function(dispatch, getState) {
    // tee haku, lähetä uusi action kun se valmistuu
  }
}

export default function reducer(state, action) {
  // tilanhallinta
};

```
**Konsepteittain jaoiteltu projekti:** `git checkout tags/5`

## 5. Asynkroniset tapahtumat ja redux-thunk

#### Middlewaret

Mahdollistavat custom-toiminnallisuuden toteuttamisen storelle

```js
const store = createStore(reducer, applyMiddleware(thunk));
```

#### redux-thunk

Valmis middleware reduxille. Mahdollistaa funktioiden käytön actioneina.


`{type: __, payload: __}` vs

```js
function(dispatch, getState) {

}
```

redux-thunk kutsuu funktiota kahdella parametrillä

* **dispatch** - sama funktio kuin komponenteille tuleva `this.props.dispatch`
* **getState** - funktio joka palauttaa storen nykyisen tilan

Näiden avulla action-funktio voi nyt käytännössä lähettää uusia actioneita ihan milloin tahansa esim. 1 sekunnin päästä tai kun kysely rajapintaan valmistuu.

```js
const actionAfter1000ms = function(dispatch, getState) {
  setTimeout(function() {
    dispatch({type: 'HELLO', payload: 'WORLD'});
  }, 1000)
}

this.props.dispatch(actionAfter1000ms);
```

**Haku toteutettuna redux-thunkilla:** `git checkout tags/6`

## 6. Asynkroniset tapahtumat ja redux-loop

```js
import { install } from 'redux-loop';
const store = createStore(reducer, install());
```

Redux-loop vie sivuvaikutusten luomisen


```js
import { loop, Effects } from 'redux-loop';

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch(action.type) {
    case SEARCH:
      return loop(state, Effects.promise(searchEffect, action.payload));
```

**Haku toteutettuna redux-loopilla:** `git checkout tags/7`

## Liitteet


**Nimitietokannan nimet**
```js
const DATABASE = [
  'Pamela',
  'Marcus',
  'Krystina',
  'Mirella',
  'Samantha',
  'Nena',
  'Siu',
  'Elden',
  'Ashely',
  'Mabel',
  'Librada',
  'Hulda',
  'Aliza',
  'Shelley',
  'Leroy',
  'Heriberto',
  'Danita',
  'Jesica',
  'India',
  'Wen'
];
```

### Redux
http://redux.js.org/

### React-redux
https://github.com/reactjs/react-redux

### Ducks
https://github.com/erikras/ducks-modular-redux

### Redux Thunk dokumentaatio
https://github.com/gaearon/redux-thunk

### Redux Loop 2.2 dokumentaatio
https://github.com/redux-loop/redux-loop/tree/0da84e946e2b262f98c836ad310fcd0d80bee94d