const { Sequelize, DataTypes: types } = require('sequelize')

const {
  DATABASE_URL
} = process.env

const sequelize = new Sequelize(DATABASE_URL)

const db = {
  sequelize
}

/**
 * Define models
 */ 

db.user = sequelize.define('user', {
  uid: {
    type: types.STRING(12),
    primaryKey: true
  },
  username: {
    type: types.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: types.STRING,
    allowNull: false
  }
}, {
  underscored: true
})

exports.db = db
