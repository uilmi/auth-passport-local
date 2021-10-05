'use strict';
const {
  Model
} = require('sequelize');

/* Pertama, kita import bcrypt untuk melakukan enkripsi */
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    // Method untuk melakukan enkripsi
    static encrypt(password) {
      return bcrypt.hashSync(password, 10);
    }

    static register({ username, password }) {
      const encryptedPassword = this.encrypt(password);
      /*
        encrypt dari static method
        encryptedPassword akan sama dengan string hasil enkripsi password dari method encrypt
      */
      return this.create({ username, password: encryptedPassword });
    }

    /* Method .compareSync digunakan untuk mencocokkan plaintext dengan hash. */
    checkPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }

    /* Method Authenticate, untuk login */
    static async authenticate({ username, password }) {
      try {
        const user = await this.findOne({ where: { username } });
        if (!user) {
          return Promise.reject({ message: "User not found!" });
        }

        const isPasswordValid = user.checkPassword(password);
        if (!isPasswordValid) {
          return Promise.reject({ message: "Wrong password" });
        }

        return Promise.resolve(user)
      }
      catch (err) {
        return Promise.reject(err)
      }
    }

  };

  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};