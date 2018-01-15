const expect = require('expect');

const {Users} = require("./users");

describe("Users", ()=>{
  var users;
  beforeEach(()=>{
    users=new Users();
    users.users = [{
      id:"1",
      name:"Özkan2",
      room: "Node Course"
    }, {
      id:"2",
      name:"Oğuzhan",
      room: "Node Course"
    }, {
      id:"3",
      name:"Önder",
      room: "React Course"
    }];
  });

  it("Should add new user", ()=>{
    var users = new Users();
    var user= {
      id:"123",
      name: "Özkan",
      room: "arkadaslar"
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });
  it("Shoul remove user", ()=>{
    var userId = "1";
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });
  it("should not remove user", ()=>{
    var userId = "99";
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });
  it("Should find user", ()=>{
    var userId = "2";
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });
  it("Shoul not find user", ()=>{
    var userId = "99";
    var user = users.getUser(userId);

    expect(user).toNotExist();
  });
  it("Should return names for node course", ()=>{
    var userList = users.getUserList("Node Course");

    expect(userList).toEqual(["Özkan2", "Oğuzhan"]);
  });
  it("Should return names for node course", ()=>{
    var userList = users.getUserList("React Course");

    expect(userList).toEqual(["Önder"]);
  });
});
