var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.get('/employees/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('employees').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });
    app.post('/employees', (req, res) => {
      const employee = { name: req.body.name, email: req.body.email };
      db.collection('employees').insert(employee, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(result.ops[0]);
        }
      });
    });

    app.delete('/employees/:id', (req, res) =>{
     const id = req.params.id;
     const details = { '_id': new ObjectID(id) };
     db.collection('employees').remove(details, (err, item)=>{
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Employee ' + id + ' deleted!');
      } 
     })
    });
    app.put('/employees/:id', (req, res)=>{
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      const employee = { name: req.body.name, email: req.body.email };
      db.collection('employees').update(details, employee, (err, result)=>{
        if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(employee);
      } 
      })
    })
  };