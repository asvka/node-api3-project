const express = require('express');
const router = express.Router();
const userDb = require('../users/userDb')
const postDb = require('../posts/postDb')

router.post('/', validateUser, (req, res, next) => {
  userDb.insert(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((err) =>  next(err) )
})

router.post('/:id/posts', validatePost, validateUserId, (req, res, next) => {
  postDb.insert({ ...req.body, user_id: req.params.id })
    .then((post) => {
      return res.status(201).json(post)
    })
    .catch((err) => {next(err)})
});

router.get('/', (req, res, next) => {
  userDb.get()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((err) => next(err))
  })

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  userDb.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((err) => next(err))
});

router.delete('/:id', validateUserId, (req, res, next) => {
  userDb.remove(req.params.id)
    .then((count) => {
        res.status(200).json({
          message: "User successfully removed."
        })
    })
    .catch((err) => next(err))
});

router.put('/:id', validateUserId, validatePost, (req, res, next) => {
  userDb.update(req.params.id, req.body)
    .then((user) => {
      console.log(req)
      res.status(200).json(user)
    })
    .catch((err) => next(err))
});

//custom middleware

function validateUserId(req, res, next) {
    userDb.getById(req.params.id)
        .then((user) => {
            if (user){
                req.user = user
                next()
            }
            else {
                res.status(400).json({
                    message: "invalid user id",
                })
            }
        })
        .catch((err) => { next(err)})
}


function validateUser(req, res, next) {
    if (req.body){
      if (req.body.name) {
        next();
      } else {
      return res.status(400).json({
          message: "missing required name field"
      })
      }
        } else {
          return res.status(400).json({
            message: "missing post data"
          })
        }
  }


function validatePost(req, res, next) {
    if (req.body.text){
        next();
      } else if (!req.body) {
        return res.status(400).json({
          message: "missing post data"
      })
      }
       else {
        return res.status(400).json({
              message: "missing required text field"
          })
      }
}


module.exports = router
