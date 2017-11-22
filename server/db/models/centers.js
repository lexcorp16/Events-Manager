export default (sequelize, DataTypes) => {
  const Centers = sequelize.define('Centers', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      deafaultValue: true,
    }
  }, {
    classMethods: {
      associate: () => {
        // associations can be defined here
      },
    },
  });
  Centers.associate = (models) => {
    Centers.belongsTo(models.Users, { foreignKey: 'UserId' });
    Centers.hasMany(models.Events, { as: 'venueOfEvent', foreignKey: 'CenterId' });
  };
  return Centers;
};
