const expect = require('expect');

var {generateMessage, generateLocationMessage} = require("./message");
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

describe("generateLocationMessage", ()=>{
  it("should generate correct location bject", (done)=>{
    var from ="Özkan";
    var latitude= 1987;
    var longitude= 1990;
    var url= "https://www.google.com/maps?q=1987,1990";
    var message = generateLocationMessage(from, latitude, longitude);

    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({from, url});
    expect(message.url).toEqual(url);
    done();
  });
});
