/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('vehicle_locations', {
    vehicle_id: { type: 'varchar(20)', notNull: true },
    latitude: { type: 'numeric(9,6)', notNull: true },
    longitude: { type: 'numeric(9,6)', notNull: true },
    timestamp: { type: 'bigint', notNull: true },
  });

  pgm.createIndex('vehicle_locations', 'vehicle_id');
};

exports.down = (pgm) => {
  pgm.dropTable('vehicle_locations');
};

