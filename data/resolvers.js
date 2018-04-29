import { Author, Bit, View } from "./connectors";

const resolvers = {
  Query: {
    author(_, args) {
      return Author.find({ where: args });
    },
    allAuthors() {
      return Author.findAll();
    },
    bit(root, args) {
      return Bit.find({ where: args });
      //return { id: 1, title: "Hello", markdown: "World 🙈", type: "Type" };
    },
    allBits() {
      return Bit.findAll();
      /*return [
        { id: 1, title: "Hello", markdown: "World 🙈", type: "Type" },
        { id: 2, title: "Bit", markdown: "Raten", type: "spotify" }
      ];*/
    }
  },
  Mutation: {
    createBit(_, { title, markdown, type }, currUser) {
      if(currUser.foo === "bar") {
        return Bit.create({
          title,
          markdown,
          type
        });
      } else {
        throw new Error('401: User is not authenticated');
      }
    }
  },
  Author: {
    posts(author) {
      return author.getPosts();
    }
  },
  Post: {
    author(post) {
      return post.getAuthor();
    },
    views(post) {
      return View.findOne({ postId: post.id }).then(view => view.views());
    }
  }
};

export default resolvers;
