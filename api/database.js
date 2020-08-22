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
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: types.STRING,
    allowNull: false
  },
  password: {
    type: types.STRING,
    allowNull: false
  },
  data: {
    type: types.JSONB,
    defaultValue: {}
  }
}, {
  underscored: true
})

db.game = sequelize.define('game', {
  id: {
    type: types.STRING(12),
    primaryKey: true 
  },
  name: {
    type: types.STRING,
    allowNull: false 
  },
  data: {
    type: types.JSONB,
    allowNull: false
  }
}, {
  underscored: true
})

db.user.hasMany(db.game)

db.sheet = sequelize.define('sheet', {
  id: {
    type: types.STRING(12),
    primaryKey: true 
  },
  name: {
    type: types.STRING,
    allowNull: false 
  },
  type: { 
    type: types.STRING,
    allowNull: false 
  },
  data: {
    type: types.JSONB,
    allowNull: false
  }
}, {
  underscored: true
})

db.user.hasMany(db.sheet)

db.scene = sequelize.define('scene', {
  id: {
    type: types.STRING(12),
    primaryKey: true 
  },
  name: {
    type: types.STRING,
    allowNull: false 
  },
  type: {
    type: types.STRING,
    allowNull: false 
  },
  data: {
    type: types.JSONB,
    allowNull: false
  }
}, {
  underscored: true
})

db.game.hasMany(db.scene)
db.game.hasMany(db.sheet)

db.game_user = sequelize.define('game_user', {
  role: {
    type: types.STRING,
    defaultValue: 'player'
  }
}, {
  underscored: true,
  timestamps: false,
  modelName: 'game_user'
})

db.game.belongsToMany(db.user, {
  through: 'game_user'
})

db.user.belongsToMany(db.game, {
  through: 'game_user'
})

module.exports = db
