using Dapper;
using MISA.ApplicationCore.Entitis;
using MISA.ApplicationCore.Interface;
using MISA.Entity;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace MISA.ApplicationCore
{
    public class ServiceBase<T> : IServiceBase<T>
    {
        protected IRespositoryBase<T> _respositoryBase;

        public ServiceBase(IRespositoryBase<T> respositoryBase)
        {
            _respositoryBase = respositoryBase;
        }

        #region Method
        /// <summary>
        /// Thêm đối tượng mới
        /// </summary>
        /// <param name="customer">Thông tin đối tượng mới</param>
        /// <returns></returns>
        public ServiceResult Add(T obj)
        {
            var serviceResult = new ServiceResult();

            // Validate dữ liệu
            var objCode = obj.GetType().GetProperty(typeof(T).Name + "Code").GetValue(obj).ToString();
            if (string.IsNullOrEmpty(objCode))
            {
                var msg = new
                {
                    devMsg = new
                    {
                        fieldName = "CustomerCode",
                        msg = "Mã khách hàng không được phép để trống",
                    },
                    userMsg = "Mã khách hàng không được để trống",
                    Code = ErrorCode.NotValid

                };
                serviceResult.MISACode = ErrorCode.NotValid;
                serviceResult.Messager = "Mã khách hàng không được để trống";
                serviceResult.Data = msg;
                return serviceResult;
            }

            // Kiểm tra trùng mã
            var res = _respositoryBase.GetByCode(objCode);
            if (res != null)
            {
                var msg = new
                {
                    devMsg = new
                    {
                        fieldName = "CustomerCode",
                        msg = "Mã khách hàng đã tồn tại.",
                    },
                    userMsg = "Mã khách hàng đã tồn tại.",
                    Code = ErrorCode.NotValid

                };
                serviceResult.MISACode = ErrorCode.NotValid;
                serviceResult.Messager = "Mã khách hàng đã tồn tại.";
                serviceResult.Data = msg;
                return serviceResult;
            }

            var rowAffects = _respositoryBase.Add(obj);
            serviceResult.MISACode = ErrorCode.Success;
            serviceResult.Messager = "Thêm khách hàng thành công";
            serviceResult.Data = rowAffects;
            return serviceResult;
        }

        /// <summary>
        /// Lấy ra toàn bộ thông thông tin của tất cả các đối tượng
        /// </summary>
        /// <returns></returns>
        public IEnumerable<T> GetAll()
        {
            //var customerContext = new CustomerContext();
            //var customers = customerContext.GetCustomer();
            var customers = _respositoryBase.GetAll();
            return customers;
        }

        /// <summary>
        /// Lấy thông tin đối tượng thông qua mã khách hàng
        /// </summary>
        /// <param name="customerCode">Mã đối tượng</param>
        /// <returns>Thông tin khách hàng</returns>
        public T GetById(Guid? objId)
        {
            var customers = _respositoryBase.GetById(objId);
            return customers;
        }

        /// <summary>
        /// Lấy thông tin đối tượng thông qua mã khách hàng
        /// </summary>
        /// <param name="customerCode">Mã đối tượng</param>
        /// <returns>Thông tin khách hàng</returns>
        public T GetByCode(string objCode)
        {
            var res = _respositoryBase.GetByCode(objCode);
            return res;
        }

        /// <summary>
        /// Sửa thông tin của đối tượng
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public int Update(T obj)
        {
            var res = _respositoryBase.Update(obj);
            return res;
        }

        /// <summary>
        /// Xóa đối tượng khỏi danh sách thông qua Id
        /// </summary>
        /// <param name="objId">Id của đối tượng</param>
        /// <returns></returns>
        public int Delete(Guid objId)
        {
            var res = _respositoryBase.Delete(objId);
            return res;
        }
        #endregion
    }
}
