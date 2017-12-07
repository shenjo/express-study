const MyExpress = require('./express');

const app = MyExpress();

app.get((req, res, next) => {
  req.user = {
    name: 'express'
  };
  next();
});

app.get((req, res, next) => {
  req.user ? req.user.age = 20 : '';
  next();
}, function(req, res, next) {
  res.end(`user name is ${req.user.name} user age is ${req.user.age}`)
});


app.post((req, res, next) => {
  res.end(`response from POST request.`)
});

app.delete((req, res, next) => {
  res.end(`response from DELETE request.`)
});

app.put((req, res, next) => {
  res.end(`response from PUT request.`)
});
app.listen(3000, () => {
  console.log('server listen on 3000')
});