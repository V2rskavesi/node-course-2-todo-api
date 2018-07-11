const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
  Todo.remove({}).then(() => done())
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

        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text)
          done();
        }).catch((e) => done(e))
      });
  });

  var text = ""
  it('should not create todo with invalid body data',(done) => {
    request(app)
    .post('/todos')
    .send({text})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
    });

    Todo.find().then((todos) => { //find gets all todos
      expect(todos.length).toBe(0);
      done()
    }).catch((e) => done(e))

  });
});
