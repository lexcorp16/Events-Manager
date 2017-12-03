'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Centers = sequelize.define('Centers', {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      deafaultValue: true
    }
  }, {
    classMethods: {
      associate: function associate() {
        // associations can be defined here
      }
    }
  });
  Centers.associate = function (models) {
    Centers.belongsTo(models.Users, { foreignKey: 'user' });
    Centers.hasMany(models.Events, { as: 'venueOfEvent', foreignKey: 'center' });
  };
  return Centers;
};