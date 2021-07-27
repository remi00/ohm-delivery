const ohmsModel = require('../src/ohms.model');
const fixture = require('./OhmsModel.fixture');

describe('OhmsModel', () => {
  beforeEach(async () => {
    const db = await ohmsModel.Database.Instance();
    db.get('ohms').value().push({ ...fixture }); // clone object
    await db.write();
  });

  afterEach(async () => {
    const db = await ohmsModel.Database.Instance();
    const ohms = db.get('ohms').value();
    const index = ohms.findIndex(({ id }) => id === fixture.id);
    ohms.splice(index, 1);
    await db.write();
  });

  describe('getById', () => {
    test('returns valid ohm object', async () => {
      expect(await ohmsModel.getById(fixture.id)).toBeDefined();
    });

    test('returns undefined for missing ohm', async () => {
      expect(await ohmsModel.getById('wrong')).toBeUndefined();
    });

    test('has a valid history', async () => {
      const ohm = await ohmsModel.getById(fixture.id);
      const statuses = [
        'CREATED',
        'PREPARING',
        'READY',
        'IN_DELIVERY',
        'DELIVERED',
        'REFUSED',
      ];
      const isValidStatus = statuses.includes(ohm.history[0].state);
      expect(isValidStatus).toBe(true);
    });
  });

  describe('updateStatus', () => {
    test('updates status with reason for refused', async () => {
      const ohm = await ohmsModel.getById(fixture.id);
      const result = await ohmsModel.updateStatus(ohm, 'REFUSED', 'Missing recipient');

      expect(result.status).toEqual('REFUSED');
      expect(result.history[result.history.length-1].status).toEqual('REFUSED');
      expect(result.history[result.history.length-1].reason).toEqual('Missing recipient');
    });

    test('throws for reason on DELIVERED', async () => {
      const ohm = await ohmsModel.getById(fixture.id);
      try {
        await ohmsModel.updateStatus(ohm, 'DELIVERED', 'Missing recipient');
      } catch (error) {
        expect(error.message).toEqual('Reason cannot be stored with status: DELIVERED');
      }
    });

    test('throws for wrong reason type', async () => {
      const ohm = await ohmsModel.getById(fixture.id);
      try {
        await ohmsModel.updateStatus(ohm, 'WRONG');
      } catch (error) {
        expect(error.message).toEqual('Invalid status value: WRONG');
      }
    });


    test('throws for wrong state change', async () => {
      const ohm = await ohmsModel.getById(fixture.id);
      try {
        await ohmsModel.updateStatus(ohm, 'READY');
      } catch (error) {
        expect(error.message).toEqual('Cannot change item cafebabe status to: READY as it is currently as: IN_DELIVERY');
      }
    });
  });
});
