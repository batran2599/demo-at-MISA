using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interface;
using MISA.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Web.ControllerBaseX
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ControllerBaseX<T> : ControllerBase
    {
        IServiceBase<T> _serviceBase;
        public ControllerBaseX(IServiceBase<T> serviceBase)
        {
            _serviceBase = serviceBase;
        }
        /// <summary>
        /// Lấy thông tin của toàn bộ đối tượng
        /// </summary>
        /// <returns>Thông tin của tất cả đối tượng</returns>
        [HttpGet()]
        public IActionResult Get()
        {
            return Ok(_serviceBase.GetAll());
        }


        /// <summary>
        /// Tìm khách hàng theo mã Id đối tượng
        /// </summary>
        /// <param name="objId">Mã đối tượng</param>
        /// <returns></returns>        
        [HttpGet("{objId}")]
        public IActionResult Get(Guid? objId)
        {
            return Ok(_serviceBase.GetById(objId));
        }

        /// <summary>
        /// Tìm đối tượng theo mã code đối tượng
        /// </summary>
        /// <param name="objCode">Mã đối tượng</param>
        /// <returns></returns>        
        [HttpGet("byCode/{objCode}")]
        public IActionResult Get(string objCode)
        {
            return Ok(_serviceBase.GetByCode(objCode));
        }

        /// <summary>
        /// Tạo bản ghi mới
        /// </summary>
        /// <param name="obj">Đối tượng chưa thông tin đối tượng</param>
        /// <returns></returns>
        [HttpPost()]
        public IActionResult Post(T obj)
        {
            var res = _serviceBase.Add(obj);
            if (res.MISACode == ErrorCode.NotValid)
            {
                return BadRequest(res.Data);
            }
            else if (res.MISACode == ErrorCode.Success || (int)res.Data > 0)
            {
                return Created("Đã thêm", res.Data);
            }
            else
            {
                return NoContent();
            }
        }

        /// <summary>
        /// Cập nhật thông tin đối tượng
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        /// CreatedBy: Trần Duy Bá
        [HttpPut]
        public IActionResult Update(T obj)
        {
            var res = _serviceBase.Update(obj);
            return Ok(res);
        }

        /// <summary>
        /// Xóa đối tượng theo Id
        /// </summary>
        /// <param name="objId">Id của đối tượng</param>
        /// <returns></returns>
        /// CreatedBy: Trần Duy Bá
        [HttpDelete("{objId}")]
        public IActionResult Delete(Guid objId)
        {
            var res = _serviceBase.Delete(objId);
            return Ok(res);
        } 
    }
}
