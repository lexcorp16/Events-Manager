'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Centers = sequelize.define('Centers', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rentalCost: {
      type: DataTypes.STRING,
      allowNull: false
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
    facilities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
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