const db = require("../model/db");

const addTuyenXe = async (req, res) => {
  try {
    const { diemDi, diemDen, tenTuyenDi, KhoangCach } = req.body;

    // Kiểm tra xem dữ liệu có hợp lệ không
    if (!diemDi || !diemDen || !tenTuyenDi || !KhoangCach) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    // Sử dụng câu lệnh SQL với dấu hỏi thay vì chèn trực tiếp chuỗi
    const query = `
      INSERT INTO TuyenXe (TenTuyenXe, DiemDi, DiemDen, KhoangCach) 
      VALUES (?, ?, ?, ?)
    `;

    // Truyền các giá trị vào câu lệnh
    db.query(query, [tenTuyenDi, diemDi, diemDen, KhoangCach], (err, result) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      if (result.affectedRows != 0) {
        res.status(200).json({
          data: result,
          message: "Thêm tuyến xe thành công",
        });
        return;
      } else {
        res.status(400).json({
          message: "Không thể thêm tuyến xe",
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
  }
};

const getAllTuyenXe = async (req, res) => {
    try {
      const query = "SELECT * FROM TuyenXe";
      db.query(query, (err, result) => {
        if (err) {
          res.status(500).json({ message: err.message });
          return;
        }
        if (result.length > 0) {
          res.status(200).json({
            data: result,
            message: "Lấy danh sách tuyến xe thành công",
          });
        } else {
          res.status(404).json({
            message: "Không có tuyến xe nào",
          });
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
    }
  };

const deleteTuyenXe = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM TuyenXe WHERE ID_TuyenXe = '${id}'`;
    db.query(query, (err, result) => {
        if (err) {
          res.status(500).json({ message: err.message });
          return;
        }
        if (result.affectedRows!= 0) {
          res.status(200).json({
            data: result,
            message: "Xóa tuyến xe thành công",
          });
        } else {
          res.status(404).json({
            message: "Không tìm thấy tuyến xe nào để xóa",
          });
        }
      });
    }
    catch (error) {
      res.status(500).json({ message: 'Đã xảy ra l��i', error: error.message });
    }
}

const updateTuyenXe = async (req, res) => {
    try {
        const { tenTuyenDi, huyenDiemDi, huyenDiemDen, khoangCach } = req.body;
        const { id } = req.params;
        console.log(id);
        console.log(req.body);
        const query = `
        UPDATE TuyenXe 
        SET TenTuyenXe = ?, DiemDi = ?, DiemDen = ?, KhoangCach = ?
        WHERE ID_TuyenXe = ?
        `;
        db.query(query, [tenTuyenDi, huyenDiemDi, huyenDiemDen, khoangCach, id], (err, result) => {
        if (err) {
            res.status(500).json({ message: err.message });
            return;
        }
        if (result.affectedRows != 0) {
            res.status(200).json({
            data: result,
            message: "Cập nhật tuyến xe thành công",
            });
            return;
        } else {
            res.status(404).json({
            message: "Không tìm thấy tuyến xe",
            });
        }
        });
    } catch (error) {
        res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
    }
    };
  

module.exports = {
  addTuyenXe,
  getAllTuyenXe,
  deleteTuyenXe,
  updateTuyenXe,
};
