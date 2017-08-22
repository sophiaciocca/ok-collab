'use strict'

const db = require('APP/db')
    , {User, Product, ProductItem, Category, CartItem, Order, OrderItem, Promise} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = { // add only seed items that don't have dependencies here
    users: users(),
    categories: categories()
  }
  // if they have dependencies invoke below with seeded (order matters)
  // seeded.products = products(seeded)
  // seeded.productItems = productItems(seeded)
  // seeded.cartItems = cartItems(seeded)
  return Promise.props(seeded)
}

const users = seed(User, {
    dean: {
    name: 'Dean Heckel',
    email: 'dean@example.gov',
    password: '1234',
    city: 'San Francisco',
    photoUrl: 'http://tinyurl.com/y8ayg43l',
    blurb: "I'm a technical guitarist who's trying to get into playing with other people.",
    style: "Rock, a bit of country",
    lookingFor: "Singers to sing with me while I play guitar",
    skills: ['guitar', 'songwriting', 'vocals'],
    uploads: ['https://www.youtube.com/embed/tnooeXWxcHU']
  },
    jennywu: {
    name: 'Jenny Wu',
    email: 'jenny@example.com',
    password: '1234',
    city: 'NYC',
    photoUrl: 'http://i64.tinypic.com/2003gp2.jpg',
    blurb: "Hello, I'm Jenny! I like happiness, and sunshine, and have a voice like an angel. Let's go frolic in a field together!",
    style: "A cappella, cover songs",
    lookingFor: "More people to sing with!",
    skills: ['vocals', 'guitar', 'songwriting'],
    uploads: ['https://www.youtube.com/embed/WSbDcG_ZuDg']
  },
  andrei: {
    name: 'Andrei Matorin',
    email: 'andrei@example.gov',
    password: '1234',
    city: 'NYC',
    photoUrl: 'http://tinyurl.com/ya8utxd5',
    blurb: "I'm a violinist and also compose scores. I love collaborating on songs with other musicians to create non-traditional sounds.",
    style: "Neo-classical, mostly, but I'm down to try anything!",
    lookingFor: "Other musicians who want to create something that's never been created before.",
    skills: ['violin', 'songwriting', 'composing', 'improvisation'],
    uploads: ['https://www.youtube.com/embed/OUTJ9B1SzlU', 'https://www.youtube.com/embed/uDOYzd-KOAo', 'https://www.youtube.com/embed/q84OvXkzEL0']
  },
  robn: {
    email: 'robn@example.com',
    name: "Rob'n Delaine",
    password: '1234',
    city: 'San Francisco',
    photoUrl: 'http://i1097.photobucket.com/albums/g343/sophiaciocca/robn%20Cropped_zps98nvplpi.jpg',
    blurb: "Hi! I'm Rob'n. I'm a singer, songwriter, and violinist. I love open mics and performing, but also  just make music for the sake of making music. I also have perfect pitch.",
    style: "Jazz, blues, a cappella, indie folk, anything",
    lookingFor: "A band or someone who wants to form a duo.",
    skills: ['violin', 'vocals', 'songwriting', 'harmonizing'],
    uploads: ['https://www.youtube.com/embed/nOGeBFOz4bo']
  },
  kinagrannis: {
    name: 'Kina Grannis',
    email: 'kina@example.com',
    password: '1234',
    city: 'NYC',
    photoUrl: 'http://tinyurl.com/yct56c9m',
    blurb: "Hey, I'm Kina. I have a pretty large following on Youtube, mostly for my collaborations with other artists to create covers of popular songs. I love working with new people, so don't hesitate to reach out!",
    lookingFor: "More musicians to blend with and create beautiful things",
    style: 'Covers, pop',
    skills: ['vocals', 'guitar', 'songwriting'],
    uploads: ['https://www.youtube.com/embed/5-_DIvPpxwA']
  },
    sophia: {
    email: 'sophia@example.com',
    name: 'Sophia Ciocca',
    password: '1234',
    city: 'NYC',
    photoUrl: 'http://i63.tinypic.com/2yyrq5k.jpg',
    blurb: "Hi! I'm Sophia. After singing a cappella in college and constantly harmonizing with my roommate, I'm looking for jam partners here in NYC. Not necessarily looking to perform much, but just to make music for the sake of making music. Hit me up if you're interested!",
    style: "It depends on the collab -- I like the indie folk sound, as well as traditional a cappella. I'm definitely down to try anything.",
    lookingFor: "A partner or a few people to make covers with or write songs with.",
    skills: ['guitar', 'vocals', 'songwriting', 'piano', 'ukulele'],
    uploads: ['https://www.youtube.com/embed/GxldRwvu0JU', 'https://www.youtube.com/embed/NhDUGXlDf_I']
  },
    bono: {
    name: 'Bono',
    email: 'bono@example.gov',
    password: '1234',
    city: 'San Francisco',
    photoUrl: 'http://tinyurl.com/y8u4zune',
    blurb: "I know everyone already wants to work with me, but I thought I'd get on this site anyway, to see if there's some serious untapped talent somewhere. I'm probably too busy for you, but feel free to message me anyway.",
    style: "Rock, mostly.",
    lookingFor: "More charities to donate to.",
    skills: ['guitar', 'vocals', 'songwriting'],
    uploads: ['https://www.youtube.com/embed/DJeJgmbab0Y', 'https://www.youtube.com/embed/be8YuyneES4']
  },
  bonomo: {
    email: 'bonomo@example.com',
    name: "Adam Bonomo",
    password: '1234',
    city: 'NYC',
    photoUrl: 'http://tinyurl.com/yct3la8c',
    blurb: "Hi! I'm Adam. I'm a pianist, singer, and songwriter, and I have a band called 'BONOMO'.",
    style: "Jazz and blues mostly, but I'm very open",
    lookingFor: "People to jam improvise with and possibly create real tracks",
    skills: ['piano', 'vocals', 'songwriting', 'riffing'],
    uploads: ['https://www.youtube.com/embed/Am5-YMxfF1s', 'https://www.youtube.com/embed/appIz9IlqVc']
  },
  lisahannigan: {
    name: 'Lisa Hannigan',
    email: 'lisa@example.com',
    password: '1234',
    city: 'NYC',
    photoUrl: 'http://tinyurl.com/yddvru76',
    blurb: "Hey, I'm Lisa. I'm an Irish singer-songwriter. Some people know me as the vocal partner of Damien Rice.",
    style: "Kind of sultry, jazzy, etc.",
    skills: ['vocals'],
    uploads: ['https://www.youtube.com/embed/ZWQmNOeh8n4', 'https://www.youtube.com/embed/lSnaQAv77JE']
  }
})

// const categories = seed(Category, {
//   artistDesigned: {
//     title: 'artist-designed'
//   },
//   athletic: {
//     title: 'athletic'
//   },
//   basic: {
//     title: 'basic'
//   }
// })

// if there are dependencies, the second param is a function that takes in the seeded object, so that you can use any of the previously made instances
// const products = seed(Product, ({categories}) => ({
//   galaxy: {
//     title: 'Artist-Designed Galaxy Leggings',
//     description: 'Look like a supernova in these leggings!',
//     price: 49.99,
//     photoUrl: 'http://tinyurl.com/y9qjuxjo',
//     category_id: categories.artistDesigned.id
//   },
//   snazzyworkout: {
//     title: 'Sparkly Workout Leggings',
//     description: 'These are some super sparkly snazzy workout leggings. Wear them proudly on the elliptical.',
//     price: 29.99,
//     photoUrl: 'http://tinyurl.com/yd3j7jek',
//     category_id: categories.athletic.id
//   },
//   plainblack: {
//     title: 'Cotton Basic Black Leggings',
//     description: 'These are great basic, black leggings.',
//     price: 19.99,
//     photoUrl: 'http://tinyurl.com/ybzapozl',
//     category_id: categories.basic.id
//   },
//   mermaid: {
//     title: 'Mermaid Leggings',
//     description: 'Look like a mermaid in these leggings!',
//     price: 49.99,
//     photoUrl: 'http://tinyurl.com/y7ohlpq7',
//     category_id: categories.artistDesigned.id
//   },
//   starrynight: {
//     title: 'Starry Night Leggings',
//     description: 'Vincent Van Gogh would have loved these. They would have looked excellent on his thin frame.',
//     price: 49.99,
//     photoUrl: 'http://tinyurl.com/yby7y38x',
//     category_id: categories.artistDesigned.id
//   },
//   workouttext: {
//     title: '"WORK OUT" Leggings',
//     description: 'Make sure everyone knows you work out: Shout it loud and clear from your pants!',
//     price: 29.99,
//     photoUrl: 'http://tinyurl.com/ydezz8g8',
//     category_id: categories.athletic.id
//   },
//   pacmanathletic: {
//     title: 'Pac-man Athletic Capri Leggings',
//     description: 'Pac-man will eat your sweat! Get moving in these capri leggings.',
//     price: 29.99,
//     photoUrl: 'http://tinyurl.com/yakm5y9s',
//     category_id: categories.athletic.id
//   },
//   swirly: {
//     title: 'Swirly Leggings',
//     description: 'Get your psychedelic groove on in these leggings',
//     price: 49.99,
//     photoUrl: 'http://tinyurl.com/y82yx6a4',
//     category_id: categories.artistDesigned.id
//   },
//   veganleather: {
//     title: 'Blue Vegan Leather Leggings',
//     description: 'Get your psychedelic groove on in these leggings!',
//     price: 49.99,
//     photoUrl: 'http://tinyurl.com/ycxdtpd3',
//     category_id: categories.basic.id
//   }
// }))

// const productItems = seed(ProductItem, ({products}) => ({
//   item1: {
//     size: 'S',
//     quantity: 5,
//     product_id: products.galaxy.id
//   },
//   item2: {
//     size: 'M',
//     quantity: 10,
//     product_id: products.galaxy.id
//   },
//   item3: {
//     size: 'L',
//     quantity: 8,
//     product_id: products.galaxy.id
//   },
//   item4: {
//     size: 'S',
//     quantity: 9,
//     product_id: products.snazzyworkout.id
//   },
//   item5: {
//     size: 'M',
//     quantity: 12,
//     product_id: products.snazzyworkout.id
//   },
//   item6: {
//     size: 'L',
//     quantity: 10,
//     product_id: products.snazzyworkout.id
//   },
//   item7: {
//     size: 'M',
//     quantity: 10,
//     product_id: products.plainblack.id
//   },
//   item8: {
//     size: 'M',
//     quantity: 12,
//     product_id: products.mermaid.id,
//   item9: {
//     size: 'S',
//     quantity: 2,
//     product_id: products.starrynight.id
//   },
//   item10: {
//     size: 'M',
//     quantity: 2,
//     product_id: products.workouttext.id
//   },
//   item11: {
//     size: 'L',
//     quantity: 4,
//     product_id: products.workouttext.id
//   },
//   item12: {
//     size: 'M',
//     quantity: 12,
//     product_id: products.mermaid.id,
//   },
//   item13: {
//     size: 'M',
//     quantity: 3,
//     product_id: products.starrynight.id
//   },
//   item14: {
//     size: 'M',
//     quantity: 6,
//     product_id: products.pacmanathletic.id
//   },
//   item15: {
//     size: 'L',
//     quantity: 9,
//     product_id: products.pacmanathletic.id
//   },
//   item16: {
//     size: 'S',
//     quantity: 9,
//     product_id: products.swirly.id
//   },
//   item17: {
//     size: 'L',
//     quantity: 6,
//     product_id: products.swirly.id
//   },
//   item18: {
//     size: 'M',
//     quantity: 4,
//     product_id: products.veganleather.id
//   },
//   item19: {
//     size: 'L',
//     quantity: 6,
//     product_id: products.veganleather.id
//   }
// }}))

// const cartItems = seed(CartItem, ({users, productItems}) => ({
//   item1: {
//     quantity: 2,
//     product_item_id: productItems.item1.id,
//     user_id: users.god.id // we can only say `user` if cartItems has an association to user
//   },
//   item2: {
//     quantity: 3,
//     product_item_id: productItems.item7.id,
//     user_id: users.god.id
//   }
// }))

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}


// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users})
