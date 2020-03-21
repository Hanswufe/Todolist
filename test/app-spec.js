const {
    app
  } = require('../src/app');
  const {
    asyncReadFile,
    asyncWriteFile
  } = require('../src/dao')
  const request = require('supertest');
  
  describe("app", () => {
    describe("get request", () => {
      it("should get all tasks when request url pattern is '/api/tasks/'", (done) => {
        app.locals.dataFilePath = "./test/fixture.json"
        request(app).get('/api/tasks/').expect(200).expect([{
            "id": 1,
            "content": "Restful API homework",
            "createdTime": "2019-05-15T00:00:00Z"
          },
          {
            "id": 2,
            "content": "Restful API test",
            "createdTime": "2019-05-16T00:00:00Z"
          }
        ]).end((err, res) => {
          if (err) throw err;
          done()
        })
      })
  
      it("should get specific task when request url patten is '/api/tasks/:id'", (done) => {
        request(app).get('/api/tasks/2').expect(200).expect({
            "id": 2,
            "content": "Restful API test",
            "createdTime": "2019-05-16T00:00:00Z"
        }).end((err, res) => {
          if (err) throw err;
          done()
        })
      })
    })
  
    describe("post request", () => {
      afterEach(async function () {
        await asyncWriteFile(JSON.stringify([{
            "id": 1,
            "content": "Restful API homework",
            "createdTime": "2019-05-15T00:00:00Z"
          },
          {
            "id": 2,
            "content": "Restful API test",
            "createdTime": "2019-05-16T00:00:00Z"
          }
        ]), "./test/fixture.json")
      })
      it("should create a task when the corresponding id does not exist in the datasource", (done) => {
        request(app).post('/api/tasks/').send({
            "id": 3,
            "content": "Restful API exam",
            "createdTime": "2019-05-17T00:00:00Z"
        }).expect(201).expect([{
            "id": 1,
            "content": "Restful API homework",
            "createdTime": "2019-05-15T00:00:00Z"
          },
          {
            "id": 2,
            "content": "Restful API test",
            "createdTime": "2019-05-16T00:00:00Z"
          },
          {
            "id": 3,
            "content": "Restful API exam",
            "createdTime": "2019-05-17T00:00:00Z"
          }
        ]).end((err, res) => {
          if (err) throw err;
          done()
        })
      })
  
      it("should not create the task when its id has already existed in the datasource", (done) => {
        request(app).post('/api/tasks/').send({
            "id": 2,
            "content": "Restful API exam",
            "createdTime": "2019-05-17T00:00:00Z"
        }).expect(400).end((err, res) => {
          if (err) throw err;
          done()
        })
      })
    })
    describe("delete request", () => {
        it("should delete the task when its id has already existed in the datasource", (done) => {
          request(app).delete('/api/tasks/2').expect(204).end((err, res) => {
            if (err) throw err;
            done()
          })
        })
    
        it("should not delete the task when the corresponding id does not exist in the datasource", (done) => {
          request(app).delete('/api/tasks/5').expect(404).end((err, res) => {
            if (err) throw err;
            done()
          })
        })
      })
  })
  