module.exports = {
  name: 'ab-test',
  schema: {
    $id: 'http://express-gateway.io/schemas/policies/example-policy.json',
    type: 'object',
    properties: {
      level: {
        tpye: 'number'
      }
    }
  },
  policy: (actionParams) => {
    const that = this;
    return (req, res, next) => {
      req.headers['x-ab-test'] = false
      let userObjId = req.cookies.objId
      let userId = hash(userObjId) % 100
      if (userId <= actionParams.percent) {
        req.headers['x-ab-test'] = true
      }
      next()
    }
  }
};

function hash (objId) {
  var hash = 0, i, chr;
  if (objId.length === 0) return hash;
  for (i = 0; i < objId.length; i++) {
    chr   = objId.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
}