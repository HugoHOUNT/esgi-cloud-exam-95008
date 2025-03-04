const { Sequelize } = require('sequelize')

// Connexion à la base de données PostgreSQL avec l'URL de Render
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Nécessaire pour Render
    },
  },
});

// Authentification et synchronisation
sequelize.authenticate()
  .then(() => {
    console.log("✅ Connected to PostgreSQL");
    sequelize.sync()
      .then(() => console.log("✅ Database synced"))
      .catch(err => console.error("❌ Cannot sync the database", err));
  })
  .catch(err => console.error("❌ Cannot connect to database, please check environment credentials", err));

module.exports = sequelize;
