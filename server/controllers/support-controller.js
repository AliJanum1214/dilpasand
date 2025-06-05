const { response } = require("../response");
const { RunQuery } = require("../services");

async function getAllEntries(req, res) {
  try {
    const query = `SELECT * FROM user_entries ORDER BY created_at DESC;`;
    const result = await RunQuery(query);

    if (!result.success) {
      return res.status(500).json({ message: "Unable to retrieve entries." });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving entries:", error);
    return res.status(500).json({ message: "Unable to retrieve entries." });
  }
}

async function insert(req, res) {
  try {
    const {
      id,
      email,
      type,
      message,
      opt_out,
      name,
      seats,
      phone,
      referral_source,
      reservation_time,
    } = req.body;

    if (!id || !email) {
      return res
        .status(400)
        .json({ message: "Missing required fields: id or email." });
    }

    const query = `
      INSERT INTO user_entries 
      (id, email, type, message, opt_out, name, seats, phone, referral_source, reservation_time) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const result = await RunQuery(query, [
      id,
      email,
      type,
      message,
      opt_out,
      name,
      seats,
      phone,
      referral_source,
      reservation_time,
    ]);

    if (!result.success) {
      return res.status(500).json({ message: "Unable to add entry." });
    }

    const sendRes =
      type === "support"
        ? "Thank you! Your support request has been received. We'll get back to you shortly."
        : type === "newsletter"
        ? "You've successfully subscribed to our newsletter. Stay tuned for updates!"
        : "Your reservation has been confirmed! A confirmation has been sent to your email.";

    return res.status(200).json(response(null, null, sendRes));
  } catch (error) {
    console.error("Error inserting entry:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong while adding entry." });
  }
}

async function updateEntries(req, res) {
  try {
    const {
      id,
      email,
      type,
      message,
      opt_out,
      name,
      seats,
      phone,
      referral_source,
      reservation_time,
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Missing required field: id." });
    }

    const query = `
      UPDATE user_entries 
      SET  
        email = ?,
        type = ?,
        message = ?,
        opt_out = ?,
        name = ?,
        seats = ?,
        phone = ?,
        referral_source = ?,
        reservation_time = ?
      WHERE id = ?`;

    const queryParams = [
      email,
      type,
      message,
      opt_out,
      name,
      seats,
      phone,
      referral_source,
      reservation_time,
      id,
    ];

    const result = await RunQuery(query, queryParams);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: "Unable to update entry.",
        error: result?.error || "Database error",
      });
    }

    return res
      .status(200)
      .json(response(null, null, "Entry updated successfully."));
  } catch (error) {
    console.error("Error updating entry:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating entry.",
      error: error.message,
    });
  }
}

async function deleteEntry(req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Missing required field: id." });
    }

    const query = `DELETE FROM user_entries WHERE id = ?`;
    const result = await RunQuery(query, [id]);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: "Unable to delete entry.",
        error: result?.error || "Database error",
      });
    }

    return res
      .status(200)
      .json(response(null, null, "Entry deleted successfully."));
  } catch (error) {
    console.error("Error deleting entry:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting entry.",
      error: error.message,
    });
  }
}

module.exports = {
  getAllEntries,
  insert,
  updateEntries,
  deleteEntry,
};
