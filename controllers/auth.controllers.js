const { Sequelize, User, Role, ROLES } = require('../models')
const bcrypt = require('bcrypt')
const jwt=require("jsonwebtoken")

exports.signUp = async (req, res) => {
  let { userName, email, password, roles } = req.body;
  if (!roles || !roles.length) {
    roles = [ROLES[0]];
  }

  try {
    const user = await User.create({
      userName: userName,
      email: email,
      password: bcrypt.hashSync(password, 8),
      roles: roles
    })

    const roles_details = await Role.findAll({
      where: {
        name: {
          [Sequelize.Op.or]: roles
        }
      }
    })
    
    await user.setRoles(roles_details)
    res.send({
      message: 'User registered successfully'
    })
  } catch (err) {
    res.status(500).send({
      message: 'Something Went Wrong'+err.message
    })
  }
}

exports.signIn = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        userName: userName
      }
    })

    //Check User
    if (!user) {
      res.status(400).send({
        message: 'Failed! User does not exist.'
      })
    }

    //Check Password
    let isPasswordValid = bcrypt.compareSync(password, user.password)

    if (!isPasswordValid) {
      res.status(400).send({
        message: 'Failed! Invalid Password.'
      })
    }

    let token=jwt.sign({id:user.id},process.env.SECRET_KEY,{expiresIn:86400});

    let roles=[];

    let allRoles=await user.getRoles();

  
    allRoles.forEach(role => {
      roles.push(role.name);
    });
    res.status(201).send({
      id: user.id,
      userName: user.userName,
      email: user.email,
      roles: roles,
      accessToken:token
    })

  } catch (err) {
    res.status(500).send({
      message: 'Something Went Wrong'+err.message
    })
  }
}
