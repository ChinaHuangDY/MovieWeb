using PetaPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    /// <summary>
    /// 评论
    /// </summary>
    [TableName("Songs")]
    public class Comments
    {
        /// <summary>
        /// 评论ID
        /// </summary>
        [Column("Id")]
        public string Id { get; set; }

        /// <summary>
        /// 歌曲ID
        /// </summary>
        [Column("SongId")]
        public string SongId { get; set; }


        /// <summary>
        /// 评论内容
        /// </summary>
        [Column("Content")]
        public string Content { get; set; }


    }
}
