const expect = require('expect');

var {generateMessage} = require("./message");
describe("Generate Message", ()=>{
  it("Should generate correct message object", ()=>{
    //store res in variable
    var from = "Özkan";
    var text = "Some message";
    var message = generateMessage(from, text);
    //assert from match
    expect(message).toInclude({from, text});
    expect(message.createdAt).toBeA("number");
  });
});
