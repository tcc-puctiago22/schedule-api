module.exports = mongoose => {

  var schema = mongoose.Schema(
    {
      uuid: String,
      collaborator_uuid: String,
      scheduled_date: String,
      scheduled_time: String,
      status: Boolean,
      create_at: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
 
  return mongoose.model("calendar", schema);
};
