const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const dbConfig = require('../db.config.json');

class ValidationError extends Error {
  constructor(message) { super(message); }
}

const ohmStateMachine = {
  CREATED: ['PREPARING'],
  PREPARING: ['READY'],
  READY: ['IN_DELIVERY'],
  IN_DELIVERY: ['DELIVERED', 'REFUSED'],
  DELIVERED: [],
  REFUSED: [],
};

const possibleStates = Object.keys(ohmStateMachine);

const Database = (function () {
  let db = null;
  const adapter = new FileAsync('../persistence/db.json');

  return {
      async Instance() {
          if (!db) {
              db = await low(adapter);
              await db.defaults(dbConfig).write();
              await db.read();
          }
          return db;
      }
  };
})();

async function getById(id) {
  const ohm = (await Database.Instance())
      .get('ohms')
      .find({ id })
      .value();
  return ohm;
}

async function updateStatus(item, updatedStatus, reason) {
  const { id } = item;

  if (!ohmStateMachine[item.status]) {
      throw new Error(`Item ${id} has invalid current status: ${item.status}`);
  }
  if (!possibleStates.includes(updatedStatus)) {
    throw new ValidationError(`Invalid status value: ${updatedStatus}`);
  }
  if (!ohmStateMachine[item.status].includes(updatedStatus)) {
      throw new ValidationError(`Cannot change item ${id} status to: ${updatedStatus} as it is currently as: ${item.status}`);
  }
  if (updatedStatus !== 'REFUSED' && reason) {
      throw new ValidationError(`Reason cannot be stored with status: ${updatedStatus}`);
  }

  item.status = updatedStatus;
  const statusChange = { state: updatedStatus, at: String(Date.now()) };
  if (updatedStatus === 'REFUSED' && reason) statusChange.reason = reason;

  item.history = item.history || [];
  item.history.push(statusChange);

  const db = await Database.Instance();
  await db.write();
  return item;
}

module.exports = { Database, getById, updateStatus, ValidationError };
