export default (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CenterId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Centers',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate: () => {
        // associations can be defined here
      },
    },
  });
  Events.associate = (models) => {
    Events.belongsTo(models.Users, { foreignKey: 'UserId' });
    Events.belongsTo(models.Centers, { foreignKey: 'CenterId' });
  };
  return Events;
};
