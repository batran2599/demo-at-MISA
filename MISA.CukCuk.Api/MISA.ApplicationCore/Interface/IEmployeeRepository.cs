using MISA.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interface
{
    public interface IEmployeeRepository : IRespositoryBase<Employee>
    {

        /// <summary>
        /// Lấy mã nhân viên cuối cùng trong bảng
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: Trần Duy Bá
        IEnumerable<Employee> GetLastEmployeeCode();

        /// <summary>
        /// Tìm kiếm nhân viên theo mã, tên hoặc số điện thoại
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        /// CreatedBy: Trần Duy Bá
        IEnumerable<Employee> SearchEmployee(string info);

        /// <summary>
        /// Lọc nhân viên theo phòng ban và vị trí
        /// </summary>
        /// <param name="departmentId">Mã phòng ban</param>
        /// <param name="positionId">Mã vị trí</param>
        /// <returns></returns>
        /// CreatedBy: Trần Duy Bá
        IEnumerable<Employee> EmployeeFiltering(Guid? departmentId, Guid? positionId);

    }
}
