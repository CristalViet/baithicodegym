import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [rooms, setRooms] = useState([]);

  // Lấy danh sách phòng trọ từ backend
  useEffect(() => {
    axios.get('http://localhost:3001/api/phongtro')  // Cập nhật với URL backend thực tế của bạn
      .then(response => setRooms(response.data))
      .catch(error => console.error('Có lỗi khi lấy dữ liệu:', error));
  }, []);

  const handleAddRoom = (newRoom) => {
    axios.post('http://localhost:3001/api/phongtro', newRoom)  // Gửi yêu cầu POST đến backend
      .then(response => {
        setRooms([...rooms, response.data]);  // Thêm phòng mới vào danh sách
        setShowForm(false);  // Đóng form sau khi thêm mới
      })
      .catch(error => console.error('Có lỗi khi thêm phòng:', error));
  };

  const handleDeleteRoom = (id) => {
    axios.delete(`http://localhost:3001/api/phongtro/${id}`)  // Gửi yêu cầu DELETE đến backend
      .then(() => {
        setRooms(rooms.filter(room => room.id !== id));  // Xóa phòng khỏi danh sách
      })
      .catch(error => console.error('Có lỗi khi xóa phòng:', error));
  };

  const filteredRooms = rooms.filter(
    room => room.code.includes(searchQuery) || room.tenantName.includes(searchQuery) || room.phone.includes(searchQuery)
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Tìm kiếm phòng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded-md"
          />
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Tạo mới
          </button>
        </div>
      </div>

      {showForm && (
        <div className="p-6 bg-white shadow-lg rounded-md mb-6">
          <h3 className="text-xl font-semibold mb-4">Thêm thông tin phòng trọ</h3>
          <Form onAddRoom={handleAddRoom} />
        </div>
      )}

      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Mã phòng</th>
            <th className="border px-4 py-2">Tên người thuê</th>
            <th className="border px-4 py-2">Số điện thoại</th>
            <th className="border px-4 py-2">Ngày bắt đầu thuê</th>
            <th className="border px-4 py-2">Hình thức thanh toán</th>
            <th className="border px-4 py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map(room => (
            <tr key={room.id}>
              <td className="border px-4 py-2">{room.code}</td>
              <td className="border px-4 py-2">{room.tenantName}</td>
              <td className="border px-4 py-2">{room.phone}</td>
              <td className="border px-4 py-2">{room.startDate}</td>
              <td className="border px-4 py-2">{room.paymentMethod}</td>
              <td className="border px-4 py-2 text-red-500 cursor-pointer" onClick={() => handleDeleteRoom(room.id)}>
                Xóa
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Form({ onAddRoom }) {
  const [newRoom, setNewRoom] = useState({
    code: "",
    tenantName: "",
    phone: "",
    startDate: "",
    paymentMethod: "Theo tháng",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRoom({ ...newRoom, id: Date.now() });  // Lưu ý đây chỉ là cách tạo ID tạm thời, backend sẽ tạo ID thực tế
    setNewRoom({
      code: "",
      tenantName: "",
      phone: "",
      startDate: "",
      paymentMethod: "Theo tháng",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2">Mã phòng</label>
        <input
          type="text"
          name="code"
          value={newRoom.code}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Tên người thuê</label>
        <input
          type="text"
          name="tenantName"
          value={newRoom.tenantName}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Số điện thoại</label>
        <input
          type="text"
          name="phone"
          value={newRoom.phone}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Ngày bắt đầu thuê</label>
        <input
          type="date"
          name="startDate"
          value={newRoom.startDate}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Hình thức thanh toán</label>
        <select
          name="paymentMethod"
          value={newRoom.paymentMethod}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        >
          <option value="Theo tháng">Theo tháng</option>
          <option value="Theo quý">Theo quý</option>
          <option value="Theo năm">Theo năm</option>
        </select>
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Thêm phòng
      </button>
    </form>
  );
}

export default App;
