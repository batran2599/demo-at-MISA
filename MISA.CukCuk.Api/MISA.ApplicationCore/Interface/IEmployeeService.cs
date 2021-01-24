using MISA.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interface
{
    public interface IEmployeeService : IServiceBase<Employee>
    {
        /// <summary>
        /// Lấy dữ liệu theo mã phòng ban
        /// </summary>
        /// <param name="dpartmentId"></param>
        IEnumerable<Employee> GetByDepartmentId(Guid? dpartmentId);

        /// <summary>
        /// Lấy dữ liệu theo mã vị trí làm việc
        /// </summary>
        /// <param name="positionId"></param>
        IEnumerable<Employee> GetByPositionId(Guid? positionId);

        /// <summary>
        /// Lấy mã nhân viên cuối cùng trong bảng
        /// </summary>
        /// <returns></returns>
        IEnumerable<Employee> GetLastEmployeeCode();

        /// <summary>
        /// Cập nhật dữ liệu nhân viên
        /// </summary>
        /// <param name="infoEmployee"></param>
        /// <returns></returns>
        IEnumerable<Employee> UpdateEmployee(Employee infoEmployee);
    }
}
