import Sequelize from "sequelize";
import casual from "casual";
import _ from "lodash";

const db = new Sequelize("bits", null, null, {
  dialect: "sqlite",
  storage: "./bits.sqlite"
});

const AuthorModel = db.define("author", {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING }
});

const BitModel = db.define("bit", {
  title: { type: Sequelize.STRING },
  markdown: { type: Sequelize.STRING },
  type: { type: Sequelize.STRING } // for now
});

const PostModel = db.define("post", {
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING }
});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

// create mock data with a seed, so we always get the same
casual.seed(123);
db.sync({ force: false }).then(() => {
  _.times(10, () => {
    return AuthorModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name
    }).then(author => {
      return author.createPost({
        title: `A post by ${author.firstName}`,
        text: casual.sentences(3)
      });
    });
  });
});

const Author = db.models.author;
const Bit = db.models.bit;
const Post = db.models.post;

export { Author, Bit, Post };
