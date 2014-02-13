describe("test code.tool", function() {

  var tool
    , source = {
      a:1,
      b:2,
      c:{ 
        a:3,
        b:4
      },
      d:[5,6]
    }
    , target = {}
    ,value;

  beforeEach(function(){
    main(function(){
      tool = this.need('river.core.tools');
    });
  });

  describe("tool.clone test case", function() {

    beforeEach(function(){
      value = tool.clone(target,source);
    });

    it('deep clone', function() {
      expect(target.c.a).toBe(3);
      expect(target.c.b).toBe(4);
    });

    it('value is target', function() {
      expect(target).toBe(value);
    });
  });


  describe('tool.expect', function() {

    var data;

    beforeEach(function(){
     data = tool.clone({},source);
    });

    it('diff the value not the reference', function() {
      expect(data).toEqual(source);
      expect(data).not.toBe(source);
      expect(tool.expect(source).toEqual(data)).toBe(true);
    });

    it('different value case', function() {
      data.d.push(7);
      expect(tool.expect(source).toEqual(data)).toBe(false);
    });

    it('push 7,8 to source', function() {
      data.d.push(7);
      expect(tool.expect(source).toEqual(data)).toBe(false);
    });

    it('value diff', function() {
      expect(tool.expect(1).toEqual(1)).toBe(true);
      expect(tool.expect(2).toEqual(1)).toBe(false);
      expect(tool.expect(true).toEqual(false)).toBe(false);
      expect(tool.expect(true).toEqual(true)).toBe(true);
    });

  });
});
