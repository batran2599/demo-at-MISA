using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    public class Position
    {   
        /// <summary>
        /// Id vị trí làm việc
        /// </summary>
        public Guid PositionId { get; set; }

        /// <summary>
        /// Tên vị trí làm việc
        /// </summary>
        public string PositionName { get; set; }
    }
}
