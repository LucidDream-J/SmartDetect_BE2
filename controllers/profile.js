const handleGetProfile = (req, res, db) => {
  const { id } = req.params;
  console.log(id);

  db.select("*")
    .from("users")
    .where({ id })
    .then(user => {
      user.length
        ? res.json(user[0])
        : res.status(404).json(" User not found!");
    })
    .catch(err => res.status(404).json(err, "error getting user"));
};

module.exports = {
  handleGetProfile: handleGetProfile
};
