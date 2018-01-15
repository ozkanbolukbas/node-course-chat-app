const expect = require('expect');

const {isRealString} = require("./validation");

describe("isRealString", ()=>{
  it("should reject non-string values", ()=>{
    var res = isRealString(95);
    expect(res).toBe(false);
  });
  it("Should reject string with only spaces", ()=>{
    var res = isRealString("     ");
    expect(res).toBe(false);
  });

  it("Should allow string with non-space characters", ()=>{
    var res = isRealString("   özkan   ");
    expect(res).toBe(true);
  })
});
