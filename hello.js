var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    allCrew: String
  }
`);

var rootValue = { hello: () => ['Eleftheria', 'Gennadios', 'Lysimachos'] };

var source = '{ hello }';

graphql({ schema, source, rootValue }).then((response) => {
  console.log(response);
});
