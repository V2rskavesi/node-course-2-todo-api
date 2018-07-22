const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{ //creates an array of todos
  _id: new ObjectID(),
  text: 'First test todo'
},{
  _id: new ObjectID(),
  text: "Second test todo"
}]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos',() => {
  it('Should create a new todo',(done) => {
    var text = 'Test todo text'

    request(app) // where we want to make the request
      .post('/todos') //post request
      .send({text}) //supertest converts this to json
      .expect(200) //expect status 200
      .expect((res) => {
        expect(res.body.text).toBe(text) // expect result body text to be text
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text)
          done();
        }).catch((e) => done(e))
      });
  });


  it('should not create todo with invalid body data',(done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
    });

    Todo.find().then((todos) => { //find gets all todos
      expect(todos.length).toBe(2);
      return done();
    }).catch((e) => done(e))

  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => { //custom assertion
      expect(res.body.todos.length).toBe(2)
    })
    .end(done);


  });
});

describe('GET /todos/:id',() => {
  it('should return todo doc',(done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`) //grab the _id of the first todo on the todos array and convert to string
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text); //we expect the result text to be the text that we gave it
    })
    .end(done);
  });
  if('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
    .get(`/todos/${hexId}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 for non-object ids',(done) => {
    request(app)
    .get('/todos/123')
    .expect(404)
    .end(done);
  });
});

describe('DELETE /todos/:id',() => {
  it('should remove a todo',(done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
    .delete(`/todos/${hexId}`) //send request
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(hexId);
    })
    .end((err,res) => {
      if (err) {
        return done(err);
      }

      Todo.findById(hexId).then((todo) => {
        expect(todo).toBeNull();
        done();
      }).catch((e) => done(e));
  });
    });
  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
    .delete(`/todos/${hexId}`)
    .expect(404)
    .end(done);

  });
  it('should return 404 if object id is invalid', (done) => {
    request(app)
    .delete('/todos/123')
    .expect(404)
    .end(done);

  });
});
