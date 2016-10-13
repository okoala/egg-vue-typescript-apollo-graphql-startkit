module.exports = `
input GetUserInput {
  token: String
}

type User {
  id: Int
  name: String
}

type GetUserOutput {
  code: Int!
  data: User
  msg: String
}

`
