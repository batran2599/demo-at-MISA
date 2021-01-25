using MISA.ApplicationCore.Entitis;
using MISA.ApplicationCore.Interface;
using MISA.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Service
{
    public class EmployeeService : ServiceBase<Employee>, IEmployeeService
    {
        IEmployeeRepository _employeeRespository;
        public EmployeeService(IEmployeeRepository employeeRespository) : base(employeeRespository)
        {
            _employeeRespository = employeeRespository;
        }

        public IEnumerable<Employee> GetByDepartmentId(Guid? departmentId)
        {
            var employees = _employeeRespository.GetByDepartmentId(departmentId);
            return employees;
        }

        public IEnumerable<Employee> GetByPositionId(Guid? positionId)
        {
            var employees = _employeeRespository.GetByPositionId(positionId);
            return employees;
        }

        public IEnumerable<Employee> GetLastEmployeeCode()
        {
            var employeeCode = _employeeRespository.GetLastEmployeeCode();
            return employeeCode;
        }

        public IEnumerable<Employee> SearchEmployee(string info)
        {
            var employees = _employeeRespository.SearchEmployee(info);
            return employees;
        }
    }
}
