const { response } = require("../response");
const { RunQuery } = require("../services");
const multer = require("multer");

async function getAllBlogs(req, res) {
  try {
    const query = `SELECT blog_id, blog_title, author, category, meta_title, meta_tags, reading_time, meta_desc, image , blog_url , type
FROM blogs ORDER BY create_at DESC;`;

    console.log("calling getall");

    const result = await RunQuery(query);

    console.log({ result });

    if (!result.success)
      return res.status(500).json({ message: "UNABLE TO GET CHAT LOGS" });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "UNABLE TO GET CHAT LOGS" });
  }
}

async function getBlog(req, res) {
  try {
    const bloglist = req.params;

    const blogId = `/${bloglist.ID}`;
    console.log({ blogId });

    if (!bloglist) {
      return res.status(400).json(response(null, null, "blog_id is required"));
    }

    const query = `SELECT * FROM blogs WHERE blog_url = ?`;
    const result = await RunQuery(query, [blogId]);

    console.log({ result });

    if (!result.success)
      return res.status(500).json({ message: "UNABLE TO GET CHAT LOGS" });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "UNABLE TO GET CHAT LOGS" });
  }
}

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only images (jpeg, jpg, png, webp) are allowed"));
  },
}).single("image");

async function createBlog(req, res) {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Multer error:", err);
        return res.status(400).json({
          success: false,
          message: err.message || "Error processing image",
        });
      }

      const value = req.body;
      console.log("Request received:", { body: value, file: req.file });

      if (!value.blog_id) {
        return res
          .status(400)
          .json({ success: false, message: "blog_id is required!" });
      }

      const imageBuffer = req.file ? req.file.buffer : null;

      const query =
        "INSERT INTO blogs (blog_id, image, blog_title, reading_time, author, category, content, meta_title, meta_tags, meta_desc, blog_url, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

      const result = await RunQuery(query, [
        value.blog_id,
        imageBuffer,
        value.blog_title,
        value.reading_time,
        value.author,
        value.category,
        value.content,
        value.meta_title,
        value.meta_tags,
        value.meta_desc,
        value.blog_url,
        value.type,
      ]);
      console.log({ result });
      if (!result.success) {
        return res
          .status(500)
          .json({ success: false, message: "UNABLE TO CREATE BLOG" });
      }

      res.status(200).json({ success: true, data: result });
    });
  } catch (error) {
    console.error("Error Create Blog:", error);
    res.status(500).json({ success: false, message: "UNABLE TO CREATE BLOG" });
  }
}

async function updateBlog(req, res) {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Multer error:", err);
        return res.status(400).json({
          success: false,
          message: err.message || "Error processing image",
        });
      }

      const value = req.body;
      const blogId = req.params.ID || value.blog_id;
      console.log("Update request received:", {
        body: value,
        file: req.file,
        params: req.params,
      });

      if (!blogId) {
        return res
          .status(400)
          .json({ success: false, message: "blog_id is required" });
      }
      if (!value.blog_title) {
        return res
          .status(400)
          .json({ success: false, message: "blog_title is required" });
      }
      if (!value.blog_url) {
        return res
          .status(400)
          .json({ success: false, message: "blog_url is required" });
      }

      let imageBuffer;
      if (req.file) {
        imageBuffer = req.file.buffer;
      } else if (value.image) {
        try {
          const imageObj = JSON.parse(value.image);
          if (imageObj.type === "Buffer" && Array.isArray(imageObj.data)) {
            imageBuffer = Buffer.from(imageObj.data);
          } else {
            imageBuffer = null;
          }
        } catch (error) {
          console.error("Error parsing existing image:", error);
          imageBuffer = null;
        }
      } else {
        imageBuffer = null;
      }

      const query = `
        UPDATE blogs 
        SET 
          image = ?, 
          blog_title = ?, 
          content = ?, 
          author = ?, 
          meta_title = ?, 
          meta_desc = ?, 
          meta_tags = ?, 
          category = ?, 
          reading_time = ?, 
          blog_url = ?, 
          type = ?
        WHERE blog_id = ?`;

      const queryParams = [
        imageBuffer,
        value.blog_title,
        value.content || null,
        value.author || null,
        value.meta_title || null,
        value.meta_desc || null,
        value.meta_tags || null,
        value.category || null,
        value.reading_time || null,
        value.blog_url,
        value.type || "blog",
        blogId,
      ];

      const result = await RunQuery(query, queryParams);

      if (!result.success) {
        console.error("Database error:", result?.error);
        return res.status(500).json({
          success: false,
          message: "Unable to update blog",
          error: result?.error || "Database error",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: `Blog with ID ${blogId} not found`,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        data: result,
      });
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating blog",
      error: error.message,
    });
  }
}

async function deleteBlog(req, res) {
  try {
    const blog_id = req.params;
    console.log({ blog_id });

    if (!blog_id) {
      return res.status(400).json(response(null, null, "Blog ID is required"));
    }
    const query = `DELETE FROM blogs WHERE blog_id = ?`;

    const result = await RunQuery(query, [blog_id.ID]);

    if (!result.success) {
      return res
        .status(404)
        .json(response(null, null, "Blog not found or unable to delete"));
    }

    res.status(200).json(response(null, null, "Blog deleted successfully"));
  } catch (error) {
    console.error("Error deleting blog:", error);
    res
      .status(500)
      .json(response(null, null, "Unable to delete blog due to server error"));
  }
}

module.exports = {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
