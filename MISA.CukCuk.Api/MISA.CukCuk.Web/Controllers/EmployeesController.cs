using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interface;
using MISA.CukCuk.Web.ControllerBaseX;
using MISA.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBaseX<Employee>
    {
        IEmployeeService _employeeService;
        public EmployeesController(IEmployeeService employeeService) : base(employeeService)
        {
            _employeeService = employeeService;
        }

        /// <summary>
        /// Lấy mã nhân viên được thêm vào cuối cùng
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: Trần Duy Bá
        [HttpGet("getLastEmployeeCode")]
        public IActionResult GetLastEmployeeCode()
        {
            var employeeCode = _employeeService.GetLastEmployeeCode();
            return Ok(employeeCode);
        }


        /// <summary>
        /// Tìm nhân viên theo Mã, tên hoặc số điện thoại
        /// </summary>
        /// <param name="info">Thông tin dùng để tìm kiếm</param>
        /// <returns></returns>
        /// CreatedBy: Trần Duy Bá
        [HttpGet("search")]
        public IActionResult SearchEmployee(string info)
        {
            var employees = _employeeService.SearchEmployee(info);
            return Ok(employees);
        }

        /// <summary>
        /// Lọc nhân viên theo phòng ban và vị trí
        /// </summary>
        /// <param name="departmentId">Mã phòng ban</param>
        /// <param name="positionId">Mã vị trí</param>
        /// <returns></returns>
        /// CreatedBy: Trần Duy Bá
        [HttpGet("filter")]
        public IActionResult EmployeeFiltering(Guid? departmentId, Guid? positionId)
        {
            var emloyees = _employeeService.EmployeeFiltering(departmentId, positionId);
            return Ok(emloyees);
        }

    }
}
