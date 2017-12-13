
exports.up = function(knex, Promise) {
  return knex.schema.createTable('purge_queue', table => {
    table.increments('id')
    // The ID of the channel queued up for archival.
    table.string('channel_id')
    // The timestamp of the archival alert message.
    table.string('message_ts')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('purge_queue')
}
