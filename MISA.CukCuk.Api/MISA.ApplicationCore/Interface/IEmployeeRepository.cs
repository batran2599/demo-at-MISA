using MISA.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interface
{
    public interface IEmployeeRepository : IRespositoryBase<Employee>
    {
        /// <summary>
        /// Lấy dữ liệu theo mã phòng ban
        /// </summary>
        /// <param name="dpartmentId"></param>
        IEnumerable<Employee> GetByDepartmentId(Guid? departmentId);

        /// <summary>
        /// Lấy dữ liệu theo mã vị trí làm việc
        /// </summary>
        /// <param name="positionId"></param>
        IEnumerable<Employee> GetByPositionId(Guid? departmentId);

        /// <summary>
        /// Lấy mã nhân viên cuối cùng trong bảng
        /// </summary>
        /// <returns></returns>
        IEnumerable<Employee> GetLastEmployeeCode();

        /// <summary>
        /// Cập nhật thông tin nhân viên
        /// </summary>
        /// <param name="infoEmployee">Thông tin cần cập nhật</param>
        /// <returns></returns>
        IEnumerable<Employee> UpdateEmployee(Employee infoEmployee);
    }
}
