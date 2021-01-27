using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.Entity { 
    /// <summary>
    /// Thông tin khách hàng
    /// </summary>
public class Employee
    {   
        /// <summary>
        /// Id nhân viên
        /// </summary>
        public Guid? EmployeeId { get; set; }

        /// <summary>
        /// Mã nhân viên
        /// </summary>
        public string EmployeeCode { get; set; }

        /// <summary>
        /// Ho tên nhân viên
        /// </summary>
        public string FullName { get; set; }

        /// <summary>
        /// Id phòng ban
        /// </summary>
        public Guid? DepartmentId { get; set; }

        /// <summary>
        /// Id vị trí làm việc
        /// </summary>
        public Guid? PositionId { get; set; }

        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Giới tính (0 = nữ, 1 = nam, 2 = khác)
        /// </summary>
        public int? Gender { get; set; }

        /// <summary>
        /// Số chứng minh thư
        /// </summary>
        public string IdentityCardNumber { get; set; }

        /// <summary>
        /// Ngày cấp chứng minh thư
        /// </summary>
        public DateTime? CreatedDateOfIdentityCard { get; set; }

        /// <summary>
        /// Nơi cấp chứng minh thư
        /// </summary>
        public string PlaceCreatedForIdentityCard { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Số điện thoại
        /// </summary>
        public string PhoneNumber { get; set; }

        /// <summary>
        /// Mã số thuế cá nhân
        /// </summary>
        public string PersonalTaxCode { get; set; }

        /// <summary>
        /// Lương cơ bản
        /// </summary>
        public double? BasicSalary { get; set; }

        /// <summary>
        /// Ngày gia nhập công ty
        /// </summary>
        public DateTime? DateOfJoin { get; set; }

        /// <summary>
        /// Trạng thái làm việc (0 = Đã nghỉ, 1 = Đang làm, 2 = Thử việc)
        /// </summary>
        public int? WorkStatus { get; set; }

        /// <summary>
        /// Ngày tạo bản ghi
        /// </summary>
        public DateTime? CreatedDate { get; set; }

        /// <summary>
        /// Người tạo bản ghi
        /// </summary>
        public string CreatedBy { get; set; }

        /// <summary>
        /// Ngày sửa bản ghi
        /// </summary>
        public DateTime? ModifiedDate { get; set; }

        /// <summary>
        /// Người tạo bản ghi
        /// </summary>
        public string ModifiedBy { get; set; }

        /// <summary>
        /// Tên phòng ban
        /// </summary>
        public string DepartmentName { get; set; }

        /// <summary>
        /// Tên vị trí làm việc
        /// </summary>
        public string PositionName { get; set; }
    }
}
