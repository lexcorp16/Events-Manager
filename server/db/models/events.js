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
    center: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Centers',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    user: {
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
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
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
    Events.belongsTo(models.Users, { foreignKey: 'user' });
    Events.belongsTo(models.Centers, { foreignKey: 'center' });
  };
  return Events;
};
